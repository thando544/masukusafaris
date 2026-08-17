import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import InquiryForm from "../components/common/InquiryForm";
import { SITE } from "../config/site";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import HeroBanner from "../components/layout/HeroBanner";

export default function Contact() {
  return (
    <div className="bg-[#f6f1e8] text-zinc-900">
      <Navbar />

      <main>
        <HeroBanner
          src="/images/zamb.jpeg"
          alt="Victoria Falls and safari country"
          className="min-h-[60vh]"
        >
          <div className="max-w-3xl text-white">
              <p className="mb-3 text-sm uppercase tracking-[0.24em] text-white/75">
                Get In Touch
              </p>
              <h1 className="text-4xl font-semibold md:text-6xl">
                Contact Masuku Adventure Safaris
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                We’re here to help you plan unforgettable adventures, smooth transfers,
                and comfortable stays across Victoria Falls and beyond. {SITE.replyTime}
              </p>
            </div>
        </HeroBanner>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="space-y-6">
                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                      <FaPhoneAlt />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900">Call Us</h3>
                    <p className="mt-3 text-zinc-600">
                      Reach out for bookings, custom itineraries, and general travel help.
                    </p>
                    <a
                      href={SITE.phoneHref}
                      className="mt-4 inline-block font-medium text-zinc-900 underline underline-offset-4"
                    >
                      {SITE.phone}
                    </a>
                  </div>

                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                      <FaEnvelope />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900">Email Us</h3>
                    <p className="mt-3 text-zinc-600">
                      Send us your inquiry and our team will get back to you as soon as possible.
                    </p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-4 inline-block font-medium text-zinc-900 underline underline-offset-4"
                    >
                      {SITE.email}
                    </a>
                  </div>

                  <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                      <FaMapMarkerAlt />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900">Location</h3>
                    <p className="mt-3 text-zinc-600">
                      Based in Victoria Falls, serving travelers across Zimbabwe, Botswana,
                      and Zambia.
                    </p>
                    <p className="mt-4 font-medium text-zinc-900">{SITE.location}</p>
                  </div>

                  <div className="rounded-3xl bg-green-600 p-6 text-white shadow-sm">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                      <FaWhatsapp />
                    </div>
                    <h3 className="text-xl font-semibold">Chat on WhatsApp</h3>
                    <p className="mt-3 text-white/90">
                      Need a faster response? Chat with us directly on WhatsApp for quick booking help.
                    </p>
                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-zinc-100"
                    >
                      Message Us on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <InquiryForm />

                <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                  <iframe
                    title="Masuku Adventure Safaris map"
                    src={SITE.mapEmbedSrc}
                    className="h-[450px] w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
