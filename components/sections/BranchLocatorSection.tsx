"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Check,
  Clock,
  ExternalLink,
  LayoutGrid,
  MapPin,
  Plug,
  Sparkles,
  Star,
  Table2,
  Tv,
  Wifi,
  Wind,
  X,
} from "lucide-react";
import { BRANCHES } from "@/data/warmindoData";
import { BranchFacility } from "@/types/warmindo";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CITIES = [
  "Semua Kota",
  "Purwokerto",
  "Yogyakarta",
  "Bandung",
  "Semarang",
  "Jakarta",
] as const;

const FACILITY_META: {
  key: keyof BranchFacility;
  label: string;
  shortLabel: string;
  icon: typeof Wifi;
}[] = [
  { key: "wifi100Mbps", label: "WiFi 100Mbps", shortLabel: "WiFi 100M", icon: Wifi },
  { key: "powerOutlets", label: "Colokan Tiap Meja", shortLabel: "Colokan", icon: Plug },
  { key: "nobarProjector", label: "Layar Proyektor Nobar", shortLabel: "Nobar 4K", icon: Tv },
  { key: "mushola", label: "Mushola Nyaman", shortLabel: "Mushola", icon: Sparkles },
  { key: "wideParking", label: "Parkir Luas", shortLabel: "Parkir Luas", icon: Car },
  { key: "indoorAC", label: "Indoor AC", shortLabel: "Indoor AC", icon: Wind },
  { key: "open24Hours", label: "Buka 24 Jam", shortLabel: "24 Jam", icon: Clock },
];

export function BranchLocatorSection() {
  const [selectedCity, setSelectedCity] =
    useState<(typeof CITIES)[number]>("Semua Kota");
  const [requiredFacility, setRequiredFacility] = useState<
    keyof BranchFacility | null
  >(null);
  const [viewMode, setViewMode] = useState<"cards" | "matrix">("cards");

  const filteredBranches = useMemo(() => {
    return BRANCHES.filter((b) => {
      if (selectedCity !== "Semua Kota" && b.city !== selectedCity) {
        return false;
      }
      if (requiredFacility && !b.facilities[requiredFacility]) {
        return false;
      }
      return true;
    });
  }, [selectedCity, requiredFacility]);

  return (
    <section id="cabang" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Jaringan Outlet & Fasilitas"
            highlight="Lokasi"
            title="Cabang & Fasilitas"
            highlightFirst
            description="Temukan Warmindo Nusantara terdekat di kotamu lengkap dengan filter fasilitas dan tombol navigasi Google Maps."
            icon={<MapPin className="h-4 w-4" />}
          />

          <div className="inline-flex self-start rounded-full bg-[#FDF1F2] p-1 lg:self-end">
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${
                viewMode === "cards"
                  ? "bg-[#C4252D] text-white shadow-sm"
                  : "text-[#665A5B] hover:text-[#C4252D]"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Kartu Cabang
            </button>
            <button
              type="button"
              onClick={() => setViewMode("matrix")}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${
                viewMode === "matrix"
                  ? "bg-[#C4252D] text-white shadow-sm"
                  : "text-[#665A5B] hover:text-[#C4252D]"
              }`}
            >
              <Table2 className="h-3.5 w-3.5" />
              Matriks Fasilitas
            </button>
          </div>
        </div>

        {/* Clean City & Facility Filter Row */}
        <div className="mt-7 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => {
              const active = selectedCity === city;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    active
                      ? "bg-[#C4252D] text-white shadow-sm"
                      : "bg-[#FDF1F2] text-[#665A5B] hover:text-[#C4252D]"
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {FACILITY_META.slice(0, 5).map((f) => {
              const active = requiredFacility === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setRequiredFacility(active ? null : f.key)}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition ${
                    active
                      ? "bg-[#C4252D] text-white"
                      : "bg-[#FDF1F2] text-[#665A5B] hover:text-[#C4252D]"
                  }`}
                >
                  {f.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {viewMode === "cards" ? (
          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredBranches.map((branch, idx) => (
              <motion.article
                key={branch.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-2xl bg-[#FDF1F2] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5A1115]/10"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1415]/60 via-transparent to-black/15" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="rounded-md bg-[#C4252D] px-2.5 py-1 text-[10px] font-extrabold text-white">
                      {branch.city}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      24 Jam
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 font-mono text-[11px] font-bold text-[#1E1415]">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {branch.rating.toFixed(1)}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[11px] font-bold text-[#C4252D]">
                    {branch.highlight}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold text-[#1E1415]">
                    {branch.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#665A5B]">
                    {branch.address}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {FACILITY_META.map((fac) => {
                      const available = branch.facilities[fac.key];
                      const Icon = fac.icon;
                      return (
                        <span
                          key={fac.key}
                          className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold ${
                            available
                              ? "bg-white text-[#1E1415]"
                              : "bg-white/50 text-zinc-400 line-through"
                          }`}
                        >
                          <Icon
                            className={`h-3 w-3 ${
                              available ? "text-[#C4252D]" : "text-zinc-400"
                            }`}
                          />
                          {fac.shortLabel}
                        </span>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex items-center gap-2 pt-3">
                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#C4252D] px-3.5 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#A81D24]"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      Google Maps
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href="#reservasi"
                      className="inline-flex items-center justify-center rounded-lg bg-white px-3.5 py-2.5 text-xs font-bold text-[#C4252D] transition hover:bg-[#5A1115] hover:text-white"
                    >
                      Booking
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mt-7 overflow-x-auto rounded-2xl bg-white shadow-[0_12px_36px_rgba(90,17,21,0.06)] ring-1 ring-rose-100">
            <table className="w-full min-w-[760px] text-left text-xs">
              <thead>
                <tr className="bg-[#FDF1F2] text-[#1E1415]">
                  <th className="px-5 py-4 font-bold uppercase">
                    Cabang & Kota
                  </th>
                  {FACILITY_META.map((fac) => (
                    <th
                      key={fac.key}
                      className="px-3 py-4 text-center font-bold uppercase"
                    >
                      {fac.shortLabel}
                    </th>
                  ))}
                  <th className="px-4 py-4 text-right font-bold uppercase">
                    Navigasi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FDF1F2]">
                {filteredBranches.map((branch) => (
                  <tr key={branch.id} className="transition hover:bg-[#FDF1F2]/50">
                    <td className="px-5 py-4">
                      <span className="inline-block rounded bg-[#FDF1F2] px-2 py-0.5 text-[10px] font-bold text-[#C4252D]">
                        {branch.city}
                      </span>
                      <p className="mt-1 font-display text-sm font-bold text-[#1E1415]">
                        {branch.name}
                      </p>
                      <p className="text-[11px] text-[#665A5B]">
                        {branch.indoorSeatsTotal + branch.outdoorSeatsTotal}{" "}
                        kursi • {branch.rating}★
                      </p>
                    </td>
                    {FACILITY_META.map((fac) => {
                      const available = branch.facilities[fac.key];
                      return (
                        <td key={fac.key} className="px-3 py-4 text-center">
                          {available ? (
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                              <Check className="h-4 w-4" strokeWidth={2.5} />
                            </span>
                          ) : (
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
                              <X className="h-4 w-4" />
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-4 py-4 text-right">
                      <a
                        href={branch.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-[#C4252D] px-3 py-2 font-bold text-white transition hover:bg-[#A81D24]"
                      >
                        Maps
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
