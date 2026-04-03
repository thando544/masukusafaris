import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";

export default function Footer() {
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Activities", to: "/activities" },
    { label: "Packages", to: "/packages" },
    { label: "Contact", to: "/contact" },
  ];

  const safariLinks = [
    { label: "Custom Itineraries", to: "/custom-itinerary" },
    { label: "Book Your Trip", to: "/book" },
    { label: "Privacy Policy", to: "/legal/privacy-policy" },
    { label: "Terms & Conditions", to: "/legal/terms-conditions" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/Masuku-Adventure-Safaris/61584398296602/?rdid=Jc62tpWijU5snyOU&share_url=https%253A%252F%252Fwww.facebook.com%252Fshare%252F1KNhW68JYz%252F",
      icon: <FaFacebookF />,
    },
    {
      label: "X",
      href: "#",
      icon: <FaXTwitter />,
    },
    {
      label: "Instagram",
      href: "#",
      icon: <FaInstagram />,
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">
              Masuku Adventure Safaris
            </p>

            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight text-white md:text-4xl">
              Curated African journeys with comfort, care, and unforgettable
              experiences.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 md:text-base">
              We help travelers explore Victoria Falls, Chobe, Zambia, Botswana,
              Tanzania, and beyond through carefully planned safari packages,
              guided activities, and reliable transfers.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
              >
                Book Your Safari
              </Link>

              <a
                href="https://wa.me/263782856955"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <FaWhatsapp />
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-4">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/75 transition hover:text-amber-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">
              More
            </h3>
            <ul className="mt-6 space-y-4">
              {safariLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/75 transition hover:text-amber-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/50">
              Contact
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                  <HiOutlinePhone className="text-lg" />
                </span>
                <div>
                  <p className="text-sm text-white/50">Phone</p>
                  <a
                    href="tel:+263 78 285 6955"
                    className="mt-1 inline-block text-sm text-white/80 transition hover:text-amber-300"
                  >
                    +263 78 285 6955
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-400"></span>
                <div>
                  <p className="text-sm text-white/50">Email</p>
                  <a
                    href="mailto:bookings@masukusafaris.com"
                    className="mt-1 inline-block text-sm text-white/80 transition hover:text-amber-300"
                  >
                    bookings@masukusafaris.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                  <HiOutlineMapPin className="text-lg" />
                </span>
                <div>
                  <p className="text-sm text-white/50">Based In</p>
                  <p className="mt-1 text-sm text-white/80">
                    Victoria Falls, Zimbabwe
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-amber-400/40 hover:bg-white/10 hover:text-amber-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <p>© 2026 Masuku Adventure Safaris. All rights reserved.</p>
          <p>Crafted for unforgettable safari experiences across Africa.</p>
        </div>
      </div>
    </footer>
  );
}
