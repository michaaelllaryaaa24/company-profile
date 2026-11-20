"use client";

import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { BRAND_CONFIG } from "@/data/warmindoData";

export function Footer() {
  return (
    <footer className="bg-[#4E0E12] text-rose-100/80 no-print">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="rounded-lg bg-[#C4252D] px-3 py-1.5 font-display text-lg font-extrabold tracking-tight text-white">
                Warmindo
              </span>
              <span className="font-display text-base font-bold text-white">
                Nusantara
              </span>
            </div>
            <p className="text-sm leading-relaxed text-rose-100/75">
              Menghadirkan kembali kehangatan budaya warkop Indonesia dengan
              standar dapur terbuka, racikan Indomie presisi, kopi lokal
              Nusantara, dan ruang nongkrong modern 24 jam nonstop.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-300/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
              100% Halal Tersertifikasi LPPOM MUI
            </div>
          </div>

          {/* Navigasi Cepat */}
          <div>
            <h3 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Jelajahi
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#menu" className="transition hover:text-white">
                  Menu Andalan
                </a>
              </li>
              <li>
                <a href="#racik-studio" className="transition hover:text-white">
                  Studio Racik Indomie-mu
                </a>
              </li>
              <li>
                <a href="#reservasi" className="transition hover:text-white">
                  Live Crowd & Reservasi Nobar
                </a>
              </li>
              <li>
                <a href="#kemitraan" className="transition hover:text-white">
                  Franchise & Simulasi ROI
                </a>
              </li>
              <li>
                <a href="#cabang" className="transition hover:text-white">
                  Lokasi Cabang & Fasilitas
                </a>
              </li>
            </ul>
          </div>

          {/* Kota Operasional */}
          <div>
            <h3 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Jaringan Kota
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                "Purwokerto (Flagship Pusat)",
                "Yogyakarta (Jakal & Seturan)",
                "Bandung (Dipatiukur & Dago)",
                "Semarang (Tembalang Arena)",
                "Jakarta Selatan (Kemang)",
              ].map((city) => (
                <li key={city} className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-amber-300" />
                  <span>{city}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-display text-sm font-bold tracking-wider text-white uppercase">
              Hubungi Kami
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <div>
                  <p className="font-semibold text-white">
                    Buka 24 Jam Nonstop
                  </p>
                  <p className="text-xs text-rose-200/70">
                    Senin – Minggu & Hari Libur Nasional
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-300" />
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappOrderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  WhatsApp Hotline: +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-amber-300" />
                <a
                  href={`mailto:${BRAND_CONFIG.email}`}
                  className="transition hover:text-white"
                >
                  {BRAND_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="h-4 w-4 shrink-0 text-rose-300" />
                <span>
                  {BRAND_CONFIG.instagram} • {BRAND_CONFIG.tiktok}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-rose-200/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} PT Warmindo Nusantara Kreatif. Seluruh
            hak cipta dilindungi.
          </p>
          <p className="font-mono">
            Hangatnya Warkop Indonesia • Buka 24 Jam
          </p>
        </div>
      </div>
    </footer>
  );
}
