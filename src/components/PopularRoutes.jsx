import React, { useMemo } from "react";
import { ROUTES } from "../data/mock";
import { ArrowRight, Flame } from "lucide-react";

const countByKey = (routes) => {
  const map = new Map();
  for (const r of routes || []) {
    const from = String(r.from || "").trim();
    const to = String(r.to || "").trim();
    if (!from || !to) continue;

    const key = `${from}__${to}`;
    const curr = map.get(key) || {
      from,
      to,
      count: 0,
      minFare: Infinity,
      minDuration: Infinity,
    };

    curr.count += 1;
    curr.minFare = Math.min(curr.minFare, Number(r.fare || 0));
    curr.minDuration = Math.min(curr.minDuration, Number(r.durationMins || 0));

    map.set(key, curr);
  }

  return Array.from(map.values())
    .sort((a, b) => b.count - a.count || a.minFare - b.minFare)
    .slice(0, 8);
};

const fmtDuration = (mins) => {
  const m = Number(mins || 0);
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r}m`;
  if (!r) return `${h}h`;
  return `${h}h ${r}m`;
};

export default function PopularRoutes({ onPick }) {
  const popular = useMemo(() => countByKey(ROUTES), []);

  if (!popular.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
            <Flame className="h-4 w-4" />
            Popular
          </div>
          <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
            Popular Routes
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Quick picks based on high-demand city pairs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {popular.map((r) => (
          <button
            key={`${r.from}-${r.to}`}
            type="button"
            onClick={() => onPick?.(r)}
            className="
              group text-left rounded-3xl border border-slate-200 bg-white p-5 shadow-sm
              transition hover:-translate-y-0.5 hover:shadow-md hover:border-red-300
              focus:outline-none focus:ring-2 focus:ring-red-200
            "
          >
            <div className="text-sm font-extrabold text-slate-900">
              {r.from} <span className="text-slate-400">→</span> {r.to}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                From ₹{Math.round(r.minFare)}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                ~{fmtDuration(r.minDuration)}
              </span>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                {r.count} options
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-500">
                Search this route
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-red-600" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
