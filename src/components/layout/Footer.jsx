                                                                                                                                                                                                                                                                                                                                                                                import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6 lg:px-8">
        <p className="text-sm text-zinc-400">
          © 2024 Masuku Adventure Travel
        </p>

        <div className="flex items-center gap-4">
          <a href="https://www.facebook.com/people/Masuku-Adventure-Safaris/61584398296602/?rdid=Jc62tpWijU5snyOU&share_url=https%253A%252F%252Fwww.facebook.com%252Fshare%252F1KNhW68JYz%252F" target="_blank" className="text-zinc-400 transition hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="text-zinc-400 transition hover:text-white">
            <FaXTwitter />
          </a>
          <a href="#" className="text-zinc-400 transition hover:text-white">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}