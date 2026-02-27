// components/TrendingDestinations.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../data/mock";
import { MapPin, ArrowRight, TrendingUp } from "lucide-react";

const fmtDuration = (mins) => {
  const m = Number(mins || 0);
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r}m`;
  if (!r) return `${h}h`;
  return `${h}h ${r}m`;
};

function buildTrending(routes = [], limit = 8) {
  const map = new Map();

  for (const r of routes) {
    const to = String(r.to || "").trim();
    const from = String(r.from || "").trim();
    if (!to) continue;

    const curr = map.get(to) || {
      to,
      count: 0,
      minFare: Infinity,
      minDuration: Infinity,
      exampleFrom: from || "—",
      exampleBusType: r.busType || "",
      exampleOperatorId: r.operatorId || "",
    };

    curr.count += 1;
    curr.minFare = Math.min(curr.minFare, Number(r.fare || 0));
    curr.minDuration = Math.min(curr.minDuration, Number(r.durationMins || 0));

    // keep first non-empty exampleFrom
    if (!curr.exampleFrom && from) curr.exampleFrom = from;

    map.set(to, curr);
  }

  return Array.from(map.values())
    .sort((a, b) => b.count - a.count || a.minFare - b.minFare)
    .slice(0, limit);
}

export default function TrendingDestinations({
  title = "Trending destinations",
  subtitle = "Most searched arrival cities right now.",
  limit = 8,
  onPick, // optional callback (to setFrom/setTo + scroll)
}) {
  const nav = useNavigate();

  const trending = useMemo(() => buildTrending(ROUTES, limit), [limit]);

  if (!trending.length) return null;

  const todayISO = new Date().toISOString().slice(0, 10);

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
            <TrendingUp className="h-4 w-4" />
            Trending
          </div>
          <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trending.map((d) => (
          <button
            key={d.to}
            type="button"
            onClick={() => {
              // If you want to keep them on home and prefill:
              if (onPick) return onPick(d);

              // Otherwise, navigate to results directly with a sensible default:
              // from = exampleFrom, to = destination, seats=1, date=today
              nav(
                `/routes?from=${encodeURIComponent(
                  d.exampleFrom || "Delhi",
                )}&to=${encodeURIComponent(d.to)}&date=${encodeURIComponent(
                  todayISO,
                )}&seats=1`,
              );
            }}
            className="
              group text-left rounded-3xl border border-slate-200 bg-white p-5 shadow-sm
              transition hover:-translate-y-0.5 hover:shadow-md hover:border-violet-300
              focus:outline-none focus:ring-2 focus:ring-violet-200
            "
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-50 text-violet-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {d.to}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    Popular arrival city
                  </div>
                </div>
              </div>

              <span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                {d.count} routes
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                From ₹{Math.round(d.minFare)}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                ~{fmtDuration(d.minDuration)}
              </span>
              {d.exampleFrom ? (
                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
                  From {d.exampleFrom}
                </span>
              ) : null}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-500">
                View buses
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-violet-600" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
