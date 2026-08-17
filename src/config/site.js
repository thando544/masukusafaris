export const SITE_NAME = "Masuku Adventure Safaris";
export const SITE_ORIGIN =
  import.meta.env?.VITE_SITE_URL?.replace(/\/$/, "") ||
  "https://masukusafaris.com";

export const SITE = {
  name: SITE_NAME,
  origin: SITE_ORIGIN,
  email: "bookings@masukusafaris.com",
  phone: "+263 78 285 6955",
  phoneE164: "+263782856955",
  whatsapp: "https://wa.me/263782856955",
  location: "Victoria Falls, Zimbabwe",
  description:
    "Curated safari packages, activities, and transfers across Zimbabwe, Botswana, Zambia, Tanzania, Kenya, Namibia, and South Africa.",
};
