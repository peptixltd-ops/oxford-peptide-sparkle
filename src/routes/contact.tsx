import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";


const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(10, "Please add a few details").max(2000),
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@oxfordresearchpeptides.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...parsed.data, _subject: `[Contact] ${parsed.data.subject}` }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Message sent. We'll reply within one working day.");
      form.reset();
    } catch {
      toast.error("Couldn't send right now. Please email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <main id="main-content">
      <section className="bg-navy-deep text-bone py-14">
        <div className="container-x">
          <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">GET IN TOUCH</div>
          <h1 className="font-display text-5xl font-medium">Contact Us</h1>
          <p className="text-bone/70 mt-4 max-w-xl">
            Questions about an order or batch documentation — our team responds within one working day.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-x grid lg:grid-cols-5 gap-10 max-w-6xl">
          <div className="lg:col-span-2 space-y-6 text-sm">
            <div className="flex gap-4">
              <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-bold tracking-[0.25em] text-navy-deep/60 mb-1">EMAIL</div>
                <a href="mailto:info@oxfordresearchpeptides.com" className="hover:text-gold">info@oxfordresearchpeptides.com</a>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-bold tracking-[0.25em] text-navy-deep/60 mb-1">TELEPHONE</div>
                <div className="text-navy-deep/75">Available on request via email</div>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-bold tracking-[0.25em] text-navy-deep/60 mb-1">SUPPORT HOURS</div>
                <div className="text-navy-deep/75">Monday – Friday, 9:00 – 17:00 (UK time)<br />Excluding UK bank holidays</div>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-bold tracking-[0.25em] text-navy-deep/60 mb-1">REGISTERED OFFICE</div>
                <div className="text-navy-deep/75">
                  Oxford Research Syndicate Ltd<br />
                  131a Movers Lane<br />
                  Barking, Essex, IG11 7UQ<br />
                  United Kingdom<br />
                  Company Reg. No. 17207898
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 bg-white border border-navy-deep/15 p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block text-xs">
                <span className="font-bold tracking-widest text-navy-deep/70">NAME</span>
                <input name="name" required maxLength={100} className="mt-2 w-full border border-navy-deep/20 px-3 py-3 text-sm outline-none focus:border-gold" />
              </label>
              <label className="block text-xs">
                <span className="font-bold tracking-widest text-navy-deep/70">EMAIL</span>
                <input name="email" type="email" required maxLength={255} className="mt-2 w-full border border-navy-deep/20 px-3 py-3 text-sm outline-none focus:border-gold" />
              </label>
            </div>
            <label className="block text-xs">
              <span className="font-bold tracking-widest text-navy-deep/70">SUBJECT</span>
              <input name="subject" required maxLength={150} className="mt-2 w-full border border-navy-deep/20 px-3 py-3 text-sm outline-none focus:border-gold" />
            </label>
            <label className="block text-xs">
              <span className="font-bold tracking-widest text-navy-deep/70">MESSAGE</span>
              <textarea name="message" required rows={6} maxLength={2000} className="mt-2 w-full border border-navy-deep/20 px-3 py-3 text-sm outline-none focus:border-gold" />
            </label>
            <button type="submit" disabled={sending} className="px-8 py-3.5 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors disabled:opacity-60">
              {sending ? "SENDING…" : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </section>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      path: "/contact",
      title: "Contact Us — Oxford Research Peptides",
      description:
        "Get in touch with Oxford Research Peptides — UK customer support, registered office and business enquiries.",
    }),
  component: ContactPage,
});
