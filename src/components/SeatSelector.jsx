import React, { useEffect, useMemo, useState } from "react";

function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeSeatMap(seedKey, opts = {}) {
  const rows = opts.rows ?? 10; // 10 rows
  const cols = opts.cols ?? 4; // 2 + aisle + 2
  const total = rows * cols; // 40 seats
  const bookedRate = opts.bookedRate ?? 0.28;

  const rng = mulberry32(hashStr(seedKey || "seed"));
  const seats = [];

  for (let i = 1; i <= total; i++) {
    const booked = rng() < bookedRate;
    seats.push({
      id: `S${i}`,
      label: String(i),
      booked,
    });
  }

  return seats;
}

function pickRandomAvailable(seats, count, seedKey) {
  const rng = mulberry32(hashStr(`pick_${seedKey || "seed"}`));
  const available = seats.filter((s) => !s.booked).map((s) => s.id);

  // shuffle
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }

  return available.slice(0, Math.max(0, Math.min(count, available.length)));
}

export default function SeatSelector({
  seedKey,
  desiredSeats = 1,
  value = [],
  onChange,
  rows = 10,
  bookedRate = 0.28,
}) {
  const [limitMsg, setLimitMsg] = useState("");

  const seats = useMemo(
    () => makeSeatMap(seedKey, { rows, cols: 4, bookedRate }),
    [seedKey, rows, bookedRate],
  );

  const bookedSet = useMemo(() => {
    return new Set(seats.filter((s) => s.booked).map((s) => s.id));
  }, [seats]);

  // Auto-select random seats on first load / seed change
  useEffect(() => {
    const cleaned = (value || []).filter((id) => !bookedSet.has(id));
    const needsInit = cleaned.length === 0;

    if (needsInit) {
      const picked = pickRandomAvailable(seats, desiredSeats, seedKey);
      onChange?.(picked);
      return;
    }

    // If desiredSeats changed, trim
    if (cleaned.length > desiredSeats) {
      onChange?.(cleaned.slice(0, desiredSeats));
      return;
    }

    // If some selected became booked (seed change), clean
    if (cleaned.length !== (value || []).length) {
      onChange?.(cleaned);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedKey, desiredSeats, seats, bookedSet]);

  const selected = new Set(value || []);
  const byId = useMemo(() => new Map(seats.map((s) => [s.id, s])), [seats]);

  const toggle = (seatId) => {
    setLimitMsg("");
    if (bookedSet.has(seatId)) return;

    const curr = Array.isArray(value) ? [...value] : [];
    const exists = curr.includes(seatId);

    if (exists) {
      onChange?.(curr.filter((x) => x !== seatId));
      return;
    }

    if (curr.length >= desiredSeats) {
      setLimitMsg(`You can select only ${desiredSeats} seat(s).`);
      return;
    }

    onChange?.([...curr, seatId]);
  };

  // Build 2+aisle+2 grid per row
  const gridRows = useMemo(() => {
    const out = [];
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      const row = [];
      row.push(seats[idx++]); // left 1
      row.push(seats[idx++]); // left 2
      row.push(null); // aisle
      row.push(seats[idx++]); // right 1
      row.push(seats[idx++]); // right 2
      out.push(row);
    }
    return out;
  }, [seats, rows]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-slate-900">
            Select Seats
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Pick {desiredSeats} seat(s). Selected:{" "}
            <span className="font-semibold text-slate-900">
              {value?.length || 0}/{desiredSeats}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange?.(pickRandomAvailable(seats, desiredSeats, seedKey))
          }
          className="rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          Random
        </button>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-lg border border-slate-300 bg-white" />
          Available
        </div>
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-lg bg-emerald-500" />
          Selected
        </div>
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-lg bg-slate-200" />
          Booked
        </div>
      </div>

      {/* Seat grid */}
      <div className="mt-4 rounded-3xl bg-slate-50 p-4">
        <div className="mb-3 text-[11px] font-semibold text-slate-500">
          Front
        </div>

        <div className="space-y-2">
          {gridRows.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-5 gap-2">
              {row.map((s, cIdx) => {
                if (!s) {
                  return <div key={`a_${rIdx}_${cIdx}`} />;
                }

                const isBooked = s.booked;
                const isSelected = selected.has(s.id);

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggle(s.id)}
                    disabled={isBooked}
                    className={[
                      "h-10 rounded-2xl text-xs font-extrabold transition",
                      "focus:outline-none focus:ring-2 focus:ring-emerald-200",
                      isBooked
                        ? "cursor-not-allowed bg-slate-200 text-slate-400"
                        : isSelected
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100",
                    ].join(" ")}
                    aria-label={`Seat ${s.label} ${isBooked ? "booked" : isSelected ? "selected" : "available"}`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-3 text-[11px] text-slate-500">
          Aisle is the gap in the middle.
        </div>
      </div>

      {/* Selected list */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs text-slate-600">
          Selected seats:{" "}
          <span className="font-semibold text-slate-900">
            {(value || []).map((id) => byId.get(id)?.label || id).join(", ") ||
              "—"}
          </span>
        </div>

        {limitMsg ? (
          <div className="text-xs font-semibold text-rose-600">{limitMsg}</div>
        ) : null}
      </div>
    </div>
  );
}
