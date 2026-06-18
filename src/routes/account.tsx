import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Oxford Research Peptides" }] }),
  component: () => (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <section className="py-16">
        <div className="container-x max-w-md">
          <h1 className="font-display text-4xl font-medium mb-2">Account</h1>
          <p className="text-muted-foreground mb-8">Sign in to view orders and certificates of analysis.</p>
          <form className="bg-white border border-border p-8 space-y-4" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-[11px] font-bold tracking-widest mb-1.5">EMAIL</label>
              <input type="email" required className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-[11px] font-bold tracking-widest mb-1.5">PASSWORD</label>
              <input type="password" required className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-gold" />
            </div>
            <button className="w-full px-7 py-3.5 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors">
              SIGN IN
            </button>
            <p className="text-xs text-center text-muted-foreground pt-2">
              New here? <Link to="/account" className="text-gold underline">Create account</Link>
            </p>
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  ),
});
