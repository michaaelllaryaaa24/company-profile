"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgePercent,
  Building2,
  Calculator,
  CheckCircle2,
  Coins,
  Send,
  TrendingUp,
} from "lucide-react";
import {
  BRAND_CONFIG,
  formatRupiah,
  FRANCHISE_PACKAGES,
} from "@/data/warmindoData";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FranchiseROISection() {
  const [selectedPkgId, setSelectedPkgId] = useState(FRANCHISE_PACKAGES[1].id);

  const selectedPkg = useMemo(
    () =>
      FRANCHISE_PACKAGES.find((p) => p.id === selectedPkgId) ??
      FRANCHISE_PACKAGES[1],
    [selectedPkgId]
  );

  const [dailyPortions, setDailyPortions] = useState(
    FRANCHISE_PACKAGES[1].recommendedDailyPortions
  );
  const [avgTicket, setAvgTicket] = useState(
    FRANCHISE_PACKAGES[1].recommendedAvgTicket
  );
  const [monthlyFixedCost, setMonthlyFixedCost] = useState(
    FRANCHISE_PACKAGES[1].monthlyOperationalFixed
  );

  const handleSelectPackage = (pkgId: string) => {
    const pkg = FRANCHISE_PACKAGES.find((p) => p.id === pkgId);
    if (!pkg) return;
    setSelectedPkgId(pkg.id);
    setDailyPortions(pkg.recommendedDailyPortions);
    setAvgTicket(pkg.recommendedAvgTicket);
    setMonthlyFixedCost(pkg.monthlyOperationalFixed);
  };

  const simulation = useMemo(() => {
    const monthlyRevenue = dailyPortions * avgTicket * 30;
    const grossProfit = Math.round(
      monthlyRevenue * (selectedPkg.grossMarginPercent / 100)
    );
    const royaltyFee = Math.round(monthlyRevenue * 0.03);
    const netProfit = grossProfit - monthlyFixedCost - royaltyFee;
    const annualNetProfit = netProfit * 12;
    const bepMonths =
      netProfit > 0 ? selectedPkg.investment / netProfit : Infinity;
    const annualRoiPct =
      selectedPkg.investment > 0
        ? Math.round((annualNetProfit / selectedPkg.investment) * 100)
        : 0;

    const timeline = Array.from({ length: 12 }).map((_, i) => {
      const month = i + 1;
      const cumulative = netProfit * month;
      const pctOfInvestment = Math.min(
        130,
        Math.max(0, Math.round((cumulative / selectedPkg.investment) * 100))
      );
      return {
        month,
        cumulative,
        pctOfInvestment,
        isProfitable: cumulative >= selectedPkg.investment,
      };
    });

    return {
      monthlyRevenue,
      grossProfit,
      royaltyFee,
      netProfit,
      annualNetProfit,
      bepMonths,
      annualRoiPct,
      timeline,
    };
  }, [dailyPortions, avgTicket, monthlyFixedCost, selectedPkg]);

  const handleConsultWhatsApp = () => {
    const bepText = Number.isFinite(simulation.bepMonths)
      ? `${simulation.bepMonths.toFixed(1)} bulan`
      : "Perlu penyesuaian target";
    const msg = [
      `🤝 *KONSULTASI KEMITRAAN WARMINDO NUSANTARA*`,
      `Halo Tim Kemitraan, saya tertarik dengan *${selectedPkg.name}* (${formatRupiah(
        selectedPkg.investment
      )}).`,
      ``,
      `📊 *Hasil Simulasi ROI Saya:*`,
      `• Target Penjualan : ${dailyPortions} porsi/hari`,
      `• Rata-rata Struk  : ${formatRupiah(avgTicket)}`,
      `• Estimasi Omzet   : ${formatRupiah(simulation.monthlyRevenue)}/bln`,
      `• Estimasi Profit  : ${formatRupiah(simulation.netProfit)}/bln`,
      `• Proyeksi BEP     : ${bepText}`,
      ``,
      `Mohon dikirimkan proposal lengkap & jadwal survei lokasi. Terima kasih!`,
    ].join("\n");

    window.open(
      `https://wa.me/${BRAND_CONFIG.whatsappFranchiseNumber}?text=${encodeURIComponent(
        msg
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="kemitraan" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Peluang Bisnis & Kemitraan"
          highlight="Franchise"
          title="& Kalkulator ROI"
          highlightFirst
          description="Pilih paket kemitraan Warmindo Nusantara lalu geser slider di bawah untuk menghitung proyeksi omzet, profit bersih, dan waktu balik modal secara transparan."
          icon={<TrendingUp className="h-4 w-4" />}
        />

        {/* 3 Package Cards — Exact Khadyo Best Products Styling: Soft Blush + Solid Crimson Active Card! */}
        <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {FRANCHISE_PACKAGES.map((pkg) => {
            const active = pkg.id === selectedPkgId;
            return (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -4 }}
                className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 ${
                  active
                    ? "bg-[#C4252D] text-white shadow-xl shadow-[#C4252D]/25"
                    : "bg-[#FDF1F2] text-[#1E1415] hover:shadow-lg hover:shadow-[#5A1115]/10"
                }`}
              >
                {pkg.featured && (
                  <span
                    className={`absolute -top-3 right-5 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-wider uppercase shadow ${
                      active
                        ? "bg-[#5A1115] text-amber-300"
                        : "bg-[#C4252D] text-white"
                    }`}
                  >
                    Paling Diminati
                  </span>
                )}

                <h3 className="font-display text-xl font-bold">{pkg.name}</h3>
                <p
                  className={`mt-1 text-xs leading-relaxed ${
                    active ? "text-rose-100" : "text-[#665A5B]"
                  }`}
                >
                  {pkg.tagline}
                </p>

                <div
                  className={`mt-5 rounded-xl p-4 ${
                    active ? "bg-white/12" : "bg-white"
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold uppercase ${
                      active ? "text-rose-100" : "text-[#665A5B]"
                    }`}
                  >
                    Nilai Investasi Paket
                  </span>
                  <p
                    className={`mt-1 font-mono text-2xl font-extrabold sm:text-3xl ${
                      active ? "text-white" : "text-[#C4252D]"
                    }`}
                  >
                    {formatRupiah(pkg.investment)}
                  </p>
                  <div
                    className={`mt-2 flex flex-wrap items-center justify-between gap-2 text-xs ${
                      active ? "text-rose-100" : "text-[#665A5B]"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" />
                      {pkg.spaceRequirement}
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        active ? "text-amber-300" : "text-emerald-700"
                      }`}
                    >
                      BEP {pkg.roiTargetMonths}
                    </span>
                  </div>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5 text-xs">
                  {pkg.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          active ? "text-amber-300" : "text-[#C4252D]"
                        }`}
                      />
                      <span className={active ? "text-white" : "text-[#3B2E2F]"}>
                        {inc}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`mt-6 w-full rounded-xl px-4 py-3 text-xs font-extrabold transition ${
                    active
                      ? "bg-white text-[#C4252D] hover:bg-rose-50"
                      : "bg-[#C4252D] text-white hover:bg-[#A81D24]"
                  }`}
                >
                  {active
                    ? "✓ Aktif di Kalkulator ROI"
                    : "Simulasikan Paket Ini"}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* FLOATING WHITE ROI SIMULATOR CARD */}
        <div className="mt-10 rounded-3xl bg-white p-6 shadow-[0_16px_45px_rgba(90,17,21,0.08)] ring-1 ring-rose-100 sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-[#FDF1F2] pb-6 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FDF1F2] text-[#C4252D]">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#C4252D]">
                  Kalkulator Balik Modal Real-Time
                </p>
                <h3 className="font-display text-xl font-bold text-[#1E1415]">
                  Simulasi — {selectedPkg.name}
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDF1F2] px-4 py-2 text-xs font-bold text-[#1E1415]">
              <BadgePercent className="h-4 w-4 text-[#C4252D]" />
              Margin {selectedPkg.grossMarginPercent}% • Royalty 3%
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Sliders */}
            <div className="space-y-4 lg:col-span-5">
              <div className="rounded-2xl bg-[#FDF1F2] p-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="roi-portions"
                    className="text-xs font-bold text-[#1E1415]"
                  >
                    Estimasi Porsi / Hari
                  </label>
                  <span className="rounded-lg bg-white px-2.5 py-1 font-mono text-xs font-extrabold text-[#C4252D] shadow-xs">
                    {dailyPortions} porsi
                  </span>
                </div>
                <input
                  id="roi-portions"
                  type="range"
                  min={40}
                  max={400}
                  step={5}
                  value={dailyPortions}
                  onChange={(e) => setDailyPortions(Number(e.target.value))}
                  className="warmindo-slider mt-3 w-full"
                />
                <div className="mt-1.5 flex justify-between font-mono text-[10px] text-[#665A5B]">
                  <span>40</span>
                  <span>165 (Rata-rata)</span>
                  <span>400</span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#FDF1F2] p-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="roi-ticket"
                    className="text-xs font-bold text-[#1E1415]"
                  >
                    Harga Rata-Rata Struk
                  </label>
                  <span className="rounded-lg bg-white px-2.5 py-1 font-mono text-xs font-extrabold text-[#C4252D] shadow-xs">
                    {formatRupiah(avgTicket)}
                  </span>
                </div>
                <input
                  id="roi-ticket"
                  type="range"
                  min={18000}
                  max={45000}
                  step={1000}
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="warmindo-slider mt-3 w-full"
                />
                <div className="mt-1.5 flex justify-between font-mono text-[10px] text-[#665A5B]">
                  <span>Rp18rb</span>
                  <span>Rp28rb</span>
                  <span>Rp45rb</span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#FDF1F2] p-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="roi-opex"
                    className="text-xs font-bold text-[#1E1415]"
                  >
                    Biaya Operasional / Bulan
                  </label>
                  <span className="rounded-lg bg-white px-2.5 py-1 font-mono text-xs font-bold text-[#1E1415] shadow-xs">
                    {formatRupiah(monthlyFixedCost)}
                  </span>
                </div>
                <input
                  id="roi-opex"
                  type="range"
                  min={8000000}
                  max={90000000}
                  step={1000000}
                  value={monthlyFixedCost}
                  onChange={(e) => setMonthlyFixedCost(Number(e.target.value))}
                  className="warmindo-slider mt-3 w-full"
                />
                <p className="mt-1.5 text-[11px] text-[#665A5B]">
                  Estimasi sewa, gaji kru 3 shift, listrik, air & WiFi.
                </p>
              </div>
            </div>

            {/* KPI Results & Chart */}
            <div className="flex flex-col justify-between space-y-5 lg:col-span-7">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#FDF1F2] p-4">
                  <span className="text-xs font-semibold text-[#665A5B]">
                    Proyeksi Omzet Bulanan
                  </span>
                  <p className="mt-1 font-mono text-2xl font-extrabold text-[#1E1415]">
                    {formatRupiah(simulation.monthlyRevenue)}
                  </p>
                  <span className="mt-0.5 block text-[11px] text-[#665A5B]">
                    {(dailyPortions * 30).toLocaleString("id-ID")} porsi / 30
                    hari
                  </span>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <Coins className="h-3.5 w-3.5" />
                    Profit Bersih / Bulan
                  </span>
                  <p
                    className={`mt-1 font-mono text-2xl font-extrabold ${
                      simulation.netProfit > 0
                        ? "text-emerald-700"
                        : "text-[#C4252D]"
                    }`}
                  >
                    {formatRupiah(simulation.netProfit)}
                  </p>
                  <span className="mt-0.5 block text-[11px] text-emerald-700/80">
                    Bersih setelah HPP, opex & royalty
                  </span>
                </div>

                <div className="rounded-2xl bg-[#C4252D] p-4 text-white shadow-md shadow-[#C4252D]/20">
                  <span className="text-xs font-semibold text-rose-100">
                    Estimasi Balik Modal (BEP)
                  </span>
                  <p className="mt-1 font-mono text-2xl font-extrabold text-white">
                    {Number.isFinite(simulation.bepMonths)
                      ? `${simulation.bepMonths.toFixed(1)} Bulan`
                      : "Belum Profit"}
                  </p>
                  <span className="mt-0.5 block text-[11px] text-rose-100">
                    {!Number.isFinite(simulation.bepMonths)
                      ? "Sesuaikan volume porsi / biaya tetap"
                      : simulation.bepMonths <= 10
                        ? "🔥 Sangat Cepat & Menjanjikan!"
                        : "✓ Sehat & Ideal untuk F&B"}
                  </span>
                </div>

                <div className="rounded-2xl bg-[#FDF1F2] p-4">
                  <span className="text-xs font-semibold text-[#665A5B]">
                    Proyeksi ROI Tahunan
                  </span>
                  <p className="mt-1 font-mono text-2xl font-extrabold text-[#C4252D]">
                    {simulation.netProfit > 0
                      ? `${simulation.annualRoiPct}% / thn`
                      : "0%"}
                  </p>
                  <span className="mt-0.5 block text-[11px] text-[#665A5B]">
                    Profit 12 bln:{" "}
                    {formatRupiah(Math.max(0, simulation.annualNetProfit))}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#FDF1F2] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-[#1E1415]">
                      Akumulasi Profit 12 Bulan vs Investasi
                    </p>
                    <p className="text-[11px] text-[#665A5B]">
                      Batang hijau menandakan bulan sudah melewati BEP
                    </p>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#C4252D]">
                    Modal: {formatRupiah(selectedPkg.investment)}
                  </span>
                </div>

                <div className="mt-4 grid h-32 grid-cols-12 items-end gap-1.5 sm:gap-2">
                  {simulation.timeline.map((item) => {
                    const heightPct = Math.min(
                      100,
                      Math.max(6, Math.round((item.pctOfInvestment / 130) * 100))
                    );
                    return (
                      <div
                        key={item.month}
                        className="flex h-full flex-col items-center justify-end"
                        title={`Bulan ${item.month}: ${formatRupiah(
                          item.cumulative
                        )}`}
                      >
                        <motion.div
                          initial={false}
                          animate={{ height: `${heightPct}%` }}
                          transition={{
                            type: "spring",
                            stiffness: 180,
                            damping: 24,
                          }}
                          className={`w-full rounded-t-md ${
                            item.isProfitable ? "bg-emerald-500" : "bg-[#C4252D]"
                          }`}
                        />
                        <span className="mt-1.5 font-mono text-[10px] font-semibold text-[#665A5B]">
                          B{item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col items-center justify-between gap-3 rounded-2xl bg-[#5A1115] p-4 text-white sm:flex-row">
                <p className="text-xs leading-relaxed text-rose-100">
                  Dapatkan proposal PDF, RAB detail, dan jadwal tasting menu
                  gratis bersama tim bisnis Warmindo Nusantara.
                </p>
                <button
                  type="button"
                  onClick={handleConsultWhatsApp}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-extrabold text-[#C4252D] transition hover:bg-rose-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  Konsultasi WA
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
