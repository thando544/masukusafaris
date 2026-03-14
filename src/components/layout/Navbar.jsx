import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", to: "/", type: "route" },
    { label: "Activities", to: "/activities", type: "route" },
    { label: "Packages", to: "/#packages", type: "anchor" },
    { label: "About Us", to: "/about", type: "anchor" },
    { label: "Contact Us", to: "/contact", type: "route" },
  ];

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-amber-300 ${isActive ? "text-amber-300" : ""}`;

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <img
            src="/images/logo-white.png"
            alt="Masuku Adventure Travel"
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7 text-sm font-medium text-white">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.type === "route" ? (
                  <NavLink to={item.to} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                ) : (
                  <a
                    href={item.to}
                    className="transition hover:text-amber-300"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <Link
            to="/book"
            className="rounded-md border border-amber-500 bg-amber-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-400"
          >
            Book Now
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md border border-white/30 p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
        </button>
      </nav>

      {open && (
        <div className="mx-4 rounded-2xl border border-white/10 bg-black/95 p-5 text-white shadow-2xl lg:hidden">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.type === "route" ? (
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block text-sm font-medium transition hover:text-amber-300 ${
                        isActive ? "text-amber-300" : ""
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <a
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className="block text-sm font-medium transition hover:text-amber-300"
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
            className="mt-5 inline-flex rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-black"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}