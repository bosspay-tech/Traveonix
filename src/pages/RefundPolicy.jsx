import React from "react";
import { Bus } from "lucide-react";

export default function RefundPolicy() {
  const lastUpdated = "February 21, 2026";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
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
            <h1 className="text-2xl font-extrabold text-slate-900">
              Refund & Cancellation Policy
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6 text-sm leading-6 text-slate-700">
          <p>
            This Refund Policy explains how cancellations and refunds work for{" "}
            <span className="font-semibold text-slate-900">TRAVEONIX</span>.
            Actual refund eligibility and amounts depend on bus operator rules.
          </p>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              1) Cancellation Window
            </h2>
            <p className="mt-2">
              Cancellations are typically allowed until a specified time before
              departure. Some tickets may be non-refundable. Operator rules
              apply.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              2) Refund Amount
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                Refunds may be partial based on how close the cancellation is to
                departure (higher deductions closer to departure).
              </li>
              <li>
                Operator and payment gateway charges (if any) may be deducted.
              </li>
              <li>
                If the operator cancels a trip, refunds are generally processed
                as per operator policy.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              3) Refund Timelines
            </h2>
            <p className="mt-2">
              Refunds (if applicable) are typically processed within 5–10
              business days depending on payment method and bank/provider.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              4) Booking Errors / Failed Payments
            </h2>
            <p className="mt-2">
              If a payment succeeds but booking confirmation fails due to a
              technical issue, we will investigate and either confirm your
              booking or initiate a refund as applicable.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              5) How to Request a Refund
            </h2>
            <p className="mt-2">
              Contact{" "}
              <span className="font-semibold text-slate-900">
                support@traveonix.com
              </span>{" "}
              with your Ticket ID and registered mobile number.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              6) Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this policy from time to time. The “Last updated”
              date reflects the latest revision.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
