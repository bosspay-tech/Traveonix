// OfferBanners.jsx (responsive + snap + nicer sizing + safe width classes)
import React, { useState } from "react";
import { OFFERS } from "../data/mock";
import { Copy, Check } from "lucide-react";

export default function OfferBanners() {
  const [copiedId, setCopiedId] = useState(null);

  const copyCode = async (id, code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      window.clearTimeout(copyCode._t);
      copyCode._t = window.setTimeout(() => setCopiedId(null), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="
        flex gap-4 overflow-x-auto pb-4
        snap-x snap-mandatory
        [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
      "
    >
      {OFFERS.map((o) => {
        const isCopied = copiedId === o.id;

        return (
          <div
            key={o.id}
            className={`
              snap-start
              min-w-[92%] sm:min-w-130 md:min-w-155 lg:min-w-180
              rounded-4xl bg-linear-to-br ${o.tone}
              p-6 sm:p-7 shadow-lg
            `}
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                  {o.title}
                </div>
                <div className="mt-2 text-sm sm:text-base text-slate-700">
                  {o.subtitle}
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-slate-800">
                OFFER
              </span>
            </div>

            {/* Code */}
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/85 px-4 py-3">
              <div>
                <div className="text-[11px] font-medium text-slate-600">
                  Use code
                </div>
                <div className="font-mono text-lg font-extrabold tracking-widest text-slate-900">
                  {o.code}
                </div>
              </div>

              <button
                type="button"
                onClick={() => copyCode(o.id, o.code)}
                className="
                  inline-flex items-center gap-2 rounded-2xl
                  bg-white/70 px-3 py-2
                  text-xs font-semibold text-slate-800
                  hover:bg-white/90 transition
                  focus:outline-none focus:ring-2 focus:ring-white/60
                  active:scale-[0.98]
                "
                aria-label={`Copy code ${o.code}`}
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
