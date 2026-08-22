import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BookingForm from "../components/booking/BookingForm";
import packages from "../data/packages";
import activities from "../data/activities";
import { SITE } from "../config/site";
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Photo from "../components/common/Photo";
import HeroBanner from "../components/layout/HeroBanner";
import SEO from "../components/seo/SEO";
import ReferralBanner from "../components/common/ReferralBanner";

export default function BookingPage() {
  const [bookingType, setBookingType] = useState("package");
  const [selectedSlug, setSelectedSlug] = useState(packages[0]?.slug || "");

  const items = bookingType === "package" ? packages : activities;

  const selectedItem =
    items.find((item) => item.slug === selectedSlug) || items[0];

  function handleTypeChange(type) {
    setBookingType(type);
    if (type === "package") {
      setSelectedSlug(packages[0]?.slug || "");
    } else {
      setSelectedSlug(activities[0]?.slug || "");
    }
  }

  return (
    <div className="bg-white text-zinc-900">
      <SEO
        title="Book an African Safari Package or Victoria Falls Activity"
        description="Request a booking for a Victoria Falls safari package, Chobe day trip, Okavango itinerary, or activity. A planner replies with availability and next steps."
        path="/book"
      />
      <Navbar />
      <ReferralBanner />

      <main>
        <HeroBanner
          src="/images/walking.jpeg"
          alt="Book an African safari from Victoria Falls"
          className="min-h-[60vh]"
        >
          <div className="max-w-3xl text-white">
              <p className="mb-3 text-sm uppercase tracking-[0.24em] text-white/75">
                Reservations
              </p>
              <h1 className="text-4xl font-semibold md:text-6xl">
                Book a safari package or Victoria Falls activity
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                Choose a current package or activity, send dates and party size,
                and we confirm lodge space, park fees, and transfers. {SITE.replyTime}
              </p>
            </div>
        </HeroBanner>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="mb-2 text-sm uppercase tracking-[0.2em] text-amber-700">
                Booking Options
              </p>
              <h2 className="text-3xl font-semibold text-zinc-900 md:text-5xl">
                Choose What You Want to Book
              </h2>
              <p className="mt-4 text-base leading-8 text-zinc-600">
                Select whether you want to book a package stay or an activity.
                Then choose the option you want and complete the booking form below.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-zinc-900">
                    Booking Type
                  </h3>

                  <div className="mt-5 grid gap-3">
                    <button
                      onClick={() => handleTypeChange("package")}
                      className={`rounded-2xl px-5 py-4 text-left text-sm font-semibold transition ${
                        bookingType === "package"
                          ? "bg-zinc-950 text-white"
                          : "border border-zinc-300 bg-white text-zinc-800 hover:border-zinc-900"
                      }`}
                    >
                      Accommodation Package
                    </button>

                    <button
                      onClick={() => handleTypeChange("activity")}
                      className={`rounded-2xl px-5 py-4 text-left text-sm font-semibold transition ${
                        bookingType === "activity"
                          ? "bg-zinc-950 text-white"
                          : "border border-zinc-300 bg-white text-zinc-800 hover:border-zinc-900"
                      }`}
                    >
                      Activity / Experience
                    </button>
                  </div>

                  <div className="mt-8">
                    <label className="mb-2 block text-sm font-medium text-zinc-800">
                      Select {bookingType === "package" ? "Package" : "Activity"}
                    </label>

                    <select
                      value={selectedSlug}
                      onChange={(e) => setSelectedSlug(e.target.value)}
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
                    >
                      {items.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedItem && (
                    <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200">
                      <Photo
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        ratio="aspect-16/10"
                      />
                      <div className="p-5">
                        <h4 className="text-lg font-semibold text-zinc-900">
                          {selectedItem.title}
                        </h4>
                        <p className="mt-2 text-sm leading-7 text-zinc-600">
                          {selectedItem.shortDescription}
                        </p>
                        <div className="mt-4">
                          <p className="text-xl font-semibold text-zinc-900">
                            {selectedItem.priceLabel}
                          </p>
                          <p className="text-sm text-zinc-500">
                            {selectedItem.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-4">
                    <div className="rounded-2xl bg-zinc-50 p-4">
                      <div className="flex items-center gap-3">
                        <FaPhoneAlt className="text-zinc-700" />
                        <div>
                          <p className="text-sm text-zinc-500">Call Us</p>
                          <a href={SITE.phoneHref} className="font-medium text-zinc-900">
                            {SITE.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-zinc-50 p-4">
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-zinc-700" />
                        <div>
                          <p className="text-sm text-zinc-500">Email</p>
                          <a
                            href={`mailto:${SITE.email}`}
                            className="font-medium text-zinc-900"
                          >
                            {SITE.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      <FaWhatsapp />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                {selectedItem && (
                  <BookingForm
                    itemType={bookingType}
                    itemName={selectedItem.title}
                    pricePerPerson={selectedItem.price}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}