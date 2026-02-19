import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORIES, PROVIDERS, ROUTES } from "../data/mock";
import { FileJson } from "lucide-react";
import { logoUrlByDomain, logoUrlByName } from "../utils/logos";

const fmtINR = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

const fmtDuration = (mins) => {
  const m = Number(mins || 0);
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r}m`;
  if (!r) return `${h}h`;
  return `${h}h ${r}m`;
};

export default function Providers() {
  const { category } = useParams();
  const nav = useNavigate();

  const [q, setQ] = useState("");
  const [fromFilter, setFromFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [fareBand, setFareBand] = useState("ALL");

  const cat = useMemo(
    () => CATEGORIES.find((c) => c.id === category),
    [category],
  );

  // Flatten all operators into a lookup map by id
  const operatorById = useMemo(() => {
    const all = Object.values(PROVIDERS || {}).flat();
    const map = new Map();
    all.forEach((p) => map.set(p.id, p));
    return map;
  }, []);

  // Route list for selected category
  const list = useMemo(() => {
    return (ROUTES || []).filter((r) => r.categoryId === category);
  }, [category]);

  // From city options
  const fromCities = useMemo(() => {
    const s = new Set(list.map((r) => r.from).filter(Boolean));
    return [
      "ALL",
      ...Array.from(s).sort((a, b) => String(a).localeCompare(String(b))),
    ];
  }, [list]);

  // Bus type options
  const busTypes = useMemo(() => {
    const s = new Set(list.map((r) => r.busType).filter(Boolean));
    return [
      "ALL",
      ...Array.from(s).sort((a, b) => String(a).localeCompare(String(b))),
    ];
  }, [list]);

  const fareBands = useMemo(
    () => [
      { id: "ALL", label: "All fares" },
      { id: "300-600", label: "₹300–₹600", min: 300, max: 600 },
      { id: "601-900", label: "₹601–₹900", min: 601, max: 900 },
      { id: "901-1300", label: "₹901–₹1300", min: 901, max: 1300 },
      { id: "1301-2000", label: "₹1301–₹2000", min: 1301, max: 2000 },
    ],
    [],
  );

  // Search + filters
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    const band = fareBands.find((b) => b.id === fareBand);

    return list.filter((r) => {
      const op = operatorById.get(r.operatorId);

      const haystack = [
        r.from,
        r.to,
        r.busType,
        String(r.fare),
        op?.name,
        op?.region,
        ...(r.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !s ? true : haystack.includes(s);

      const matchesFrom =
        fromFilter === "ALL" ? true : String(r.from) === String(fromFilter);

      const matchesType =
        typeFilter === "ALL" ? true : String(r.busType) === String(typeFilter);

      const matchesFare =
        !band || band.id === "ALL"
          ? true
          : Number(r.fare) >= Number(band.min) &&
            Number(r.fare) <= Number(band.max);

      return matchesSearch && matchesFrom && matchesType && matchesFare;
    });
  }, [q, list, fromFilter, typeFilter, fareBand, fareBands, operatorById]);

  // Group by origin city (From)
  const groupedByFrom = useMemo(() => {
    const map = {};
    filtered.forEach((r) => {
      const key = r.from || "Other";
      if (!map[key]) map[key] = [];
      map[key].push(r);
    });

    // Sort routes inside each group by fare asc
    Object.keys(map).forEach((k) => {
      map[k].sort((a, b) => Number(a.fare) - Number(b.fare));
    });

    return map;
  }, [filtered]);

  if (!cat) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-lg font-extrabold text-slate-900">
          Unknown category
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-extrabold text-slate-900">
              Choose {cat.label} route
            </div>
            <div className="text-sm text-slate-500">
              Search and select a bus route
            </div>
          </div>

          {/* Filters */}
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <select
              className="w-full md:w-48 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              value={fromFilter}
              onChange={(e) => setFromFilter(e.target.value)}
            >
              {fromCities.map((c) => (
                <option key={c} value={c}>
                  {c === "ALL" ? "All origins" : c}
                </option>
              ))}
            </select>

            <select
              className="w-full md:w-52 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {busTypes.map((t) => (
                <option key={t} value={t}>
                  {t === "ALL" ? "All bus types" : t}
                </option>
              ))}
            </select>

            <select
              className="w-full md:w-44 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              value={fareBand}
              onChange={(e) => setFareBand(e.target.value)}
            >
              {fareBands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>

            <input
              className="w-full md:w-80 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              placeholder="Search city/operator/bus type…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          No routes found for these filters.
        </div>
      ) : null}

      <div className="space-y-6">
        {Object.entries(groupedByFrom).map(([from, routes]) => (
          <div key={from} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-700">{from}</h3>
              <span className="text-xs text-slate-400">
                {routes.length} route{routes.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((r) => {
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
                    onClick={
                      () =>
                        nav(
                          `/pay/${category}?routeId=${encodeURIComponent(r.id)}`,
                        )
                      // change route if needed, eg:
                      // nav(`/bus/${category}?routeId=${encodeURIComponent(r.id)}`)
                    }
                    className="
                      group relative text-left rounded-3xl border border-slate-200
                      bg-white p-5 shadow-sm transition
                      hover:-translate-y-0.5 hover:shadow-md
                      hover:border-indigo-300 focus:outline-none
                      focus:ring-2 focus:ring-indigo-200
                    "
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4">
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

                        <div>
                          <div className="text-sm font-extrabold text-slate-900 leading-snug">
                            {r.from} → {r.to}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            {r.busType}
                            <span className="text-slate-400">
                              {" "}
                              • {fmtDuration(r.durationMins)}
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            {op?.name ? (
                              <>
                                {op.name}
                                {op.region ? (
                                  <span className="text-slate-400">
                                    {" "}
                                    • {op.region}
                                  </span>
                                ) : null}
                              </>
                            ) : (
                              <span className="text-slate-400">Operator</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <span className="h-fit rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-medium text-indigo-600">
                        {fmtINR(r.fare)}
                      </span>
                    </div>

                    <div className="mt-4 text-xs font-medium text-slate-500 group-hover:text-indigo-600">
                      Tap to continue →
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
