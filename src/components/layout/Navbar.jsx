import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", to: "/", type: "route" },
    { label: "Activities", to: "/activities", type: "route" },
    { label: "Packages", to: "/packages", type: "route" },
    { label: "About Us", to: "/about", type: "route" },
    { label: "Contact Us", to: "/contact", type: "route" },
  ];

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition ${
      isActive ? "text-amber-300" : "text-white hover:text-amber-300"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link
            to="/"
            className="flex shrink-0 items-center"
            onClick={() => setOpen(false)}
          >
            <img
              src="/images/logo-white.png"
              alt="Masuku Adventure Safaris"
              className="h-11 w-auto md:h-13"
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.type === "route" ? (
                    <NavLink to={item.to} className={navLinkClass}>
                      {({ isActive }) => (
                        <span className="relative inline-flex flex-col">
                          <span
                            className={`transition ${
                              isActive
                                ? "text-amber-300"
                                : "text-white hover:text-amber-300"
                            }`}
                          >
                            {item.label}
                          </span>
                          <span
                            className={`mt-1 h-px w-full origin-left bg-amber-400 transition-transform duration-300 ${
                              isActive ? "scale-x-100" : "scale-x-0"
                            }`}
                          />
                        </span>
                      )}
                    </NavLink>
                  ) : (
                    <a
                      href={item.to}
                      className="text-sm font-medium text-white transition hover:text-amber-300"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <Link
              to="/book"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
            >
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/15 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
          </button>
        </nav>
      </div>

      <div
        className={`lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 h-screen bg-black/60 backdrop-blur-sm transition duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute right-4 top-20 w-[calc(100%-2rem)] max-w-sm rounded-3xl border border-white/10 bg-black/95 p-6 text-white shadow-2xl transition duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="mb-6 border-b border-white/10 pb-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/50">
              Masuku Adventure Safaris
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              Explore Africa With Confidence
            </p>
          </div>

          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.type === "route" ? (
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-amber-500 text-black"
                          : "text-white hover:bg-white/10 hover:text-amber-300"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <a
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 hover:text-amber-300"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-amber-500 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-400"
          >
            Book Now
          </Link>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}
