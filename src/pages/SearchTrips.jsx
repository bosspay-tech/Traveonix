// SearchTrips.jsx (responsive + cleaner layout)
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORIES, ROUTES } from "../data/mock";
import { ArrowLeftRight, Search } from "lucide-react";
import OfferBanners from "../components/OfferBanners";
import CategoryGrid from "../components/CategoryGrid";
import Hero from "../components/Hero";

import Bus1 from "../assets/bus1.png";
import Bus2 from "../assets/bus6.png";
import Bus3 from "../assets/bus8.png";
import Bus4 from "../assets/bus7.png";
import Bus5 from "../assets/bus9.png";
import Bus6 from "../assets/bus10.png";
import PopularRoutes from "../components/PopularRoutes";
import TrendingDestinations from "../components/TrendingDestinations";

const uniqSorted = (arr) =>
  Array.from(new Set(arr.filter(Boolean))).sort((a, b) =>
    String(a).localeCompare(String(b)),
  );

const BUS_IMAGES = [Bus1, Bus2, Bus3, Bus4, Bus5, Bus6];

const SectionTitle = ({ title, subtitle }) => (
  <div className="flex flex-col gap-1">
    <h2 className="text-xl sm:text-2xl font-black text-slate-900">{title}</h2>
    {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
  </div>
);

export default function SearchTrips() {
  const nav = useNavigate();
  const [sp] = useSearchParams();

  const cities = useMemo(() => {
    const all = (ROUTES || []).flatMap((r) => [r.from, r.to]);
    return uniqSorted(all);
  }, []);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState(1);
  const [err, setErr] = useState("");

  useEffect(() => {
    setFrom(sp.get("from") || "");
    setTo(sp.get("to") || "");
    setDate(sp.get("date") || "");
    setSeats(Number(sp.get("seats") || 1));
  }, [sp]);

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const submit = (e) => {
    e.preventDefault();
    setErr("");

    const f = (from || "").trim();
    const t = (to || "").trim();

    if (!f) return setErr("Select From city");
    if (!t) return setErr("Select To city");
    if (f.toLowerCase() === t.toLowerCase())
      return setErr("From and To cannot be same");
    if (!date) return setErr("Select travel date");
    if (!seats || seats < 1 || seats > 6) return setErr("Seats must be 1 to 6");

    nav(
      `/routes?from=${encodeURIComponent(f)}&to=${encodeURIComponent(
        t,
      )}&date=${encodeURIComponent(date)}&seats=${encodeURIComponent(seats)}`,
    );
  };

  return (
    <>
      <Hero />

      <div
        id="booking"
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-10"
      >
        {/* Search Card */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-1">
            <div className="text-lg sm:text-xl font-black text-slate-900">
              Search Bus Tickets
            </div>
            <div className="text-sm text-slate-500">
              Select route, date and seats to see available buses
            </div>
          </div>

          <form onSubmit={submit} className="mt-5 space-y-4">
            {/* From/To */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr] md:items-end">
              <div>
                <label className="text-xs text-slate-500">From</label>
                <input
                  list="cities"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="e.g. Delhi"
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <button
                type="button"
                onClick={swap}
                className="mx-auto mt-1 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 bg-slate-50 hover:bg-slate-100 transition"
                aria-label="Swap From and To"
              >
                <ArrowLeftRight className="h-5 w-5 text-slate-700" />
              </button>

              <div>
                <label className="text-xs text-slate-500">To</label>
                <input
                  list="cities"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="e.g. Jaipur"
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <datalist id="cities">
                {cities.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            {/* Date + Seats */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs text-slate-500">Travel date</label>
                <input
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500">Seats</label>
                <div className="mt-1 grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setSeats(n)}
                      className={[
                        "rounded-2xl border px-0 py-3 text-sm font-semibold transition",
                        n === seats
                          ? "border-red-400 bg-red-50 text-red-700"
                          : "border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100",
                      ].join(" ")}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {err ? (
              <div className="rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {err}
              </div>
            ) : null}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-red-500 to-rose-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:opacity-95 transition"
            >
              <Search className="h-4 w-4" />
              Search buses
            </button>
          </form>
        </div>

        <PopularRoutes
          onPick={(r) => {
            setFrom(r.from);
            setTo(r.to);
            document
              .getElementById("booking")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <div className="space-y-4">
          <SectionTitle
            title="Offers"
            subtitle="Save more with limited-time bus booking discounts."
          />
          <OfferBanners />
        </div>

        <TrendingDestinations
          onPick={(d) => {
            setTo(d.to);
            setFrom(d.exampleFrom || "Delhi");
            document
              .getElementById("booking")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* Our Buses */}
        <div className="space-y-4">
          <SectionTitle
            title="Our Buses"
            subtitle="A glimpse of premium buses across categories."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BUS_IMAGES.map((src, idx) => (
              <div
                key={idx}
                className="
                  group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm
                  hover:shadow-md transition
                "
              >
                <div className="rounded-2xl bg-slate-50 p-3">
                  <img
                    src={src}
                    alt={`bus-${idx + 1}`}
                    className="w-full aspect-video object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <SectionTitle
            title="Our Categories"
            subtitle="Choose from multiple bus types and travel needs."
          />
          <CategoryGrid categories={CATEGORIES} />
        </div>
      </div>
    </>
  );
}
