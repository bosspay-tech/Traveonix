import React from "react";
import { Bus, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-3xl bg-red-50 shadow-sm">
              <Bus className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-widest text-slate-400">
                BUS TICKETING
              </div>
              <div className="text-xl font-black text-red-600">TRAVEONIX</div>
            </div>
          </div>

          <div className="text-right">
            <h1 className="text-2xl font-extrabold text-slate-900">Contact Us</h1>
            <p className="mt-1 text-sm text-slate-500">
              We usually respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Contact cards */}
          <div className="space-y-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <Mail className="h-4 w-4 text-slate-600" />
                Email
              </div>
              <div className="mt-2 text-sm text-slate-700">
                <a
                  href="mailto:support@traveonix.com"
                  className="font-semibold text-red-600 hover:underline"
                >
                  support@traveonix.com
                </a>
              </div>
              <div className="mt-1 text-xs text-slate-500">
                For booking issues, refunds, and general queries.
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <Phone className="h-4 w-4 text-slate-600" />
                Phone
              </div>
              <div className="mt-2 text-sm text-slate-700">
                <a
                  href="tel:+919000000000"
                  className="font-semibold text-red-600 hover:underline"
                >
                  +91 90000 00000
                </a>
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Support hours: 10:00 AM – 7:00 PM (IST)
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <MapPin className="h-4 w-4 text-slate-600" />
                Address
              </div>
              <div className="mt-2 text-sm text-slate-700">
                TRAVEONIX, India
              </div>
              <div className="mt-1 text-xs text-slate-500">
                (This is a demo app — update with your official address.)
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <Clock className="h-4 w-4 text-slate-600" />
                Response time
              </div>
              <div className="mt-2 text-sm text-slate-700">
                Typically within <span className="font-semibold">24 hours</span>
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Weekends/holidays may take a bit longer.
              </div>
            </div>
          </div>

          {/* Simple form (demo) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-extrabold text-slate-900">
              Send a message
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Demo form — wire it to your backend later.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-slate-500">Name</label>
                <input
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500">Message</label>
                <textarea
                  rows={5}
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  placeholder="Tell us how we can help…"
                />
              </div>

              <button
                type="button"
                onClick={() => alert("Demo: message sent!")}
                className="w-full rounded-2xl bg-linear-to-r from-red-500 to-rose-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:opacity-95"
              >
                Send message
              </button>

              <div className="text-[11px] text-slate-400">
                Tip: include your Ticket ID if it’s about a booking/refund.
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
          For cancellations/refunds, please share your{" "}
          <span className="font-semibold">Ticket ID</span> and registered mobile
          number to speed up resolution.
        </div>
      </div>
    </div>
  );
}