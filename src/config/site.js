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
  phoneHref: "tel:+263782856955",
  whatsapp: "https://wa.me/263782856955",
  location: "Victoria Falls, Zimbabwe",
  replyTime: "We typically reply within 4 hours during safari planning hours.",
  facebook:
    "https://www.facebook.com/people/Masuku-Adventure-Safaris/61584398296602/",
  safariBookings: "https://www.safaribookings.com/p7944",
  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=Masuku%20Adventure%20Safaris%20Victoria%20Falls",
  tripadvisorSearch:
    "https://www.tripadvisor.com/Search?q=Masuku%20Adventure%20Safaris%20Victoria%20Falls",
  getYourGuideSearch:
    "https://www.getyourguide.com/s/?q=Masuku%20Adventure%20Safaris%20Victoria%20Falls",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31096433.075572737!2d-13.197841499999969!3d-17.934425099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x400ea0735029a7a5%3A0x69ed161d62bec7c4!2sMasuku%20adventure!5e0!3m2!1sen!2szw!4v1786984399241!5m2!1sen!2szw",
  description:
    "Book African safari packages from Victoria Falls: Zimbabwe, Botswana, Zambia, Tanzania, Kenya, Namibia, and South Africa. Local operator for Chobe, Okavango, Hwange, Great Migration, and Masai Mara trips.",
};
