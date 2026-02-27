// CategoryGrid.jsx (bus categories + lucide icons + clickable cards)
import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Moon,
  Snowflake,
  Landmark,
  Mountain,
  ArrowRight,
} from "lucide-react";

const ICONS = {
  popular: Star,
  overnight: Moon,
  ac: Snowflake,
  rtc: Landmark,
  hill: Mountain,
  pilgrimage: Landmark,
};

const Badge = ({ children }) => (
  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
    {children}
  </span>
);

export default function CategoryGrid({ categories = [] }) {
  // If you want to keep using CATEGORIES from mock, pass it in:
  // <CategoryGrid categories={CATEGORIES} />
  // This keeps the component reusable.

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => {
        const Icon = ICONS[c.id] || Star;

        return (
          <Link
            key={c.id}
            to="/"
            className="
              group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm
              transition hover:-translate-y-0.5 hover:shadow-md hover:border-red-300
              focus:outline-none focus:ring-2 focus:ring-red-200
            "
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-red-50 text-red-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {c.label}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{c.hint}</div>
                </div>
              </div>

              <Badge>{c.mode === "ticket" ? "Ticket" : c.mode}</Badge>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-500">
                Explore routes
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-red-600" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
