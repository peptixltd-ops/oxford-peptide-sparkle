import { NextRequest, NextResponse } from "next/server";
import { getPublishableKey } from "@/lib/medusa";

const backend = () => process.env.MEDUSA_BACKEND_URL || "http://127.0.0.1:9000";

async function auth(path: string, body: unknown) {
  const response = await fetch(`${backend()}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.action === "register") {
    const registered = await auth("/auth/customer/emailpass/register", { email: body.email, password: body.password });
    if (!registered.ok) return NextResponse.json({ error: registered.data.message || "Could not register" }, { status: registered.status });
    const token = registered.data.token;
    const customer = await fetch(`${backend()}/store/customers`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
        "x-publishable-api-key": getPublishableKey(),
      },
      body: JSON.stringify({ email: body.email, first_name: body.first_name, last_name: body.last_name }),
    });
    const created = await customer.json();
    if (!customer.ok) return NextResponse.json({ error: created.message || "Could not create the customer" }, { status: customer.status });
    return NextResponse.json({ token, customer: created.customer });
  }
  if (body.action === "login") {
    const result = await auth("/auth/customer/emailpass", { email: body.email, password: body.password });
    if (!result.ok) return NextResponse.json({ error: result.data.message || "Login failed" }, { status: result.status });
    return NextResponse.json({ token: result.data.token });
  }
  if (body.action === "reset") {
    const result = await auth("/auth/customer/emailpass/reset-password", { identifier: body.email });
    return NextResponse.json({ ok: result.ok, message: "If an account exists, a reset message was captured in test mode and was not emailed." });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
