import { useState } from "react";
import emailjs from "@emailjs/browser";

const defaultTypes = [
  "Activity Booking",
  "Accommodation Package",
  "Transfer Service",
  "Custom Itinerary",
  "General Inquiry",
];

export default function InquiryForm({
  defaultType = "",
  lockType = false,
  heading = "Send Us a Message",
  intro = "Tell us what you are looking for, whether it is a tour, accommodation, transfer, or a full custom itinerary.",
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: defaultType,
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
          inquiry_type: formData.inquiryType || defaultType || "General Inquiry",
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
        inquiryType: defaultType,
        message: "",
      });
    } catch (error) {
      console.error("Inquiry form failed:", error);
      setStatus({
        loading: false,
        success: "",
        error: "Failed to send your message. Please try again.",
      });
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-amber-700">
          Inquiry Form
        </p>
        <h2 className="text-2xl font-semibold text-zinc-900 md:text-3xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-600">{intro}</p>
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
          {lockType ? (
            <input
              type="text"
              name="inquiryType"
              value={formData.inquiryType}
              readOnly
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-zinc-700"
            />
          ) : (
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
            >
              <option value="">Select inquiry type</option>
              {defaultTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}
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
  );
}
