"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  Clock,
  Menu,
  Search,
  ShoppingCart,
  Ticket,
  X,
} from "lucide-react";
import { useWarmindoStore } from "@/store/useWarmindoStore";

const NAV_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#menu", label: "Menu" },
  { href: "#racik-studio", label: "Racik Mie" },
  { href: "#reservasi", label: "Reservasi" },
  { href: "#kemitraan", label: "Kemitraan" },
  { href: "#cabang", label: "Cabang" },
];

function getLiveStatusText(hour: number) {
  if (hour >= 5 && hour < 11) {
    return "Buka 24 Jam • Tersedia Banyak Meja Kosong (Shift Pagi)";
  }
  if (hour >= 11 && hour < 15) {
    return "Buka 24 Jam • Jam Makan Siang Aktif (~6 Menit Saji)";
  }
  if (hour >= 15 && hour < 19) {
    return "Buka 24 Jam • Sore Santai & Ngopi WFC (WiFi 100Mbps)";
  }
  if (hour >= 19 && hour <= 23) {
    return "Buka 24 Jam • Jam Rame Nongkrong & Nobar 4K";
  }
  return "Buka 24 Jam • Shift Dini Hari & Pejuang Deadline";
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [quickSearch, setQuickSearch] = useState("");
  const [now, setNow] = useState<Date | null>(null);

  const cart = useWarmindoStore((s) => s.cart);
  const reservations = useWarmindoStore((s) => s.reservations);
  const setCartOpen = useWarmindoStore((s) => s.setCartOpen);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const totalItems = mounted
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;
  const ticketCount = mounted ? reservations.length : 0;

  const formattedClock = now
    ? now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "24:00";

  const statusText = getLiveStatusText(now ? now.getHours() : 20);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const menuEl = document.getElementById("menu");
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: "smooth" });
    }
    if (quickSearch.trim()) {
      window.dispatchEvent(
        new CustomEvent("warmindo:search", { detail: quickSearch.trim() })
      );
    }
  };

  return (
    <div className="sticky top-0 z-40 w-full no-print">
      {/* Top Signature Deep Maroon Bar matching reference */}
      <div className="bg-[#4E0E12] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 truncate">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="truncate font-medium text-rose-100">
              {statusText}
            </span>
          </div>
          <div className="hidden items-center gap-3 font-mono text-[11px] text-rose-200 sm:flex">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-300" />
              {formattedClock} WIB
            </span>
            <span className="text-rose-400/50">|</span>
            <span>18 Cabang • 100% Halal</span>
          </div>
        </div>
      </div>

      {/* Clean White Header */}
      <header
        className={`w-full bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
          scrolled
            ? "border-b border-[#F5D6D9] shadow-sm shadow-[#5A1115]/5"
            : "border-b border-zinc-100"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand Wordmark Badge matching reference Khadyo style */}
          <a href="#beranda" className="group flex shrink-0 items-center gap-2">
            <span className="rounded-lg bg-[#C4252D] px-3 py-1.5 font-display text-lg font-extrabold tracking-tight text-white shadow-sm shadow-[#C4252D]/30 transition group-hover:bg-[#A81D24]">
              Warmindo
            </span>
            <span className="hidden font-display text-sm font-bold tracking-tight text-[#1E1415] sm:inline">
              Nusantara
            </span>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#3B2E2F] transition hover:bg-[#FDF1F2] hover:text-[#C4252D]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Search Pill + Cart Icon */}
          <div className="flex items-center gap-2.5">
            <form
              onSubmit={handleQuickSearchSubmit}
              className="relative hidden md:block"
            >
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Cari Indomie, kopi..."
                className="w-44 rounded-full bg-zinc-100 py-2 pr-4 pl-9 text-xs text-[#1E1415] placeholder:text-zinc-400 transition focus:w-56 focus:bg-[#FDF1F2] focus:ring-1 focus:ring-[#C4252D] focus:outline-none lg:w-52"
              />
            </form>

            {ticketCount > 0 && (
              <a
                href="#reservasi"
                className="hidden items-center gap-1.5 rounded-full border border-[#F5D6D9] bg-[#FDF1F2] px-3 py-1.5 text-xs font-bold text-[#C4252D] transition hover:bg-[#C4252D] hover:text-white sm:inline-flex"
              >
                <Ticket className="h-3.5 w-3.5" />
                {ticketCount} Tiket
              </a>
            )}

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FDF1F2] text-[#1E1415] transition hover:bg-[#C4252D] hover:text-white active:scale-95"
              aria-label="Buka Keranjang Belanja"
            >
              <ShoppingCart className="h-4.5 w-4.5" strokeWidth={2.2} />
              <motion.span
                key={totalItems}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C4252D] px-1 font-mono text-[10px] font-bold text-white ring-2 ring-white"
              >
                {totalItems}
              </motion.span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-[#1E1415] transition hover:border-[#C4252D] hover:text-[#C4252D] lg:hidden"
              aria-label="Toggle menu navigasi"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-[#F5D6D9] bg-white lg:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[#1E1415] transition hover:bg-[#FDF1F2] hover:text-[#C4252D]"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#C4252D]">→</span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Smooth Crimson Scroll Progress Bar */}
        <motion.div
          style={{ scaleX }}
          className="h-[2.5px] origin-left bg-gradient-to-r from-[#5A1115] via-[#C4252D] to-amber-400"
        />
      </header>
    </div>
  );
}
