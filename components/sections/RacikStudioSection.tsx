"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChefHat,
  Flame,
  RotateCcw,
  ShoppingBag,
  Shuffle,
  Sparkles,
  Timer,
} from "lucide-react";
import {
  DONENESS_OPTIONS,
  formatRupiah,
  MIE_BASES,
  SPICY_LEVEL_INFO,
  TOPPING_OPTIONS,
} from "@/data/warmindoData";
import {
  calculateCustomMieSummary,
  useWarmindoStore,
} from "@/store/useWarmindoStore";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InteractiveIndomieBowl } from "@/components/ui/InteractiveIndomieBowl";

const SPICY_LEVELS: (0 | 1 | 2 | 3 | 4 | 5)[] = [0, 1, 2, 3, 4, 5];

export function RacikStudioSection() {
  const [mounted, setMounted] = useState(false);

  const customMie = useWarmindoStore((s) => s.customMie);
  const setCustomBase = useWarmindoStore((s) => s.setCustomBase);
  const setCustomDoneness = useWarmindoStore((s) => s.setCustomDoneness);
  const setCustomSpicyLevel = useWarmindoStore((s) => s.setCustomSpicyLevel);
  const toggleCustomTopping = useWarmindoStore((s) => s.toggleCustomTopping);
  const setCustomDoublePortion = useWarmindoStore(
    (s) => s.setCustomDoublePortion
  );
  const setCustomName = useWarmindoStore((s) => s.setCustomName);
  const setCustomNote = useWarmindoStore((s) => s.setCustomNote);
  const randomizeCustomMie = useWarmindoStore((s) => s.randomizeCustomMie);
  const resetCustomMie = useWarmindoStore((s) => s.resetCustomMie);
  const addCustomMieToCart = useWarmindoStore((s) => s.addCustomMieToCart);
  const setCartOpen = useWarmindoStore((s) => s.setCartOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const summary = useMemo(
    () => calculateCustomMieSummary(customMie),
    [customMie]
  );

  return (
    <section id="racik-studio" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Studio Interaktif Warmindo"
            highlight="Racik"
            title="Indomie-mu Sendiri"
            highlightFirst
            description="Pilih base mie, kematangan presisi detik, level cabai rawit (0–5), dan topping foto asli favoritmu. Lihat mangkukmu berubah secara real-time!"
            icon={<ChefHat className="h-4 w-4" />}
          />

          <div className="flex flex-wrap items-center gap-2.5">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={randomizeCustomMie}
              className="inline-flex items-center gap-2 rounded-lg bg-[#C4252D] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#C4252D]/20 transition hover:bg-[#A81D24]"
            >
              <Shuffle className="h-3.5 w-3.5" />
              Acak Racikan
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={resetCustomMie}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#FDF1F2] px-3.5 py-2.5 text-xs font-bold text-[#C4252D] transition hover:bg-[#C4252D] hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </motion.button>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* LEFT: Clean Minimalist Blush-Card Builder with Real Food Photos */}
          <div className="space-y-6 lg:col-span-7">
            {/* STEP 1: Base Mie (with real circular noodle thumbnails!) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(90,17,21,0.06)] ring-1 ring-rose-100/90 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C4252D] font-mono text-xs font-extrabold text-white">
                    01
                  </span>
                  <h3 className="font-display text-base font-bold text-[#1E1415] sm:text-lg">
                    Pilih Base Mie
                  </h3>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() =>
                    setCustomDoublePortion(!customMie.doublePortion)
                  }
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    mounted && customMie.doublePortion
                      ? "bg-[#C4252D] text-white shadow-sm"
                      : "bg-[#FDF1F2] text-[#1E1415] hover:text-[#C4252D]"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full ${
                      mounted && customMie.doublePortion
                        ? "bg-white text-[#C4252D]"
                        : "bg-white ring-1 ring-[#F5D6D9]"
                    }`}
                  >
                    {mounted && customMie.doublePortion && (
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    )}
                  </span>
                  Porsi Jumbo 2x (+Rp6.500)
                </motion.button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {MIE_BASES.map((base) => {
                  const selected = mounted && customMie.baseId === base.id;
                  return (
                    <motion.button
                      key={base.id}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCustomBase(base.id)}
                      className={`group flex items-start gap-3.5 rounded-2xl p-3.5 text-left transition-all duration-200 ${
                        selected
                          ? "bg-[#C4252D] text-white shadow-lg shadow-[#C4252D]/20"
                          : "bg-[#FDF1F2] text-[#1E1415] hover:shadow-md hover:shadow-[#5A1115]/5"
                      }`}
                    >
                      <div
                        className={`h-14 w-14 shrink-0 overflow-hidden rounded-full shadow-sm ${
                          selected
                            ? "ring-2 ring-white/50"
                            : "ring-2 ring-white"
                        }`}
                      >
                        <img
                          src={base.image}
                          alt={base.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                              selected
                                ? "bg-white/20 text-white"
                                : "bg-white text-[#C4252D]"
                            }`}
                          >
                            {base.style}
                          </span>
                          <span
                            className={`font-mono text-xs font-extrabold ${
                              selected ? "text-white" : "text-[#C4252D]"
                            }`}
                          >
                            {formatRupiah(base.price)}
                          </span>
                        </div>
                        <h4 className="mt-1.5 font-display text-sm font-bold leading-snug">
                          {base.name}
                        </h4>
                        <p
                          className={`mt-0.5 line-clamp-2 text-[11px] leading-relaxed ${
                            selected ? "text-rose-100" : "text-[#665A5B]"
                          }`}
                        >
                          {base.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* STEP 2: Kematangan & STEP 3: Level Pedas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(90,17,21,0.06)] ring-1 ring-rose-100/90 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C4252D] font-mono text-xs font-extrabold text-white">
                  02
                </span>
                <h3 className="font-display text-base font-bold text-[#1E1415] sm:text-lg">
                  Tingkat Kematangan Presisi
                </h3>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {DONENESS_OPTIONS.map((opt) => {
                  const selected = mounted && customMie.doneness === opt.id;
                  return (
                    <motion.button
                      key={opt.id}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setCustomDoneness(opt.id)}
                      className={`rounded-2xl p-4 text-left transition-all ${
                        selected
                          ? "bg-[#C4252D] text-white shadow-md shadow-[#C4252D]/20"
                          : "bg-[#FDF1F2] text-[#1E1415] hover:shadow-sm"
                      }`}
                    >
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-[11px] font-bold ${
                          selected ? "text-amber-300" : "text-[#C4252D]"
                        }`}
                      >
                        <Timer className="h-3.5 w-3.5" />
                        {opt.cookTime}
                      </span>
                      <h4 className="mt-1.5 font-display text-sm font-bold">
                        {opt.label}
                      </h4>
                      <p
                        className={`mt-1 text-[11px] leading-relaxed ${
                          selected ? "text-rose-100" : "text-[#665A5B]"
                        }`}
                      >
                        {opt.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(90,17,21,0.06)] ring-1 ring-rose-100/90 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C4252D] font-mono text-xs font-extrabold text-white">
                    03
                  </span>
                  <h3 className="font-display text-base font-bold text-[#1E1415] sm:text-lg">
                    Level Cabai Rawit (0 – 5)
                  </h3>
                </div>
                <span className="rounded-full bg-[#FDF1F2] px-3 py-1 text-xs font-bold text-[#C4252D]">
                  {summary.spicyInfo.label}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-6 gap-2">
                {SPICY_LEVELS.map((lvl) => {
                  const active = mounted && customMie.spicyLevel === lvl;
                  const extra = SPICY_LEVEL_INFO[lvl].extraPrice;
                  return (
                    <motion.button
                      key={lvl}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setCustomSpicyLevel(lvl)}
                      className={`flex flex-col items-center justify-center rounded-xl py-2.5 transition-all ${
                        active
                          ? "bg-[#C4252D] text-white shadow-md shadow-[#C4252D]/25"
                          : "bg-[#FDF1F2] text-[#1E1415] hover:bg-rose-100"
                      }`}
                    >
                      <span className="font-mono text-base font-extrabold">
                        {lvl}
                      </span>
                      <div className="mt-0.5 flex items-center gap-0.5">
                        {lvl === 0 ? (
                          <span className="text-[10px]">Mild</span>
                        ) : (
                          Array.from({ length: Math.min(lvl, 3) }).map((_, i) => (
                            <Flame
                              key={i}
                              className={`h-2.5 w-2.5 ${
                                active
                                  ? "fill-amber-300 text-amber-300"
                                  : "fill-[#C4252D] text-[#C4252D]"
                              }`}
                            />
                          ))
                        )}
                      </div>
                      <span
                        className={`mt-0.5 font-mono text-[10px] ${
                          active ? "text-rose-100" : "text-[#665A5B]"
                        }`}
                      >
                        {extra === 0 ? "Free" : `+${extra / 1000}k`}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* STEP 4: Multi-Select Topping with REAL HIGH-RES FOOD PHOTOS! */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(90,17,21,0.06)] ring-1 ring-rose-100/90 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C4252D] font-mono text-xs font-extrabold text-white">
                    04
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#1E1415] sm:text-lg">
                      Pilih Topping Foto Asli (Multi-Select)
                    </h3>
                    <p className="text-xs text-[#665A5B]">
                      Klik topping untuk melihatnya langsung jatuh & mendarat di
                      mangkuk!
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#FDF1F2] px-3 py-1 font-mono text-xs font-bold text-[#C4252D]">
                  {mounted ? customMie.toppingIds.length : 0} dipilih
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {TOPPING_OPTIONS.map((topping) => {
                  const selected =
                    mounted && customMie.toppingIds.includes(topping.id);
                  return (
                    <motion.button
                      key={topping.id}
                      type="button"
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleCustomTopping(topping.id)}
                      className={`group flex items-center justify-between gap-3 rounded-2xl p-3 text-left transition-all ${
                        selected
                          ? "bg-[#C4252D] text-white shadow-md shadow-[#C4252D]/20"
                          : "bg-[#FDF1F2] text-[#1E1415] hover:bg-rose-100/80"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {/* REAL PHOTOGRAPH OF EACH TOPPING */}
                        <div
                          className={`h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-sm ${
                            selected
                              ? "ring-2 ring-white/60"
                              : "ring-2 ring-white"
                          }`}
                        >
                          <img
                            src={topping.image}
                            alt={topping.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold sm:text-sm">
                            {topping.name}
                          </p>
                          <p
                            className={`mt-0.5 font-mono text-[11px] ${
                              selected ? "text-rose-100" : "text-[#665A5B]"
                            }`}
                          >
                            +{formatRupiah(topping.price)} • {topping.calories}{" "}
                            kkal
                          </p>
                        </div>
                      </div>

                      <motion.span
                        animate={{ scale: selected ? [0.7, 1.15, 1] : 1 }}
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition ${
                          selected
                            ? "bg-white text-[#C4252D]"
                            : "bg-white text-transparent ring-1 ring-[#F5D6D9]"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </motion.span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[#FDF1F2] pt-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={mounted ? customMie.customName : ""}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Nama racikanmu (opsional, misal: Mie Begadang)"
                  maxLength={40}
                  className="w-full rounded-xl bg-[#FDF1F2] px-3.5 py-2.5 text-xs text-[#1E1415] placeholder:text-[#665A5B]/70 focus:bg-white focus:ring-1 focus:ring-[#C4252D] focus:outline-none sm:text-sm"
                />
                <input
                  type="text"
                  value={mounted ? customMie.note : ""}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Catatan koki (misal: kuah nyemek, extra bawang)"
                  maxLength={80}
                  className="w-full rounded-xl bg-[#FDF1F2] px-3.5 py-2.5 text-xs text-[#1E1415] placeholder:text-[#665A5B]/70 focus:bg-white focus:ring-1 focus:ring-[#C4252D] focus:outline-none sm:text-sm"
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Sticky White Studio Summary Card + Real Photo Interactive Indomie Bowl! */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white p-4 shadow-[0_16px_45px_rgba(90,17,21,0.1)] ring-1 ring-rose-100 sm:p-5"
            >
              <InteractiveIndomieBowl
                base={summary.base}
                config={customMie}
                selectedToppings={summary.selectedToppings}
                mounted={mounted}
              />

              {/* Clean Receipt Summary */}
              <div className="mt-4 space-y-2 px-1 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-[#1E1415]">
                  <span className="font-semibold">
                    {summary.base.name}{" "}
                    {customMie.doublePortion && (
                      <span className="text-[#C4252D]">(2x)</span>
                    )}
                  </span>
                  <span className="font-mono font-bold">
                    {formatRupiah(summary.basePrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#665A5B]">
                  <span>Rawit ({summary.spicyInfo.rawitCount})</span>
                  <span className="font-mono">
                    {summary.spicyPrice === 0
                      ? "Gratis"
                      : `+${formatRupiah(summary.spicyPrice)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#665A5B]">
                  <span>
                    Topping ({mounted ? summary.selectedToppings.length : 0})
                  </span>
                  <span className="font-mono font-semibold text-[#1E1415]">
                    +{formatRupiah(summary.toppingsPrice)}
                  </span>
                </div>
              </div>

              {/* Blush Total & Calorie Pill Box */}
              <div className="mt-4 rounded-2xl bg-[#FDF1F2] p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-[#665A5B] uppercase">
                      Total Harga
                    </p>
                    <motion.p
                      key={summary.totalPrice}
                      initial={{ scale: 0.92 }}
                      animate={{ scale: 1 }}
                      className="font-mono text-2xl font-extrabold text-[#C4252D]"
                    >
                      {formatRupiah(summary.totalPrice)}
                    </motion.p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-[#665A5B] uppercase">
                      Estimasi Kalori
                    </p>
                    <motion.p
                      key={summary.totalCalories}
                      initial={{ scale: 0.92 }}
                      animate={{ scale: 1 }}
                      className="font-mono text-base font-extrabold text-[#1E1415]"
                    >
                      {summary.totalCalories.toLocaleString("id-ID")} kkal
                    </motion.p>
                  </div>
                </div>
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white">
                  <motion.div
                    animate={{
                      width: `${Math.min(
                        (summary.totalCalories / 1300) * 100,
                        100
                      )}%`,
                    }}
                    transition={{ type: "spring", stiffness: 140, damping: 20 }}
                    className="h-full rounded-full bg-[#C4252D]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2.5">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={addCustomMieToCart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#C4252D] px-5 py-3.5 text-xs font-extrabold text-white shadow-md shadow-[#C4252D]/25 transition hover:bg-[#A81D24] sm:text-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  Masukkan ke Keranjang
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setCartOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FDF1F2] px-4 py-3.5 text-xs font-bold text-[#C4252D] transition hover:bg-[#C4252D] hover:text-white"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Cart
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
