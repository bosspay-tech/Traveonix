import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { PROVIDERS, ROUTES } from "../data/mock";
import { formatINR } from "../utils/money";
import { logoUrlByDomain, logoUrlByName } from "../utils/logos";
import {
  FileJson,
  Filter,
  ArrowRight,
  Calendar,
  Users,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";

const fmtDuration = (mins) => {
  const m = Number(mins || 0);
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r}m`;
  if (!r) return `${h}h`;
  return `${h}h ${r}m`;
};

export default function AvailableRoutes() {
  const nav = useNavigate();
  const [sp] = useSearchParams();

  const from = (sp.get("from") || "").trim();
  const to = (sp.get("to") || "").trim();
  const date = sp.get("date") || "";
  const seats = Number(sp.get("seats") || 1);

  const operatorById = useMemo(() => {
    const all = Object.values(PROVIDERS || {}).flat();
    const map = new Map();
    all.forEach((p) => map.set(p.id, p));
    return map;
  }, []);

  const base = useMemo(() => {
    const f = from.toLowerCase();
    const t = to.toLowerCase();
    return (ROUTES || []).filter(
      (r) =>
        String(r.from || "").toLowerCase() === f &&
        String(r.to || "").toLowerCase() === t,
    );
  }, [from, to]);

  // filters
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [opFilter, setOpFilter] = useState("ALL");
  const [sort, setSort] = useState("FARE_ASC");
  const [showFilters, setShowFilters] = useState(false);

  const busTypes = useMemo(() => {
    const s = new Set(base.map((r) => r.busType).filter(Boolean));
    return [
      "ALL",
      ...Array.from(s).sort((a, b) => String(a).localeCompare(String(b))),
    ];
  }, [base]);

  const operators = useMemo(() => {
    const s = new Set(base.map((r) => r.operatorId).filter(Boolean));
    return ["ALL", ...Array.from(s)];
  }, [base]);

  const filtered = useMemo(() => {
    let list = base.filter((r) => {
      const okType = typeFilter === "ALL" ? true : r.busType === typeFilter;
      const okOp = opFilter === "ALL" ? true : r.operatorId === opFilter;
      return okType && okOp;
    });

    if (sort === "FARE_ASC")
      list.sort((a, b) => Number(a.fare) - Number(b.fare));
    if (sort === "FARE_DESC")
      list.sort((a, b) => Number(b.fare) - Number(a.fare));
    if (sort === "DUR_ASC")
      list.sort((a, b) => Number(a.durationMins) - Number(b.durationMins));

    return list;
  }, [base, typeFilter, opFilter, sort]);

  const totalFor = (fare) => Number(fare || 0) * Number(seats || 0);

  if (!from || !to) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-lg font-extrabold text-slate-900">
          Missing search
        </div>
        <div className="mt-1 text-sm text-slate-500">Please search again.</div>
        <div className="mt-4">
          <Link
            className="inline-flex rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
            to="/"
          >
            Go to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 mx-10 my-10 h-screen">
      {/* Header */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 text-lg font-extrabold text-slate-900">
                <MapPin className="h-5 w-5 text-slate-400" />
                {from} <span className="text-slate-400">→</span> {to}
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {filtered.length} option{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <div className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="font-semibold text-slate-900">
                  {date ? new Date(date).toLocaleDateString("en-IN") : "-"}
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="font-semibold text-slate-900">
                  {seats}
                </span>{" "}
                seat(s)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to={`/?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
                to,
              )}&date=${encodeURIComponent(date)}&seats=${encodeURIComponent(seats)}`}
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Modify search
            </Link>

            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters (collapsible on mobile) */}
        <div className={`mt-4 ${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <select
                className="w-full rounded-2xl border border-slate-300 bg-white pl-9 pr-4 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {busTypes.map((t) => (
                  <option key={t} value={t}>
                    {t === "ALL" ? "All bus types" : t}
                  </option>
                ))}
              </select>
            </div>

            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              value={opFilter}
              onChange={(e) => setOpFilter(e.target.value)}
            >
              <option value="ALL">All operators</option>
              {operators
                .filter((x) => x !== "ALL")
                .map((id) => (
                  <option key={id} value={id}>
                    {operatorById.get(id)?.name || id}
                  </option>
                ))}
            </select>

            <select
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="FARE_ASC">Sort: Fare low → high</option>
              <option value="FARE_DESC">Sort: Fare high → low</option>
              <option value="DUR_ASC">Sort: Duration short → long</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          No buses found for this route. Try another date or modify search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => {
            const op = operatorById.get(r.operatorId);
            const logo = op?.domain
              ? logoUrlByDomain(op.domain, { theme: "light", size: 64 })
              : logoUrlByName(op?.name || "Bus Operator", {
                  theme: "light",
                  size: 64,
                });

            return (
              <button
                key={r.id}
                onClick={() =>
                  nav(
                    `/pay/${encodeURIComponent(
                      r.categoryId,
                    )}?routeId=${encodeURIComponent(
                      r.id,
                    )}&date=${encodeURIComponent(date)}&seats=${encodeURIComponent(seats)}`,
                  )
                }
                className="
                  group text-left rounded-3xl border border-slate-200 bg-white p-5 shadow-sm
                  transition hover:-translate-y-0.5 hover:shadow-md hover:border-red-300
                  focus:outline-none focus:ring-2 focus:ring-red-200
                  active:scale-[0.99]
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-4">
                    {/* Logo */}
                    <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-100">
                      <img
                        src={logo}
                        alt={op?.name || "Operator"}
                        loading="lazy"
                        className="h-8 w-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <FileJson className="absolute h-5 w-5 text-slate-400 opacity-0 group-hover:opacity-100" />
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-slate-900">
                        {r.busType}
                      </div>
                      <div className="mt-1 text-xs text-slate-500 truncate">
                        {op?.name || "Operator"}
                        {op?.region ? (
                          <span className="text-slate-400"> • {op.region}</span>
                        ) : null}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                          {fmtDuration(r.durationMins)}
                        </span>
                        <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-700">
                          {seats} seat(s)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fare */}
                  <div className="text-right">
                    <div className="text-[11px] text-slate-500">Fare/seat</div>
                    <div className="text-lg font-black text-slate-900">
                      {formatINR(r.fare)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Total:{" "}
                    <span className="font-black text-slate-900">
                      {formatINR(totalFor(r.fare))}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                    Select <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
