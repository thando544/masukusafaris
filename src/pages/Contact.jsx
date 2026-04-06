import { useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        {
          full_name: formData.fullName,
          user_email: formData.email,
          phone: formData.phone,
          inquiry_type: formData.inquiryType,
          message: formData.message,
          reply_to: formData.email,
        }
      );

      setStatus({
        loading: false,
        success: "Your message was sent successfully. We’ll reply soon.",
        error: "",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form failed:", error);
      setStatus({
        loading: false,
        success: "",
        error: "Failed to send your message. Please try again.",
      });
    }
  }

  return (
    <div className="bg-white text-zinc-900">
      <Navbar />

      <main>
        <section className="relative h-[60vh] min-h-105 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/img/gallery/4.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-16 md:px-6 lg:px-8">
            <div className="max-w-3xl pt-24 text-white">
              <p className="mb-3 text-sm uppercase tracking-[0.24em] text-white/75">
                Get In Touch
              </p>
              <h1 className="text-4xl font-semibold md:text-6xl">
                Contact Masuku Adventure Safaris
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                We’re here to help you plan unforgettable adventures, smooth transfers,
                and comfortable stays across Victoria Falls and beyond.
              </p>
            </div>
          </div>
        </section>

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
                      href="tel:  +263782856955"
                      className="mt-4 inline-block font-medium text-zinc-900 underline underline-offset-4"
                    >
                     +263 78 285 6955
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
                      href="mailto:bookings@masukusafaris.com"
                      className="mt-4 inline-block font-medium text-zinc-900 underline underline-offset-4"
                    >
                      bookings@masukusafaris.com
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
                    <p className="mt-4 font-medium text-zinc-900">
                      Victoria Falls, Zimbabwe
                    </p>
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
                      href="https://wa.me/+263782856955"
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
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                  <div className="mb-8">
                    <p className="mb-2 text-sm uppercase tracking-[0.2em] text-amber-700">
                      Inquiry Form
                    </p>
                    <h2 className="text-2xl font-semibold text-zinc-900 md:text-3xl">
                      Send Us a Message
                    </h2>
                    <p className="mt-3 max-w-2xl text-zinc-600">
                      Tell us what you are looking for, whether it is a tour, accommodation,
                      transfer, or a full custom itinerary.
                    </p>
                  </div>

                  {status.success && (
                    <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                      {status.success}
                    </div>
                  )}

                  {status.error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {status.error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-800">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-800">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-800">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-800">
                        Inquiry Type
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
                      >
                        <option value="">Select inquiry type</option>
                        <option value="Activity Booking">Activity Booking</option>
                        <option value="Accommodation Package">Accommodation Package</option>
                        <option value="Transfer Service">Transfer Service</option>
                        <option value="Custom Itinerary">Custom Itinerary</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-zinc-800">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        required
                        className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
                        placeholder="Tell us more about your travel plans or inquiry..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={status.loading}
                        className="inline-flex rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {status.loading ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-sm">
                  <div className="flex h-90 items-center justify-center px-6 text-center text-zinc-500">
                    Map Embed Area
                    <br />
                    <span className="mt-2 block text-sm">
                      Replace this section with your Google Maps iframe or location embed.
                    </span>
                  </div>
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
