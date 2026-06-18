import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Mail, ArrowRight } from "lucide-react";
import { Logo } from "./site-header";

const cols = [
  { h: "SHOP", links: [
    { l: "All Peptides", to: "/shop" },
    { l: "Bestsellers", to: "/shop" },
    { l: "Wholesale", to: "/wholesale" },
  ] },
  { h: "RESEARCH HUB", links: [
    { l: "Research Articles", to: "/research-hub" },
    { l: "Peptide Guides", to: "/research-hub" },
  ] },
  { h: "LAB TESTING", links: [
    { l: "Lab Testing Process", to: "/lab-testing" },
    { l: "Certificates (COA)", to: "/lab-testing" },
  ] },
  { h: "COMPANY", links: [
    { l: "About Us", to: "/about" },
    { l: "Contact Us", to: "/about" },
  ] },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-bone">
      <div className="container-x py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <div className="col-span-2">
          <Logo light />
          <p className="text-bone/60 text-xs mt-5 max-w-xs leading-relaxed">
            Premium research peptides manufactured in the UK with the highest standards of quality and transparency. Strictly for laboratory research use.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Instagram" className="w-9 h-9 border border-bone/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="Twitter" className="w-9 h-9 border border-bone/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" aria-label="Email" className="w-9 h-9 border border-bone/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"><Mail className="w-4 h-4" /></a>
          </div>
        </div>
        {cols.map(col => (
          <div key={col.h}>
            <h4 className="text-[11px] font-bold tracking-[0.2em] text-gold mb-4">{col.h}</h4>
            <ul className="space-y-2.5 text-xs text-bone/70">
              {col.links.map(l => (
                <li key={l.l}><Link to={l.to} className="hover:text-gold transition-colors">{l.l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="text-[11px] font-bold tracking-[0.2em] text-gold mb-4">STAY UPDATED</h4>
          <p className="text-xs text-bone/70 mb-4">Get the latest research notes and catalogue updates.</p>
          <div className="flex">
            <input type="email" placeholder="Your email"
              className="flex-1 bg-white/5 border border-bone/20 px-3 py-2.5 text-xs outline-none focus:border-gold" />
            <button className="px-4 bg-gold text-navy-deep" aria-label="Subscribe"><ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      <div className="border-t border-bone/10">
        <div className="container-x py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-bone/50">
          <div>© 2024 Oxford Research Peptides. All rights reserved.</div>
          <div>Research Use Only. Not for Human or Animal Consumption.</div>
        </div>
      </div>
    </footer>
  );
}
