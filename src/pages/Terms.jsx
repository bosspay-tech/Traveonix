import React from "react";
import { Bus } from "lucide-react";

export default function Terms() {
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
              Terms & Conditions
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6 text-sm leading-6 text-slate-700">
          <p>
            These Terms govern your use of{" "}
            <span className="font-semibold text-slate-900">TRAVEONIX</span> (the
            “Service”). By using the Service, you agree to these Terms.
          </p>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              1) Service Description
            </h2>
            <p className="mt-2">
              TRAVEONIX helps users search routes and book bus tickets. In demo
              mode, bookings and history may be simulated.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              2) User Responsibilities
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                Provide accurate booking details (name, phone, date, seats).
              </li>
              <li>
                Do not misuse the Service (fraud, abuse, illegal activity).
              </li>
              <li>
                Keep your device/account secure. You are responsible for actions
                taken from your account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              3) Bookings, Operators & Availability
            </h2>
            <p className="mt-2">
              Bus availability, schedules, seat maps, boarding points, and fares
              are provided by operators/partners and may change. TRAVEONIX is
              not responsible for operator delays, cancellations, or service
              quality.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              4) Payments
            </h2>
            <p className="mt-2">
              Payments may be processed by third-party payment providers. You
              agree to comply with their terms. We do not store sensitive card
              or UPI PIN information.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              5) Cancellations & Refunds
            </h2>
            <p className="mt-2">
              Cancellation eligibility and refund amounts depend on operator
              policies, ticket type, and time before departure. Please refer to
              our Refund Policy and operator terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              6) Intellectual Property
            </h2>
            <p className="mt-2">
              The Service, brand, and UI are owned by TRAVEONIX (or licensors).
              You may not copy, reverse engineer, or resell the Service without
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              7) Disclaimer
            </h2>
            <p className="mt-2">
              The Service is provided “as is” without warranties of any kind. We
              do not guarantee uninterrupted availability or error-free
              operation.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              8) Limitation of Liability
            </h2>
            <p className="mt-2">
              To the maximum extent permitted by law, TRAVEONIX shall not be
              liable for indirect or consequential damages, including missed
              trips, operator issues, or third-party failures.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              9) Changes to Terms
            </h2>
            <p className="mt-2">
              We may update these Terms from time to time. Continued use after
              updates means you accept the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              10) Contact
            </h2>
            <p className="mt-2">
              For questions, contact{" "}
              <span className="font-semibold text-slate-900">
                support@traveonix.com
              </span>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
