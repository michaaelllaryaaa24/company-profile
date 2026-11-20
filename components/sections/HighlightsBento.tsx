"use client";

import { motion } from "framer-motion";
import {
  Flame,
  ShieldCheck,
  Tv,
  Users,
  Wifi,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function HighlightsBento() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Exact Reference Split Composition: Maroon Image Frame + 2 Floating White Pills (Left) | Story + 3 Blush Stat Cards (Right) */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* LEFT: Deep Maroon Rounded Card + Warkop Photo + 2 Floating White Stat Pills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center lg:col-span-5"
          >
            <div className="relative w-full max-w-[340px]">
              {/* Deep Maroon Backdrop matching reference */}
              <div className="overflow-hidden rounded-[28px] bg-[#5A1115] p-3 shadow-2xl shadow-[#5A1115]/20">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85"
                  alt="Suasana Tongkrongan Hangat Warmindo Nusantara 24 Jam"
                  className="aspect-[4/4.6] w-full rounded-[20px] object-cover"
                />
              </div>

              {/* Floating Pill Left: 1.4 Juta+ Porsi Terjual */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 -left-4 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl shadow-[#5A1115]/15 ring-1 ring-[#F5D6D9] sm:-left-8"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDF1F2] text-[#C4252D]">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-sm font-extrabold text-[#C4252D]">
                    1,48 Jt+
                  </p>
                  <p className="text-[10px] font-semibold text-[#665A5B]">
                    Porsi Indomie Terjual
                  </p>
                </div>
              </motion.div>

              {/* Floating Pill Bottom Right: 14.200+ Pelanggan Puas */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{
                  duration: 4.2,
                  delay: 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-3 bottom-6 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl shadow-[#5A1115]/15 ring-1 ring-[#F5D6D9] sm:-right-8"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDF1F2] text-[#C4252D]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-sm font-extrabold text-[#C4252D]">
                    14.200+
                  </p>
                  <p className="text-[10px] font-semibold text-[#665A5B]">
                    Pelanggan Puas (4.9★)
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Eyebrow + Two-tone Headline + Copy + 3 Blush Stat Boxes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-bold tracking-wide text-[#C4252D]">
              Pengalaman Kami Sejak 2019
            </p>

            <h2 className="mt-2 font-display text-3xl leading-[1.15] font-bold tracking-tight text-[#1E1415] sm:text-4xl">
              Cerita <span className="text-[#C4252D]">Warmindo</span>
              <br />
              Penuh Kehangatan.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#665A5B] sm:text-base">
              Berawal dari 6 meja kayu di gang kampus Purwokerto, Warmindo
              Nusantara hadir menaikkan kelas budaya warkop Indonesia. Setiap
              mangkuk dimasak fresh dengan timer kematangan presisi, ditemani
              kopi single origin lokal, WiFi Fiber 100Mbps, dan arena nobar 4K
              yang buka 24 jam nonstop.
            </p>

            {/* 3 Soft Blush Stat Boxes — Exact match to reference's 3 pink stat cards! */}
            <div className="mt-7 grid grid-cols-3 gap-3 sm:max-w-lg sm:gap-4">
              <div className="rounded-xl bg-[#FDF1F2] p-4 text-center ring-1 ring-[#F5D6D9]/70">
                <p className="font-display text-xl font-extrabold text-[#C4252D] sm:text-2xl">
                  <AnimatedCounter value={1482} suffix="K+" />
                </p>
                <p className="mt-1 text-[11px] font-semibold text-[#665A5B]">
                  Porsi Indomie Terjual
                </p>
              </div>

              <div className="rounded-xl bg-[#FDF1F2] p-4 text-center ring-1 ring-[#F5D6D9]/70">
                <p className="font-display text-xl font-extrabold text-[#C4252D] sm:text-2xl">
                  <AnimatedCounter value={18} suffix="+" />
                </p>
                <p className="mt-1 text-[11px] font-semibold text-[#665A5B]">
                  Cabang Aktif 24 Jam
                </p>
              </div>

              <div className="rounded-xl bg-[#FDF1F2] p-4 text-center ring-1 ring-[#F5D6D9]/70">
                <p className="font-display text-xl font-extrabold text-[#C4252D] sm:text-2xl">
                  <AnimatedCounter value={4.9} decimals={1} suffix="★" />
                </p>
                <p className="mt-1 text-[11px] font-semibold text-[#665A5B]">
                  Rating Pelanggan
                </p>
              </div>
            </div>

            {/* Clean Facility Highlights Pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { icon: Wifi, text: "WiFi Fiber 100Mbps" },
                { icon: Tv, text: "Layar Nobar 4K 150\"" },
                { icon: ShieldCheck, text: "Open Kitchen 100% Halal" },
              ].map((pill) => {
                const Icon = pill.icon;
                return (
                  <span
                    key={pill.text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#F5D6D9] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1E1415]"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#C4252D]" />
                    {pill.text}
                  </span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
