"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(form.entries())) });
    const data = await response.json();
    setMessage(data.message || data.error || "Sent.");
    if (response.ok) event.currentTarget.reset();
  }
  return (
    <main id="main-content" className="container-x" style={{ padding: "2.5rem 0 4rem", maxWidth: 720 }}>
      <h1 style={{ fontSize: 52 }}>Contact</h1>
      <p>Oxford Research Syndicate Ltd, 131a Movers Lane, Barking, IG11 7UQ. Email info@oxfordresearchpeptides.com. We reply within one working day.</p>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input className="field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
        <label className="field">Name<input name="name" required maxLength={100} /></label>
        <label className="field">Email<input name="email" type="email" required /></label>
        <label className="field">Subject<input name="subject" required /></label>
        <label className="field">Message<textarea name="message" required minLength={10} rows={6} /></label>
        <button className="btn" type="submit">SEND</button>
        {message && <p role="status">{message}</p>}
      </form>
    </main>
  );
}
