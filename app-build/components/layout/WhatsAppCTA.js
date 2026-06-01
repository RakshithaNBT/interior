"use client";

import { siteConfig } from "@/lib/constants";

export default function WhatsAppCTA() {
  const message = encodeURIComponent(
    `Hello ELEVA, I'd like to book a luxury interior design consultation.`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      {/* Floating tooltip */}
      <span className="absolute right-14 bg-charcoal text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md border border-white/10">
        Chat with us
      </span>

      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 -z-10 animate-ping" />

      {/* WhatsApp SVG Icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.246 1.864 13.758.83 11.137.829c-5.447 0-9.873 4.424-9.877 9.869-.001 1.734.461 3.426 1.336 4.928l-.995 3.636 3.731-.978zm11.58-7.375c-.3-.149-1.777-.878-2.046-.977-.27-.099-.467-.149-.662.149-.195.297-.757.977-.928 1.173-.171.197-.343.223-.643.075-.3-.15-1.266-.466-2.41-1.484-.89-.794-1.49-1.773-1.665-2.072-.176-.3-.019-.461.13-.61.135-.133.3-.347.45-.52.15-.173.2-.297.3-.495.1-.2.05-.375-.025-.524-.075-.15-.662-1.597-.907-2.185-.238-.574-.48-.497-.662-.507-.17-.008-.365-.01-.56-.01s-.51.074-.777.365c-.266.292-1.02 1.002-1.02 2.44 0 1.44 1.05 2.83 1.196 3.03.147.2 2.065 3.155 5.006 4.43.7.302 1.246.483 1.672.618.703.224 1.343.193 1.85.117.564-.085 1.777-.726 2.025-1.43.248-.703.248-1.306.173-1.43-.075-.124-.27-.198-.57-.347z" />
      </svg>
    </a>
  );
}
