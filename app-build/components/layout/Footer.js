"use client";

import { navLinks, siteConfig, services } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-[#FAFAF8] py-16 px-5 border-t border-white/5 relative z-10 font-[family-name:var(--font-body)]">
      <div className="container-luxury grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-5">
          <a
            href="#hero"
            className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-[0.1em] text-white hover:text-[var(--gold)] transition-colors duration-300"
          >
            ELEVA<span className="text-[var(--gold)]">.</span>
          </a>
          <p className="text-[#B0A99F] text-sm leading-relaxed max-w-sm">
            {siteConfig.description}
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            {Object.entries(siteConfig.social).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#B0A99F] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300 capitalize text-xs"
                title={key}
              >
                {key.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white tracking-wide mb-6">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[#B0A99F] hover:text-[var(--gold)] text-sm tracking-wide transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white tracking-wide mb-6">
            Our Services
          </h4>
          <ul className="flex flex-col gap-3">
            {services.map((service) => (
              <li key={service.title}>
                <a
                  href="#services"
                  className="text-[#B0A99F] hover:text-[var(--gold)] text-sm tracking-wide transition-colors duration-300"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="flex flex-col gap-5">
          <h4 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white tracking-wide mb-1">
            Get in Touch
          </h4>
          <div className="flex flex-col gap-4 text-sm text-[#B0A99F]">
            <div className="flex gap-3">
              {/* Map pin */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--gold)] shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{siteConfig.address}</span>
            </div>
            <div className="flex gap-3">
              {/* Phone */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--gold)] shrink-0">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{siteConfig.phone}</span>
            </div>
            <div className="flex gap-3">
              {/* Mail */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--gold)] shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-[var(--gold)] transition-colors duration-300">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-luxury border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#8A8478] text-xs">
          &copy; {currentYear} {siteConfig.name}. All rights reserved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#B0A99F] hover:text-[var(--gold)] transition-colors duration-300 uppercase"
        >
          Back to Top
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5,12 12,5 19,12" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
