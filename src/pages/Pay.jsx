import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { CATEGORIES, PROVIDERS, ROUTES, PAYMENT_METHODS } from "../data/mock";
import { formatINR } from "../utils/money";
import { addTxn } from "../utils/storage";
import SeatSelector from "../components/SeatSelector"; 

const fmtDuration = (mins) => {
  const m = Number(mins || 0);
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (!h) return `${r}m`;
  if (!r) return `${h}h`;
  return `${h}h ${r}m`;
};

const nextDayISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

export default function Pay() {
  const { category } = useParams();
  const [sp] = useSearchParams();

  const routeId = sp.get("routeId") || "";
  const dateParam = sp.get("date") || "";
  const seatsParam = Number(sp.get("seats") || 1);

  const nav = useNavigate();

  const cat = useMemo(
    () => CATEGORIES.find((c) => c.id === category),
    [category],
  );

  const operatorById = useMemo(() => {
    const all = Object.values(PROVIDERS || {}).flat();
    const map = new Map();
    all.forEach((p) => map.set(p.id, p));
    return map;
  }, []);

  const route = useMemo(
    () => (ROUTES || []).find((r) => r.id === routeId),
    [routeId],
  );

  const operator = useMemo(() => {
    if (!route?.operatorId) return null;
    return operatorById.get(route.operatorId) || null;
  }, [route?.operatorId, operatorById]);

  const [travelDate, setTravelDate] = useState(dateParam || nextDayISO());
  const [passengerName, setPassengerName] = useState("");
  const [phone, setPhone] = useState("");

  // ✅ seat selector state
  const [desiredSeats, setDesiredSeats] = useState(seatsParam || 1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    setErr("");
    setReceipt(null);
    setPassengerName("");
    setPhone("");
    setMethod("upi");

    setDesiredSeats(seatsParam || 1);
    setSelectedSeats([]);

    setTravelDate(dateParam || nextDayISO());
  }, [category, routeId, seatsParam, dateParam]);

  const total = useMemo(() => {
    const fare = Number(route?.fare || 0);
    return fare * Number(selectedSeats.length || 0);
  }, [route?.fare, selectedSeats.length]);

  const canPay = useMemo(() => {
    if (!cat) return false;
    if (!route) return false;
    if (!passengerName.trim()) return false;
    if (!/^[6-9]\d{9}$/.test((phone || "").trim())) return false;
    if (!travelDate) return false;
    if (!desiredSeats || desiredSeats < 1 || desiredSeats > 6) return false;
    if ((selectedSeats || []).length !== desiredSeats) return false;
    return true;
  }, [
    cat,
    route,
    passengerName,
    phone,
    travelDate,
    desiredSeats,
    selectedSeats,
  ]);

  if (!cat) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        Unknown category
      </div>
    );
  }

  if (!route) {
    return (
      <div className="space-y-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-lg font-extrabold text-slate-900">
            Route not selected
          </div>
          <div className="text-sm text-slate-500">
            Please select a route first.
          </div>

          <div className="mt-4">
            <Link
              className="inline-flex rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              to={`/providers/${category}`}
            >
              Choose route
            </Link>
          </div>
        </div>
      </div>
    );
  }

  async function handlePay() {
    setErr("");
    if (!canPay) return setErr("Please fill all details correctly.");

    setLoading(true);
    try {
      const txn = {
        id: `TXN_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
        kind: "bus_ticket",
        status: "SUCCESS",
        amount: total,
        currency: "INR",
        processedAt: new Date().toISOString(),

        categoryId: category,
        categoryLabel: cat.label,

        routeId: route.id,
        from: route.from,
        to: route.to,
        busType: route.busType,
        durationMins: route.durationMins,
        farePerSeat: Number(route.fare || 0),

        seats: Number(selectedSeats.length),
        seatNumbers: selectedSeats, // ✅ store selected seat ids

        operatorId: route.operatorId,
        operatorName: operator?.name || "Operator",
        operatorRegion: operator?.region || "",

        travelDate,
        passengerName: passengerName.trim(),
        phone: phone.trim(),
        method,
        title: `${route.from} → ${route.to}`,
        subtitle: `${route.busType} • ${selectedSeats.length} seat(s) • ${formatINR(total)}`,
      };

      addTxn(txn);
      setReceipt(txn);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-extrabold text-slate-900">
              Bus ticket payment
            </div>
            <div className="text-sm text-slate-500">
              Route:{" "}
              <span className="font-semibold text-slate-900">
                {route.from} → {route.to}
              </span>{" "}
              <span className="text-slate-400">•</span>{" "}
              <span className="font-semibold text-slate-900">
                {operator?.name || "Operator"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              to={`/providers/${category}`}
            >
              Change route
            </Link>
            <button
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              onClick={() => nav("/history")}
            >
              History
            </button>
          </div>
        </div>
      </div>

      {/* Success */}
      {receipt ? (
        <div className="rounded-[28px] border border-emerald-300 bg-emerald-50 p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-xl font-extrabold text-emerald-800">
                Booking Confirmed ✅
              </div>

              <div className="mt-2 text-sm text-slate-600">Ticket ID</div>
              <div className="font-mono text-sm font-black tracking-wider text-slate-900">
                {receipt.id}
              </div>

              <div className="mt-4 text-sm text-slate-600">
                {receipt.from} → {receipt.to}
                <br />
                {receipt.busType} • {fmtDuration(receipt.durationMins)}
                <br />
                Operator:{" "}
                <span className="font-semibold text-slate-900">
                  {receipt.operatorName}
                </span>
                <br />
                Travel date:{" "}
                <span className="font-semibold text-slate-900">
                  {new Date(receipt.travelDate).toLocaleDateString("en-IN")}
                </span>
                <br />
                Seats:{" "}
                <span className="font-semibold text-slate-900">
                  {receipt.seats}
                </span>
                {receipt.seatNumbers?.length ? (
                  <>
                    {" "}
                    <span className="text-slate-400">•</span>{" "}
                    <span className="font-semibold text-slate-900">
                      {receipt.seatNumbers.join(", ")}
                    </span>
                  </>
                ) : null}
                <br />
                Passenger:{" "}
                <span className="font-semibold text-slate-900">
                  {receipt.passengerName} ({receipt.phone})
                </span>
                <br />
                Method:{" "}
                <span className="font-semibold text-slate-900">
                  {String(receipt.method).toUpperCase()}
                </span>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-4 text-right shadow-sm">
              <div className="text-xs text-slate-500">Amount Paid</div>
              <div className="text-2xl font-black text-slate-900">
                {formatINR(receipt.amount)}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {new Date(receipt.processedAt).toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
              to="/"
            >
              Back to Home
            </Link>
            <button
              className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
              onClick={() => nav("/history")}
            >
              View History
            </button>
            <button
              className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
              onClick={() => nav(`/providers/${category}`)}
            >
              Book another
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* Passenger details */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-slate-900">
              Passenger details
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-slate-500">Travel date</label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                  value={travelDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setTravelDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs text-slate-500">Passenger name</label>
                <input
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="e.g. Rahul Sharma"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs text-slate-500">Mobile number</label>
                <input
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  placeholder="10-digit mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="numeric"
                />
                <div className="mt-1 text-[11px] text-slate-400">
                  Used for ticket confirmation.
                </div>
              </div>

              {/* ✅ Seat selector */}
              <SeatSelector
                seedKey={`${routeId}_${travelDate}`}
                desiredSeats={desiredSeats}
                value={selectedSeats}
                onChange={setSelectedSeats}
              />

              {err && (
                <div className="rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {err}
                </div>
              )}
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-extrabold text-slate-900">Payment</div>

            <div className="mt-4 space-y-3">
              <div className="rounded-3xl bg-slate-50 p-4">
                <div className="text-xs text-slate-500">Trip summary</div>

                <div className="mt-2 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {route.from} → {route.to}
                    </div>
                    <div className="text-xs text-slate-500">
                      {route.busType} • {fmtDuration(route.durationMins)}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {operator?.name || "Operator"}{" "}
                      {operator?.region ? (
                        <span className="text-slate-400">
                          • {operator.region}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      Selected seats:{" "}
                      <span className="font-semibold text-slate-900">
                        {selectedSeats.length ? selectedSeats.join(", ") : "—"}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-500">Fare / seat</div>
                    <div className="text-lg font-black text-slate-900">
                      {formatINR(route.fare)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Seats</span>
                  <span className="font-semibold text-slate-700">
                    {selectedSeats.length}/{desiredSeats}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span>Total</span>
                  <span className="font-black text-slate-900">
                    {formatINR(total)}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500">Method</label>
                <select
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label} — {m.hint}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handlePay}
                disabled={loading || !canPay}
                className="w-full rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
              >
                {loading ? "Processing…" : `Pay ${formatINR(total)}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
