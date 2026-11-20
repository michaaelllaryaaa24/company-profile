"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Flame,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { MENU_ITEMS } from "@/data/warmindoData";
import { useWarmindoStore } from "@/store/useWarmindoStore";

export function HeroSection() {
  const addRegularItemToCart = useWarmindoStore((s) => s.addRegularItemToCart);

  // 3 mini preview items matching the 3 floating cards under CTA in the reference!
  const miniPreviewItems = [
    MENU_ITEMS[0], // Indomie Goreng Telur Asin
    MENU_ITEMS[4], // Indomie Kuah Kari Susu
    MENU_ITEMS[9], // Kue Pancong Lumer Matcha
  ];

  const serviceHighlights = [
    {
      icon: Clock,
      title: "Saji Cepat 24 Jam",
      description:
        "Kami memasak pesananmu hangat dalam 6 menit nonstop 3 shift.",
    },
    {
      icon: Store,
      title: "Takeaway / Pick Up",
      description:
        "Pesan dari HP via WhatsApp, tinggal ambil di kasir tanpa antre.",
    },
    {
      icon: UtensilsCrossed,
      title: "Dine-in & Nobar",
      description:
        "Indoor AC, WiFi 100Mbps, colokan tiap meja & layar proyektor 4K.",
    },
  ];

  return (
    <section id="beranda" className="bg-white pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TOP 3-COLUMN HERO — Exact Reference Composition */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* LEFT COLUMN: Welcome + Headline + CTA + 3 Mini Floating Food Cards */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-bold tracking-wide text-[#C4252D]">
              Selamat Datang di Warmindo Nusantara
            </p>

            <h1 className="mt-2 font-display text-4xl leading-[1.12] font-bold tracking-tight text-[#1E1415] sm:text-5xl">
              Nikmati Sajian
              <br />
              <span className="text-[#C4252D]">Lezat</span> Warkop Modern
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#665A5B]">
              Kami menyajikan racikan Indomie kuali besi hangat dalam{" "}
              <strong className="font-semibold text-[#1E1415]">6 menit</strong>{" "}
              dengan kematangan presisi, kopi susu Nusantara, dan tempat
              nongkrong nyaman buka 24 jam.
            </p>

            {/* Primary CTA + Round Quick Studio Icon Button */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-lg bg-[#C4252D] px-6 py-3 text-xs font-bold tracking-wide text-white shadow-md shadow-[#C4252D]/25 transition hover:bg-[#A81D24] active:scale-[0.98]"
              >
                Pesan Sekarang
              </a>
              <a
                href="#racik-studio"
                title="Buka Studio Racik Indomie-mu"
                className="group inline-flex h-10 items-center gap-2 rounded-full border border-[#F5D6D9] bg-[#FDF1F2] px-4 text-xs font-bold text-[#C4252D] transition hover:bg-[#C4252D] hover:text-white"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C4252D] text-white transition group-hover:bg-white group-hover:text-[#C4252D]">
                  <Sparkles className="h-3 w-3" />
                </span>
                Racik Sendiri
              </a>
            </div>

            {/* 3 Mini Floating Product Cards exactly under CTA like reference */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {miniPreviewItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="group relative rounded-xl border border-zinc-100 bg-white p-2.5 shadow-[0_8px_24px_rgba(90,17,21,0.07)] transition hover:border-[#F5D6D9]"
                >
                  <div className="mx-auto h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#FDF1F2]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-2 truncate text-[11px] font-bold text-[#1E1415]">
                    {item.name
                      .replace("Indomie Goreng ", "Mie ")
                      .replace("Indomie Kuah ", "Kuah ")
                      .replace("Kue ", "")}
                  </p>
                  <div className="mt-0.5 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-2.5 w-2.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => addRegularItemToCart(item)}
                    aria-label={`Tambah ${item.name}`}
                    className="absolute right-2 bottom-2 flex h-5 w-5 items-center justify-center rounded-md bg-[#C4252D] text-white shadow-sm transition hover:bg-[#A81D24]"
                  >
                    <Plus className="h-3 w-3" strokeWidth={3} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CENTER COLUMN: Signature Deep Maroon Rounded Frame + Bespoke Warmindo Dish with Gentle Float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="flex justify-center lg:col-span-4"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[330px]"
            >
              {/* Deep Maroon Rounded Card Backdrop */}
              <div className="relative overflow-hidden rounded-[28px] bg-[#5A1115] shadow-2xl shadow-[#5A1115]/25">
                <img
                  src="/images/hero-indomie.jpg"
                  alt="Indomie Goreng Spesial Telur Setengah Matang & Mozzarella Warmindo Nusantara"
                  className="aspect-[3/3.75] w-full object-cover transition duration-700 hover:scale-105"
                />
                {/* Subtle floating badge */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="absolute right-3.5 bottom-3.5 left-3.5 flex items-center justify-between rounded-xl bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-extrabold text-[#1E1415]">
                      Indomie Sultan Custom
                    </p>
                    <p className="flex items-center gap-1 text-[10px] font-semibold text-[#C4252D]">
                      <Flame className="h-3 w-3" />
                      Telur ½ Matang • Moza • Sosis
                    </p>
                  </div>
                  <a
                    href="#racik-studio"
                    className="ml-2 shrink-0 rounded-lg bg-[#C4252D] px-2.5 py-1.5 font-mono text-[11px] font-bold text-white transition hover:bg-[#A81D24]"
                  >
                    Racik
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: 3 Stacked Service Highlights with Stagger Entrance */}
          <div className="space-y-6 lg:col-span-3">
            {serviceHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.16 + idx * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FDF1F2] text-[#1E1415] ring-1 ring-[#F5D6D9]">
                    <Icon className="h-5 w-5 text-[#C4252D]" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#1E1415]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#665A5B]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ASYMMETRIC 3-PHOTO PROMO BANNER GRID — Exact match below Hero in reference */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left Large Promo Card (~60% -> 7 cols) */}
          <motion.a
            href="#menu"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="group relative h-64 overflow-hidden rounded-2xl bg-[#1E1415] sm:h-80 lg:col-span-7 lg:h-[340px]"
          >
            <img
              src="/images/promo-kuah-kopi.jpg"
              alt="Paket Nongkrong Warmindo Indomie Kuah Kari & Es Kopi Susu Gula Aren"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E1415]/85 via-[#1E1415]/35 to-transparent" />
            <div className="absolute top-6 left-6 max-w-xs sm:top-8 sm:left-8">
              <span className="inline-block rounded-md bg-[#C4252D] px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                Promo 24 Jam
              </span>
              <h2 className="mt-2.5 font-display text-2xl leading-tight font-bold text-white sm:text-3xl">
                Beli 2 Indomie
                <br />
                Gratis Es Teh Jumbo
              </h2>
              <p className="mt-2 text-xs text-rose-100/85">
                Berlaku Dine-in & Nobar di seluruh 18 cabang Warmindo Nusantara.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-white uppercase underline decoration-[#C4252D] decoration-2 underline-offset-4 transition group-hover:text-amber-300">
                Lihat Promo
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.a>

          {/* Right Stacked 2 Promo Cards (~40% -> 5 cols) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {/* Top Right: Pancong & Roti Bakar */}
            <motion.a
              href="#menu"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="group relative h-40 overflow-hidden rounded-2xl bg-[#1E1415] lg:h-[162px]"
            >
              <img
                src="/images/promo-pancong.jpg"
                alt="Kue Pancong Lumer & Roti Bakar Bandung Warmindo Nusantara"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1415]/85 via-[#1E1415]/25 to-transparent" />
              <div className="absolute right-5 bottom-4 left-5 flex items-end justify-between gap-2">
                <div>
                  <p className="font-display text-base font-bold text-white">
                    Pancong Lumer & Roti Bakar
                  </p>
                  <p className="text-[11px] text-rose-100/80">
                    Mulai Rp17.000 • Teman Ngopi Subuh
                  </p>
                </div>
                <span className="shrink-0 text-[11px] font-bold tracking-wider text-white uppercase underline underline-offset-4 group-hover:text-amber-300">
                  Lihat Detail
                </span>
              </div>
            </motion.a>

            {/* Bottom Right: Studio Racik Indomie */}
            <motion.a
              href="#racik-studio"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="group relative h-40 overflow-hidden rounded-2xl bg-[#5A1115] lg:h-[162px]"
            >
              <img
                src="https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=85"
                alt="Studio Racik Indomie-mu Custom Topping & Level Pedas"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#5A1115]/90 via-[#5A1115]/45 to-transparent" />
              <div className="absolute right-5 bottom-4 left-5 flex items-end justify-between gap-2">
                <div>
                  <span className="inline-flex items-center gap-1 rounded bg-white/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    <ShoppingBag className="h-3 w-3" />
                    Interactive Studio
                  </span>
                  <p className="mt-1 font-display text-base font-bold text-white">
                    Racik Indomie-mu Sendiri
                  </p>
                  <p className="text-[11px] text-rose-100/85">
                    Pilih Kematangan, Level 0–5 & 8 Topping
                  </p>
                </div>
                <span className="shrink-0 text-[11px] font-bold tracking-wider text-white uppercase underline underline-offset-4 group-hover:text-amber-300">
                  Coba Studio
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
