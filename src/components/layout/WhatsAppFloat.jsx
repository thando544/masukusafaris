import { FaWhatsapp } from "react-icons/fa";
import { SITE } from "../../config/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Masuku Adventure Safaris on WhatsApp"
      className="fixed bottom-24 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1ebe5d] md:bottom-28 md:right-8"
    >
      <FaWhatsapp className="text-xl" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
