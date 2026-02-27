// Hero.jsx (responsive + professional, fixes widths/absolute overflow)
import React from "react";
import { motion } from "framer-motion";
import BusHero from "../assets/bus5.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-900/90 to-slate-950" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
              Fast • Safe • Comfortable
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Reserve your bus <span className="text-violet-300">tickets</span>{" "}
              in minutes
            </h1>

            <p className="max-w-xl text-sm sm:text-base text-white/70 leading-6">
              Find and book bus tickets with a few clicks. Compare operators,
              choose seats, and travel stress-free.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#booking"
                className="
                  inline-flex w-full sm:w-auto items-center justify-center
                  rounded-2xl bg-violet-600 px-5 py-3 text-sm font-bold text-white
                  hover:bg-violet-700 transition
                "
              >
                Reserve Seat Now
              </a>

              <a
                href="#booking"
                className="
                  inline-flex w-full sm:w-auto items-center justify-center
                  rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white/90
                  hover:bg-white/10 transition
                "
              >
                Explore Routes
              </a>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {["AC Sleeper", "RTC", "Volvo", "Overnight"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
              <div className="rounded-3xl bg-slate-950/40 p-3 sm:p-5">
                <img
                  src={BusHero}
                  alt="Bus"
                  className="w-full aspect-video object-contain"
                  loading="eager"
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl bg-white/5 p-3">
                  <div className="text-lg font-black text-white">500+</div>
                  <div className="text-[11px] text-white/60">Routes</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-3">
                  <div className="text-lg font-black text-white">120+</div>
                  <div className="text-[11px] text-white/60">Operators</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-3">
                  <div className="text-lg font-black text-white">24×7</div>
                  <div className="text-[11px] text-white/60">Support</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
