import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { Bus, LogOut, Home, History, ShieldCheck } from "lucide-react";

const NavItem = ({ to, label, Icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        "group relative flex flex-col items-center justify-center gap-1",
        "rounded-2xl px-5 py-2 text-[11px] font-semibold",
        "transition active:scale-[0.98]",
        "focus:outline-none focus:ring-2 focus:ring-red-200",
        isActive
          ? "bg-red-50 text-red-700 shadow-sm"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
      ].join(" ")
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={[
            "grid h-9 w-9 place-items-center rounded-2xl transition",
            isActive
              ? "bg-white shadow-sm"
              : "bg-transparent group-hover:bg-white",
          ].join(" ")}
        >
          <Icon className="h-4.5 w-4.5" />
        </span>
        <span className="leading-none">{label}</span>

        {/* active indicator */}
        <span
          className={[
            "absolute -top-1 h-1 w-8 rounded-full transition",
            isActive ? "bg-red-500" : "bg-transparent",
          ].join(" ")}
        />
      </>
    )}
  </NavLink>
);

export default function AppShell() {
  const { user, signout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
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
      <div className="mx-auto w-full max-w-6xl px-4 py-6 pb-28">
        <Outlet />
      </div>

      {/* bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl px-4 py-3">
          <div className="grid grid-cols-3 gap-2 rounded-3xl bg-white p-2 shadow-[0_-8px_30px_rgba(15,23,42,0.08)]">
            <NavItem to="/" label="Home" Icon={Home} />
            <NavItem to="/history" label="History" Icon={History} />
            <NavItem to="/privacy" label="Privacy" Icon={ShieldCheck} />
          </div>
        </div>
      </div>
    </div>
  );
}
