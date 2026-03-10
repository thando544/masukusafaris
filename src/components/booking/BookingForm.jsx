import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

export default function BookingForm({
  itemType = "package",
  itemName,
  pricePerPerson = 0,
}) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1,
    requests: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const totalNights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;

    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);

    if (end <= start) return 0;

    const diff = end - start;
    return diff / (1000 * 60 * 60 * 24);
  }, [formData.checkIn, formData.checkOut]);

  const totalPrice =
    itemType === "package"
      ? totalNights * Number(formData.guests || 0) * Number(pricePerPerson || 0)
      : Number(formData.guests || 0) * Number(pricePerPerson || 0);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" || name === "rooms" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      const templateParams = {
        booking_type: itemType,
        item_name: itemName,
        full_name: formData.fullName,
        user_email: formData.email,
        phone: formData.phone,
        country: formData.country,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        guests: formData.guests,
        rooms: itemType === "package" ? formData.rooms : "N/A",
        total_nights: itemType === "package" ? totalNights : "N/A",
        price_per_person: pricePerPerson,
        total_price: totalPrice,
        special_requests: formData.requests || "None",
        reply_to: formData.email,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID,
        templateParams
      );

      setStatus({
        loading: false,
        success: "Booking request sent successfully. We’ll get back to you soon.",
        error: "",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
        rooms: 1,
        requests: "",
      });
    } catch (error) {
      console.error("Booking email failed:", error);
      setStatus({
        loading: false,
        success: "",
        error: "Failed to send booking request. Please try again.",
      });
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-amber-700">
          Booking Request
        </p>
        <h2 className="text-2xl font-semibold text-zinc-900 md:text-3xl">
          Book This {itemType === "package" ? "Package" : "Experience"}
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Fill in your details below. This form sends a reservation request only.
          No payment is taken on the website.
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
          <label className="mb-2 block text-sm font-medium text-zinc-800">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">
            {itemType === "package" ? "Check-in Date" : "Activity Date"}
          </label>
          <input
            type="date"
            name="checkIn"
            min={today}
            value={formData.checkIn}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        {itemType === "package" ? (
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-800">Check-out Date</label>
            <input
              type="date"
              name="checkOut"
              min={formData.checkIn || today}
              value={formData.checkOut}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
            />
          </div>
        ) : (
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-800">Guests</label>
            <input
              type="number"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
            />
          </div>
        )}

        {itemType === "package" && (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-800">Guests</label>
              <input
                type="number"
                name="guests"
                min="1"
                value={formData.guests}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-800">Rooms</label>
              <input
                type="number"
                name="rooms"
                min="1"
                value={formData.rooms}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
              />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-zinc-800">Special Requests</label>
          <textarea
            name="requests"
            value={formData.requests}
            onChange={handleChange}
            rows="5"
            placeholder="Any extra information or special requests..."
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-900"
          />
        </div>

        <div className="md:col-span-2">
          <div className="rounded-2xl bg-zinc-50 p-5">
            <div className="grid gap-3 text-sm text-zinc-700 md:grid-cols-2">
              <div className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
                <span>Selected</span>
                <strong className="text-zinc-900">{itemName}</strong>
              </div>

              <div className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
                <span>{itemType === "package" ? "Price Per Person / Night" : "Price Per Person"}</span>
                <strong className="text-zinc-900">${pricePerPerson}</strong>
              </div>

              {itemType === "package" && (
                <div className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
                  <span>Total Nights</span>
                  <strong className="text-zinc-900">{totalNights}</strong>
                </div>
              )}

              <div className="flex justify-between gap-4 border-b border-zinc-200 pb-3">
                <span>Guests</span>
                <strong className="text-zinc-900">{formData.guests}</strong>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm text-zinc-500">Estimated Total</p>
              <div className="text-3xl font-semibold text-zinc-900">${totalPrice}</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status.loading}
            className="inline-flex rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status.loading ? "Sending..." : "Send Booking Request"}
          </button>
        </div>
      </form>
    </div>
  );
}