"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Flame, Sparkles, Timer } from "lucide-react";
import { CustomMieConfig, MieBaseOption, ToppingOption } from "@/types/warmindo";

interface InteractiveIndomieBowlProps {
  base: MieBaseOption;
  config: CustomMieConfig;
  selectedToppings: ToppingOption[];
  mounted: boolean;
}

const BASE_IMAGE_FILTER: Record<string, string> = {
  "goreng-original": "saturate(1.08) contrast(1.04)",
  "goreng-rendang": "saturate(1.2) contrast(1.08) brightness(0.92)",
  "goreng-aceh": "saturate(1.26) contrast(1.06) hue-rotate(-6deg)",
  "kuah-soto": "saturate(1.12) brightness(1.05)",
  "kuah-kari": "saturate(1.18) contrast(1.05)",
};

// Strategic plating coordinates around & inside the real Indomie bowl
// so every selected real topping photo looks naturally plated without colliding!
const TOPPING_SLOTS: Record<
  string,
  {
    posClass: string;
    sizeClass: string;
    rotate: number;
    zIndex: string;
    floatDelay: number;
  }
> = {
  "telur-setengah-matang": {
    posClass: "bottom-[16%] left-[12%]",
    sizeClass: "h-[74px] w-[74px] sm:h-[82px] sm:w-[82px]",
    rotate: -6,
    zIndex: "z-20",
    floatDelay: 0,
  },
  "keju-mozzarella": {
    posClass: "top-[16%] right-[11%]",
    sizeClass: "h-[70px] w-[70px] sm:h-[78px] sm:w-[78px]",
    rotate: 8,
    zIndex: "z-20",
    floatDelay: 0.35,
  },
  "sosis-bakar": {
    posClass: "bottom-[12%] right-[13%]",
    sizeClass: "h-[68px] w-[68px] sm:h-[76px] sm:w-[76px]",
    rotate: -10,
    zIndex: "z-20",
    floatDelay: 0.65,
  },
  "kornet-sapi": {
    posClass: "top-[12%] left-[15%]",
    sizeClass: "h-[66px] w-[66px] sm:h-[74px] sm:w-[74px]",
    rotate: 6,
    zIndex: "z-10",
    floatDelay: 0.2,
  },
  "bakso-urat": {
    posClass: "top-[6%] left-[44%]",
    sizeClass: "h-[62px] w-[62px] sm:h-[68px] sm:w-[68px]",
    rotate: -4,
    zIndex: "z-10",
    floatDelay: 0.5,
  },
  "ceker-pedas": {
    posClass: "bottom-[42%] right-[4%]",
    sizeClass: "h-[62px] w-[62px] sm:h-[68px] sm:w-[68px]",
    rotate: 12,
    zIndex: "z-30",
    floatDelay: 0.85,
  },
  "saus-telur-asin": {
    posClass: "top-[42%] left-[4%]",
    sizeClass: "h-[60px] w-[60px] sm:h-[66px] sm:w-[66px]",
    rotate: -8,
    zIndex: "z-30",
    floatDelay: 0.45,
  },
  "pangsit-kriuk": {
    posClass: "bottom-[4%] left-[40%]",
    sizeClass: "h-[62px] w-[62px] sm:h-[68px] sm:w-[68px]",
    rotate: 5,
    zIndex: "z-30",
    floatDelay: 0.75,
  },
};

export function InteractiveIndomieBowl({
  base,
  config,
  selectedToppings,
  mounted,
}: InteractiveIndomieBowlProps) {
  const imageFilter = BASE_IMAGE_FILTER[base.id] ?? "none";
  const heatIntensity = config.spicyLevel / 5;
  const bowlScale = config.doublePortion ? 1.06 : 1;

  return (
    <div className="relative overflow-hidden rounded-[26px] bg-[#5A1115] px-4 pt-6 pb-5 text-white shadow-xl shadow-[#5A1115]/20">
      {/* Studio Radial Spotlight */}
      <motion.div
        aria-hidden
        animate={{
          opacity: config.spicyLevel >= 4 ? [0.75, 1, 0.75] : [0.6, 0.85, 0.6],
        }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            config.spicyLevel >= 4
              ? "radial-gradient(circle at 50% 48%, rgba(239,68,68,0.48) 0%, rgba(90,17,21,0) 68%)"
              : "radial-gradient(circle at 50% 48%, rgba(245,158,11,0.26) 0%, rgba(90,17,21,0) 68%)",
        }}
      />

      {/* Rising Spicy Ember Sparks (Level 3 - 5) */}
      {config.spicyLevel >= 3 && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {[18, 34, 52, 68, 82].map((leftPct, i) => (
            <motion.span
              key={leftPct}
              style={{ left: `${leftPct}%` }}
              animate={{
                y: [260, 40],
                opacity: [0, 0.9, 0],
                scale: [0.6, 1.2, 0.4],
              }}
              transition={{
                duration: 2 + i * 0.35,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute bottom-4 h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#EF4444]"
            />
          ))}
        </div>
      )}

      {/* Top Stage Header */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-amber-300 uppercase">
            <Sparkles className="h-3 w-3" />
            Live Real Plating
          </span>
          <h3 className="mt-1.5 font-display text-lg font-bold text-white leading-tight">
            {mounted && config.customName.trim()
              ? `“${config.customName.trim()}”`
              : base.name}
          </h3>
        </div>

        <motion.span
          key={config.doublePortion ? "2x" : "1x"}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`shrink-0 rounded-full px-3 py-1 font-mono text-[11px] font-extrabold transition ${
            config.doublePortion
              ? "bg-amber-400 text-[#1E1415] shadow-md"
              : "bg-white/15 text-white"
          }`}
        >
          {config.doublePortion ? "JUMBO 2X" : "Reguler 1x"}
        </motion.span>
      </div>

      {/* CENTER PHOTOREALISTIC INTERACTIVE BOWL + REAL TOPPING PHOTOS */}
      <div className="relative mx-auto mt-4 mb-3 flex h-[282px] w-[282px] items-center justify-center sm:h-[310px] sm:w-[310px]">
        {/* Realistic Rising Volumetric Steam Plumes */}
        <svg
          aria-hidden
          viewBox="0 0 240 120"
          className="pointer-events-none absolute -top-7 left-1/2 z-40 h-28 w-56 -translate-x-1/2 overflow-visible"
        >
          <defs>
            <filter id="steamBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5.5" />
            </filter>
          </defs>
          {[
            { d: "M75 110 C62 80, 92 55, 76 18", delay: 0, dur: 3.0 },
            { d: "M120 115 C106 82, 138 50, 118 8", delay: 0.65, dur: 3.4 },
            { d: "M165 110 C152 82, 180 54, 162 20", delay: 1.25, dur: 2.8 },
          ].map((plume, i) => (
            <motion.path
              key={i}
              d={plume.d}
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="10"
              strokeLinecap="round"
              filter="url(#steamBlur)"
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: [0, 0.58, 0],
                y: [12, -26],
                scaleX: [0.9, 1.25, 1.45],
              }}
              transition={{
                duration: plume.dur,
                delay: plume.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </svg>

        {/* Spicy Heat Aura Pulsing Ring */}
        {config.spicyLevel >= 3 && (
          <motion.div
            animate={{
              scale: [1, 1.07, 1],
              opacity: [0.35, 0.8, 0.35],
            }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-3 rounded-full border-2 border-red-400/80 blur-[2px]"
          />
        )}

        {/* Table Shadow beneath Bowl */}
        <div
          aria-hidden
          className="absolute inset-x-7 bottom-2 h-8 rounded-full bg-black/60 blur-xl"
        />

        {/* MAIN ANIMATED CERAMIC BOWL WITH GENTLE LEVITATION */}
        <motion.div
          animate={{
            scale: bowlScale,
            y: [0, -4, 0],
          }}
          transition={{
            scale: { type: "spring", stiffness: 220, damping: 20 },
            y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{ scale: bowlScale * 1.025 }}
          className="relative h-[246px] w-[246px] rounded-full bg-gradient-to-br from-[#2C2526] via-[#171213] to-[#0B0809] p-3 shadow-[0_24px_48px_rgba(0,0,0,0.68)] ring-2 ring-white/15 sm:h-[268px] sm:w-[268px]"
        >
          <div className="relative h-full w-full overflow-hidden rounded-full bg-[#1C1516] ring-2 ring-amber-200/25">
            {/* Real Photorealistic Noodle Dish Base */}
            <AnimatePresence mode="wait">
              <motion.div
                key={base.id}
                initial={{ opacity: 0, scale: 0.86, rotate: -18 }}
                animate={{ opacity: 1, scale: 1.08, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 16 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="relative h-full w-full"
              >
                <img
                  src={base.image}
                  alt={base.name}
                  style={{ filter: imageFilter }}
                  className="h-full w-full object-cover object-center"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_28px_rgba(0,0,0,0.65)]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Spicy Chili-Oil Glaze Tint Overlay */}
            {config.spicyLevel > 0 && (
              <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 + heatIntensity * 0.26 }}
                className="pointer-events-none absolute inset-0 rounded-full mix-blend-multiply"
                style={{
                  background:
                    "radial-gradient(circle, rgba(220,38,38,0.18) 25%, rgba(185,28,28,0.88) 100%)",
                }}
              />
            )}

            {/* REAL PHOTOGRAPHIC TOPPING LAYERS DROPPING ONTO THE BOWL! */}
            <AnimatePresence>
              {mounted &&
                selectedToppings.map((topping) => {
                  const slot = TOPPING_SLOTS[topping.id] ?? {
                    posClass: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    sizeClass: "h-16 w-16",
                    rotate: 0,
                    zIndex: "z-20",
                    floatDelay: 0,
                  };

                  return (
                    <motion.div
                      key={topping.id}
                      initial={{
                        y: -75,
                        opacity: 0,
                        scale: 1.45,
                        rotate: slot.rotate - 18,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotate: slot.rotate,
                      }}
                      exit={{
                        y: -35,
                        opacity: 0,
                        scale: 0.55,
                        rotate: slot.rotate + 14,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 310,
                        damping: 19,
                      }}
                      className={`group/top absolute ${slot.posClass} ${slot.sizeClass} ${slot.zIndex}`}
                    >
                      {/* Landing Impact Sparkle Ring */}
                      <motion.span
                        initial={{ scale: 0.7, opacity: 0.9 }}
                        animate={{ scale: 1.55, opacity: 0 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="pointer-events-none absolute inset-0 rounded-full border-2 border-amber-300"
                      />

                      {/* Real High-Res Topping Photograph Plated with 3D Depth Shadow */}
                      <motion.div
                        animate={{ y: [0, -2.5, 0] }}
                        transition={{
                          duration: 3.2,
                          delay: slot.floatDelay,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        whileHover={{ scale: 1.16, zIndex: 50 }}
                        className="relative h-full w-full cursor-pointer overflow-hidden rounded-full border-[2.5px] border-white/90 bg-[#1E1415] shadow-[0_8px_18px_rgba(0,0,0,0.65)]"
                        title={topping.name}
                      >
                        <img
                          src={topping.image}
                          alt={topping.name}
                          className="h-full w-full object-cover transition duration-300 group-hover/top:scale-110"
                        />
                        {/* Subtle glossy studio specular highlight */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-black/25 via-transparent to-white/25"
                        />
                        {/* Micro name label on hover */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-1 py-0.5 text-center opacity-0 transition group-hover/top:opacity-100">
                          <span className="block truncate text-[8px] font-extrabold text-white">
                            {topping.shortName}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Floating Clean White Pills around bowl */}
        <motion.div
          key={`doneness-${config.doneness}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-3 left-0 z-40 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#1E1415] shadow-lg"
        >
          <Timer className="h-3.5 w-3.5 text-[#C4252D]" />
          {config.doneness}
        </motion.div>

        <motion.div
          key={`spicy-${config.spicyLevel}`}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`absolute top-4 right-0 z-40 flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-extrabold shadow-lg ${
            config.spicyLevel >= 4
              ? "bg-[#C4252D] text-white"
              : "bg-white text-[#C4252D]"
          }`}
        >
          <Flame className="h-3.5 w-3.5 fill-current" />
          Level {config.spicyLevel}
        </motion.div>
      </div>

      {/* Real Photo Active Toppings Tray */}
      <div className="relative z-10 mt-2 flex flex-wrap items-center justify-center gap-1.5">
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold text-rose-100">
          {base.style}
        </span>
        <AnimatePresence mode="popLayout">
          {mounted && selectedToppings.length > 0 ? (
            selectedToppings.map((t) => (
              <motion.span
                key={t.id}
                layout
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white py-0.5 pr-2.5 pl-1 text-[10px] font-bold text-[#1E1415] shadow-sm"
              >
                <img
                  src={t.image}
                  alt={t.shortName}
                  className="h-4 w-4 rounded-full object-cover"
                />
                {t.shortName}
              </motion.span>
            ))
          ) : (
            <span className="text-[11px] text-rose-200/80">
              Pilih topping di kiri untuk melihat foto topping mendarat live!
            </span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
