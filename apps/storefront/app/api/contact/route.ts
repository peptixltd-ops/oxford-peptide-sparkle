import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.website) return NextResponse.json({ message: "Thanks." });
  if (!body.email || !body.message || String(body.message).trim().length < 10) {
    return NextResponse.json({ error: "Please add a name, email and a short message." }, { status: 400 });
  }
  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (key) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        name: body.name,
        email: body.email,
        subject: `[Contact] ${body.subject || "Website"}`,
        message: body.message,
        from_name: "Oxford Research Peptides website",
      }),
    });
    const json = await response.json().catch(() => null);
    if (!json?.success) return NextResponse.json({ error: "The contact form could not be delivered. Please email us directly." }, { status: 502 });
    return NextResponse.json({ message: "Message sent. We'll reply within one working day." });
  }
  const file = process.env.CONTACT_OUTBOX || "/tmp/orp-contact-outbox.jsonl";
  mkdirSync(dirname(file), { recursive: true });
  appendFileSync(file, `${JSON.stringify({ at: new Date().toISOString(), name: body.name, email: body.email, subject: body.subject, message: body.message })}\n`);
  return NextResponse.json({ message: "Message stored in the local test outbox. Web3Forms is not configured in this environment, so nothing was emailed." });
}
