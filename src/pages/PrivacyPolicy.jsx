import React from "react";
import { Bus } from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "February 19, 2026";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        {/* Brand header */}
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
              Privacy Policy
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6 text-sm leading-6 text-slate-700">
          <p>
            This Privacy Policy explains how{" "}
            <span className="font-semibold text-slate-900">TRAVEONIX</span>{" "}
            (“we”, “us”, “our”) collects, uses, shares, and protects information
            when you use our website and app (the “Service”) for browsing routes
            and booking bus tickets.
          </p>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              1) Information We Collect
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-slate-900">
                  Account details :
                </span>{" "}
                name, mobile number, and a password.
              </li>
              <li>
                <span className="font-semibold text-slate-900">
                  Booking context:
                </span>{" "}
                selected route (from/to), bus type (e.g., AC Sleeper), operator,
                travel date, passenger name, number of seats, fare, and payment
                method selected.
              </li>
              <li>
                <span className="font-semibold text-slate-900">
                  Device & usage data:
                </span>{" "}
                basic analytics like pages visited, button clicks, and error
                logs (only if you enable analytics/monitoring).
              </li>
              <li>
                <span className="font-semibold text-slate-900">
                  Support communications:
                </span>{" "}
                if you contact support, we may collect details you share (e.g.,
                email, screenshots).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              2) What We Don’t Intentionally Collect
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                We do not ask for or store full card numbers, CVV, netbanking
                passwords, or UPI PINs.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              3) How We Use Information
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                To provide the Service (search routes, booking, status display).
              </li>
              <li>
                To personalize your experience (recent searches, saved
                preferences, offers).
              </li>
              <li>
                To troubleshoot issues, prevent abuse, and improve reliability
                and UI/UX.
              </li>
              <li>To comply with legal obligations where applicable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              4) Payments & Third-Party Services
            </h2>
            <p className="mt-2">
              When integrated with real payment providers, certain information
              may be shared with them to complete transactions, such as booking
              amount, reference identifiers, and payment status.
            </p>
            <p className="mt-2">
              Bus operators and third parties may have their own privacy
              policies, and we recommend reviewing them if/when you use a real
              provider integration.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              5) Cookies & Local Storage
            </h2>
            <p className="mt-2">
              We may use cookies and/or local storage to keep you signed in,
              remember preferences, and store booking history (like recent
              tickets). You can clear your browser storage to remove this data.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              6) Data Retention
            </h2>
            <p className="mt-2">
              We retain information only as long as necessary for the purposes
              described above. In the version, booking history may be stored
              locally in your browser until you clear it.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              7) Security
            </h2>
            <p className="mt-2">
              We take reasonable measures to protect information. However, no
              method of transmission or storage is 100% secure. Please use the
              Service responsibly and avoid entering sensitive credentials in
              fields.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              8) Your Choices
            </h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                You can sign out and clear app data by clearing browser storage.
              </li>
              <li>You can choose not to share optional information.</li>
              <li>
                If analytics is enabled, you may opt out via your browser
                settings or installed blockers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              9) Children’s Privacy
            </h2>
            <p className="mt-2">
              The Service is not intended for children under the age of 13. We
              do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              10) Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. We will
              update the “Last updated” date at the top. Continued use of the
              Service after changes means you accept the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-extrabold text-slate-900">
              11) Contact Us
            </h2>
            <p className="mt-2">
              If you have questions about this Privacy Policy, contact us at{" "}
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
