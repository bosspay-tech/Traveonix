import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { Bus, LogOut, Mail, Phone, MapPin } from "lucide-react";

const FooterLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        "text-sm font-semibold transition",
        isActive ? "text-red-600" : "text-slate-600 hover:text-slate-900",
      ].join(" ")
    }
  >
    {children}
  </NavLink>
);

export default function AppShell() {
  const { user, signout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* top bar */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <button
            onClick={() => nav("/")}
            className="
              group flex items-center gap-2 rounded-2xl px-3 py-2
              hover:bg-slate-50 transition
              focus:outline-none focus:ring-2 focus:ring-red-200
            "
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-red-50 shadow-sm">
              <Bus className="h-5 w-5 text-red-600" />
            </span>
            <div className="leading-tight">
              <div className="text-[10px] font-bold tracking-widest text-slate-400">
                BUS TICKETING
              </div>
              <div className="text-lg font-black text-red-600">TRAVEONIX</div>
            </div>
          </button>

          <div className="flex items-center gap-3">
            {/* user chip */}
            <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-100 text-slate-700 text-sm font-black">
                {(user?.name || "U").slice(0, 1).toUpperCase()}
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-slate-900 leading-none">
                  {user?.name || "Guest"}
                </div>
                <div className="mt-1 text-xs text-slate-500 leading-none">
                  {user?.phone || ""}
                </div>
              </div>
            </div>

            {/* logout */}
            <button
              onClick={() => {
                signout();
                nav("/signin");
              }}
              className="
                inline-flex items-center gap-2 rounded-2xl
                border border-slate-300 bg-white px-3 py-2 text-sm
                text-slate-700 shadow-sm transition
                hover:bg-slate-50 hover:border-slate-400
                focus:outline-none focus:ring-2 focus:ring-red-200
                active:scale-[0.98]
              "
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* content */}

      <Outlet />

      {/* footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Brand */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-3xl bg-red-50 shadow-sm">
                  <Bus className="h-6 w-6 text-red-600" />
                </div>
                <div className="leading-tight">
                  <div className="text-[10px] font-bold tracking-widest text-slate-400">
                    BUS TICKETING
                  </div>
                  <div className="text-xl font-black text-red-600">
                    TRAVEONIX
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600 max-w-md">
                Book intercity bus tickets with a clean, fast experience.
                Compare operators, choose seats, and checkout securely.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  AC Sleeper
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  RTC Buses
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  Instant Booking
                </span>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-3">
              <div className="text-sm font-extrabold text-slate-900">
                Quick links
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/history">History</FooterLink>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
              </div>
            </div>

            {/* Support */}
            <div className="md:col-span-4">
              <div className="text-sm font-extrabold text-slate-900">
                Support
              </div>

              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>support@traveonix.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>+91 9974126031</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>India</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => nav("/privacy")}
                  className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Read Policy
                </button>
                <button
                  type="button"
                  onClick={() => nav("/")}
                  className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                >
                  Book Tickets
                </button>
              </div>
            </div>
          </div>

          {/* bottom strip */}
          <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <div>
              © {new Date().getFullYear()} TRAVEONIX. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4">
              <FooterLink
                type="button"
                to="/privacy"
                className="hover:text-slate-700"
              >
                Privacy
              </FooterLink>
              <FooterLink
                type="button"
                to="/terms"
                className="hover:text-slate-700"
              >
                Terms
              </FooterLink>
              <FooterLink
                type="button"
                to="/refunds"
                className="hover:text-slate-700"
              >
                Refunds
              </FooterLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
