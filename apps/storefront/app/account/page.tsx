"use client";

import { FormEvent, useState } from "react";

export default function AccountPage() {
  const [mode, setMode] = useState<"login" | "register" | "reset">("login");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/account", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: mode, email: form.get("email"), password: form.get("password"), first_name: form.get("first_name"), last_name: form.get("last_name") }),
    });
    const data = await response.json();
    if (!response.ok) { setMessage(data.error || "Request failed"); return; }
    if (data.token) localStorage.setItem("orp_customer_token", data.token);
    setMessage(mode === "reset" ? data.message : "Signed in. Migrated customers use the reset form to set a password; the message stays in test mode.");
  }
  return (
    <main id="main-content" className="container-x" style={{ padding: "2.5rem 0 4rem", maxWidth: 560 }}>
      <h1 style={{ fontSize: 52 }}>Account</h1>
      <p>Create an account, sign in, or request a password reset. Migrated customers are created without a password and activate through this reset. Messages are captured locally and are not emailed.</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {(["login", "register", "reset"] as const).map((item) => <button key={item} className={mode === item ? "btn" : "btn secondary"} type="button" onClick={() => setMode(item)}>{item.toUpperCase()}</button>)}
      </div>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        {mode === "register" && <label className="field">First name<input name="first_name" required /></label>}
        {mode === "register" && <label className="field">Last name<input name="last_name" required /></label>}
        <label className="field">Email<input name="email" type="email" required /></label>
        {mode !== "reset" && <label className="field">Password<input name="password" type="password" required minLength={8} /></label>}
        <button className="btn" type="submit">{mode === "reset" ? "SEND RESET" : "CONTINUE"}</button>
        {message && <p role="status">{message}</p>}
      </form>
    </main>
  );
}
