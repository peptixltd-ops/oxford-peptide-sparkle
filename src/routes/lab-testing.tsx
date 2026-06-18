import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClipboardCheck, FlaskConical, Microscope, Award } from "lucide-react";
import labStandards from "@/assets/lab-standards.jpg";

export const Route = createFileRoute("/lab-testing")({
  head: () => ({
    meta: [
      { title: "Lab Testing & COA — Oxford Research Peptides" },
      { name: "description", content: "Independent third-party HPLC testing and certificates of analysis for every batch of Oxford Research Peptides." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <section className="bg-navy-deep text-bone py-14">
        <div className="container-x">
          <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">LAB TESTING</div>
          <h1 className="font-display text-5xl font-medium">Independent Verification, Every Batch</h1>
          <p className="text-bone/70 mt-3 max-w-2xl">Every batch we manufacture is independently tested by accredited third-party laboratories. Certificates of analysis are supplied with every order.</p>
        </div>
      </section>
      <section className="py-14">
        <div className="container-x grid lg:grid-cols-2 gap-10 items-start">
          <img src={labStandards} alt="Laboratory standards" className="w-full rounded-sm" />
          <div className="space-y-6">
            {[
              { icon: FlaskConical, title: "HPLC Purity Analysis", body: "Reverse-phase HPLC confirms purity for every production batch." },
              { icon: Microscope, title: "Mass Spectrometry", body: "Identity confirmation via mass spec on representative samples." },
              { icon: ClipboardCheck, title: "Certificate of Analysis", body: "Full COA with batch number, test method, results and reviewer signature." },
              { icon: Award, title: "Quality Standards", body: "Manufactured to documented internal SOPs aligned with research-reference standards." },
            ].map(s => (
              <div key={s.title} className="flex gap-4">
                <s.icon className="w-10 h-10 text-gold shrink-0" strokeWidth={1.3} />
                <div>
                  <h3 className="font-display text-xl font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  ),
});
