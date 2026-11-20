"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  MapPin,
  Printer,
  RefreshCw,
  Send,
  Sparkles,
  Ticket,
  Trash2,
  Tv,
  Users,
  Wind,
} from "lucide-react";
import {
  BRANCHES,
  formatRupiah,
  NOBAR_PACKAGES,
} from "@/data/warmindoData";
import { useWarmindoStore } from "@/store/useWarmindoStore";
import { ReservationTicket } from "@/types/warmindo";
import { SectionHeading } from "@/components/ui/SectionHeading";

function getTimeMultiplier(hour: number): number {
  if (hour >= 19 && hour <= 23) return 1.15;
  if (hour >= 12 && hour <= 14) return 1.0;
  if (hour >= 0 && hour <= 4) return 0.72;
  return 0.85;
}

function getOccupancyStatus(percent: number) {
  if (percent >= 82) {
    return {
      label: "Hampir Penuh",
      badgeClass: "bg-[#C4252D] text-white",
      barClass: "bg-[#C4252D]",
    };
  }
  if (percent >= 55) {
    return {
      label: "Ramai Lancar",
      badgeClass: "bg-amber-100 text-amber-800",
      barClass: "bg-amber-500",
    };
  }
  return {
    label: "Banyak Meja Kosong",
    badgeClass: "bg-emerald-100 text-emerald-800",
    barClass: "bg-emerald-500",
  };
}

function generateBookingCode(): string {
  const now = new Date();
  const y = String(now.getFullYear()).slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `WN-${y}${m}${d}-${suffix}`;
}

export function CrowdReservationSection() {
  const [mounted, setMounted] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(BRANCHES[0].id);
  const [sensorOffset, setSensorOffset] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string>("--:--");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("20:00");
  const [guests, setGuests] = useState(4);
  const [seatingArea, setSeatingArea] = useState<
    "Indoor AC" | "Outdoor Smoking" | "Area Nobar VIP"
  >("Indoor AC");
  const [nobarPackageId, setNobarPackageId] = useState(NOBAR_PACKAGES[0].id);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reservations = useWarmindoStore((s) => s.reservations);
  const activeTicketCode = useWarmindoStore((s) => s.activeTicketCode);
  const addReservation = useWarmindoStore((s) => s.addReservation);
  const setActiveTicketCode = useWarmindoStore((s) => s.setActiveTicketCode);
  const deleteReservation = useWarmindoStore((s) => s.deleteReservation);
  const pushToast = useWarmindoStore((s) => s.pushToast);

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setDate(`${yyyy}-${mm}-${dd}`);
    setLastSynced(
      today.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    );
  }, []);

  const selectedBranch = useMemo(
    () => BRANCHES.find((b) => b.id === selectedBranchId) ?? BRANCHES[0],
    [selectedBranchId]
  );

  const selectedNobarPackage = useMemo(
    () =>
      NOBAR_PACKAGES.find((p) => p.id === nobarPackageId) ?? NOBAR_PACKAGES[0],
    [nobarPackageId]
  );

  const crowdMetrics = useMemo(() => {
    const hour = mounted ? new Date().getHours() : 20;
    const mult = getTimeMultiplier(hour);

    const indoorPct = Math.min(
      96,
      Math.max(
        18,
        Math.round(selectedBranch.baseIndoorOccupancy * mult + sensorOffset)
      )
    );
    const outdoorPct = Math.min(
      95,
      Math.max(
        15,
        Math.round(
          selectedBranch.baseOutdoorOccupancy * mult - sensorOffset * 0.7
        )
      )
    );

    const indoorAvailable = Math.max(
      1,
      Math.round(selectedBranch.indoorSeatsTotal * (1 - indoorPct / 100))
    );
    const outdoorAvailable = Math.max(
      1,
      Math.round(selectedBranch.outdoorSeatsTotal * (1 - outdoorPct / 100))
    );

    return {
      indoorPct,
      outdoorPct,
      indoorAvailable,
      outdoorAvailable,
      indoorStatus: getOccupancyStatus(indoorPct),
      outdoorStatus: getOccupancyStatus(outdoorPct),
    };
  }, [selectedBranch, sensorOffset, mounted]);

  const handleRefreshSensor = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const nextDelta = Math.floor(Math.random() * 15) - 7;
      setSensorOffset(nextDelta);
      setLastSynced(
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setIsRefreshing(false);
    }, 450);
  };

  const estimatedPackageTotal = selectedNobarPackage.pricePerPerson * guests;

  const activeTicket: ReservationTicket | null = useMemo(() => {
    if (!mounted || reservations.length === 0) return null;
    return (
      reservations.find((r) => r.bookingCode === activeTicketCode) ??
      reservations[0]
    );
  }, [mounted, reservations, activeTicketCode]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!customerName.trim() || customerName.trim().length < 2) {
      newErrors.customerName = "Nama pemesan minimal 2 karakter.";
    }
    const cleanPhone = customerPhone.replace(/[^\d+]/g, "");
    if (cleanPhone.length < 9) {
      newErrors.customerPhone = "Masukkan nomor WhatsApp aktif yang valid.";
    }
    if (!date) newErrors.date = "Pilih tanggal kunjungan.";
    if (!time) newErrors.time = "Pilih jam kedatangan.";
    if (guests < 1 || guests > 40) {
      newErrors.guests = "Jumlah orang harus antara 1 hingga 40 orang.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const ticket: ReservationTicket = {
      bookingCode: generateBookingCode(),
      branchId: selectedBranch.id,
      branchName: selectedBranch.name,
      branchCity: selectedBranch.city,
      branchAddress: selectedBranch.address,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      date,
      time,
      guests,
      seatingArea,
      nobarPackageId: selectedNobarPackage.id,
      nobarPackageName: selectedNobarPackage.name,
      estimatedTotal:
        estimatedPackageTotal > 0 ? estimatedPackageTotal : undefined,
      notes: notes.trim() || undefined,
      createdAt: new Date().toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    addReservation(ticket);
    pushToast({
      title: "E-Ticket Reservasi Terbit!",
      description: `Kode Booking: ${ticket.bookingCode} (${selectedBranch.city})`,
      variant: "success",
    });

    setNotes("");
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      pushToast({
        title: "Kode Booking Disalin",
        description: `${code} siap dibagikan ke grup nongkrong.`,
        variant: "info",
      });
    } catch {
      pushToast({ title: "Gagal menyalin kode", variant: "warning" });
    }
  };

  const handleConfirmViaWhatsApp = (ticket: ReservationTicket) => {
    const branch =
      BRANCHES.find((b) => b.id === ticket.branchId) ?? BRANCHES[0];
    const msg = [
      `🎟️ *KONFIRMASI E-TICKET RESERVASI WARMINDO NUSANTARA*`,
      `Kode Booking : *${ticket.bookingCode}*`,
      `Cabang       : ${ticket.branchName}`,
      `Nama         : ${ticket.customerName}`,
      `Jadwal       : ${ticket.date} pukul ${ticket.time} WIB`,
      `Jumlah Tamu  : ${ticket.guests} Orang (${ticket.seatingArea})`,
      `Paket        : ${ticket.nobarPackageName ?? "Reguler"}`,
      ticket.estimatedTotal
        ? `Estimasi     : ${formatRupiah(ticket.estimatedTotal)}`
        : "",
      ticket.notes ? `Catatan      : ${ticket.notes}` : "",
      `Mohon dibantu simpan mejanya ya kak. Terima kasih!`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const barcodeBars = useMemo(() => {
    if (!activeTicket) return [];
    const seed = activeTicket.bookingCode;
    return Array.from({ length: 28 }).map((_, i) => {
      const code = seed.charCodeAt(i % seed.length);
      const width = ((code + i * 7) % 3) + 1;
      const height = 28 + ((code + i * 11) % 14);
      return { width, height };
    });
  }, [activeTicket]);

  return (
    <section id="reservasi" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Live Crowd Meter & Booking"
            highlight="Live Crowd"
            title="& Reservasi Meja"
            highlightFirst
            description="Pantau okupansi kursi Indoor AC & Outdoor sebelum datang, lalu booking meja untuk nongkrong atau nobar dan dapatkan E-Ticket Digital seketika."
            icon={<Users className="h-4 w-4" />}
          />
          <button
            type="button"
            onClick={handleRefreshSensor}
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-[#FDF1F2] px-4 py-2 text-xs font-bold text-[#C4252D] transition hover:bg-[#C4252D] hover:text-white sm:self-end"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Perbarui Sensor ({lastSynced})
          </button>
        </div>

        {/* Branch Quick Pills */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {BRANCHES.map((branch) => {
            const active = branch.id === selectedBranchId;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => setSelectedBranchId(branch.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${active
                    ? "bg-[#C4252D] text-white shadow-sm"
                    : "bg-[#FDF1F2] text-[#665A5B] hover:text-[#C4252D]"
                  }`}
              >
                {branch.city} •{" "}
                {branch.name
                  .replace("Warmindo Nusantara ", "")
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}
              </button>
            );
          })}
        </div>

        {/* 2 Clean Blush Crowd Meter Cards (Khadyo card aesthetic!) */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-[#FDF1F2] p-5 transition hover:shadow-md hover:shadow-[#5A1115]/5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#C4252D] shadow-xs">
                  <Wind className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#1E1415]">
                    Indoor AC (Bebas Asap)
                  </h3>
                  <p className="text-xs text-[#665A5B]">
                    Tersedia{" "}
                    <strong className="text-[#1E1415]">
                      {crowdMetrics.indoorAvailable} kursi
                    </strong>{" "}
                    dari {selectedBranch.indoorSeatsTotal} total
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${crowdMetrics.indoorStatus.badgeClass}`}
              >
                {crowdMetrics.indoorStatus.label}
              </span>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-[#665A5B]">
                  <MapPin className="h-3 w-3 text-[#C4252D]" />
                  {selectedBranch.city}
                </span>
                <span className="font-mono text-sm font-extrabold text-[#C4252D]">
                  {crowdMetrics.indoorPct}% Terisi
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white">
                <motion.div
                  initial={false}
                  animate={{ width: `${crowdMetrics.indoorPct}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className={`h-full rounded-full ${crowdMetrics.indoorStatus.barClass}`}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#FDF1F2] p-5 transition hover:shadow-md hover:shadow-[#5A1115]/5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#C4252D] shadow-xs">
                  <Tv className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#1E1415]">
                    Outdoor Smoking & Arena Nobar
                  </h3>
                  <p className="text-xs text-[#665A5B]">
                    Tersedia{" "}
                    <strong className="text-[#1E1415]">
                      {crowdMetrics.outdoorAvailable} kursi
                    </strong>{" "}
                    dari {selectedBranch.outdoorSeatsTotal} total
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${crowdMetrics.outdoorStatus.badgeClass}`}
              >
                {crowdMetrics.outdoorStatus.label}
              </span>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-[#665A5B]">
                  Layar Proyektor 4K & Area Merokok
                </span>
                <span className="font-mono text-sm font-extrabold text-[#C4252D]">
                  {crowdMetrics.outdoorPct}% Terisi
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white">
                <motion.div
                  initial={false}
                  animate={{ width: `${crowdMetrics.outdoorPct}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className={`h-full rounded-full ${crowdMetrics.outdoorStatus.barClass}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RESERVATION FORM + KHADYO-STYLE DIGITAL E-TICKET */}
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl bg-white p-6 shadow-[0_14px_40px_rgba(90,17,21,0.07)] ring-1 ring-rose-100 sm:p-7 lg:col-span-7"
            noValidate
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#1E1415]">
                  Booking Meja & Paket Nobar
                </h3>
                <p className="mt-0.5 text-xs text-[#665A5B]">
                  Tanpa biaya booking untuk meja reguler • E-Ticket instan
                </p>
              </div>
              <span className="hidden rounded-full bg-[#FDF1F2] px-3 py-1 text-xs font-bold text-[#C4252D] sm:inline-block">
                24 Jam
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-bold text-[#1E1415]">
                  Cabang Tujuan
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full rounded-xl bg-[#FDF1F2] px-3.5 py-2.5 text-sm text-[#1E1415] focus:bg-white focus:ring-1 focus:ring-[#C4252D] focus:outline-none"
                >
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.city} — {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#1E1415]">
                  Nama Lengkap <span className="text-[#C4252D]">*</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Bagas Pratama"
                  className="w-full rounded-xl bg-[#FDF1F2] px-3.5 py-2.5 text-sm text-[#1E1415] placeholder:text-[#665A5B]/60 focus:bg-white focus:ring-1 focus:ring-[#C4252D] focus:outline-none"
                />
                {errors.customerName && (
                  <p className="mt-1 text-xs font-medium text-[#C4252D]">
                    {errors.customerName}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#1E1415]">
                  Nomor WhatsApp <span className="text-[#C4252D]">*</span>
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full rounded-xl bg-[#FDF1F2] px-3.5 py-2.5 text-sm text-[#1E1415] placeholder:text-[#665A5B]/60 focus:bg-white focus:ring-1 focus:ring-[#C4252D] focus:outline-none"
                />
                {errors.customerPhone && (
                  <p className="mt-1 text-xs font-medium text-[#C4252D]">
                    {errors.customerPhone}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-[#1E1415]">
                  Tanggal Kunjungan <span className="text-[#C4252D]">*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl bg-[#FDF1F2] px-3.5 py-2.5 text-sm text-[#1E1415] focus:bg-white focus:ring-1 focus:ring-[#C4252D] focus:outline-none"
                />
                {errors.date && (
                  <p className="mt-1 text-xs font-medium text-[#C4252D]">
                    {errors.date}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#1E1415]">
                    Jam (WIB)
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl bg-[#FDF1F2] px-3.5 py-2.5 text-sm text-[#1E1415] focus:bg-white focus:ring-1 focus:ring-[#C4252D] focus:outline-none"
                  />
                  {errors.time && (
                    <p className="mt-1 text-xs font-medium text-[#C4252D]">
                      {errors.time}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#1E1415]">
                    Tamu (Org)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={guests}
                    onChange={(e) =>
                      setGuests(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="w-full rounded-xl bg-[#FDF1F2] px-3.5 py-2.5 font-mono text-sm text-[#1E1415] focus:bg-white focus:ring-1 focus:ring-[#C4252D] focus:outline-none"
                  />
                  {errors.guests && (
                    <p className="mt-1 text-xs font-medium text-[#C4252D]">
                      {errors.guests}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-[#1E1415]">
                Area Duduk
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(
                  ["Indoor AC", "Outdoor Smoking", "Area Nobar VIP"] as const
                ).map((area) => {
                  const active = seatingArea === area;
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setSeatingArea(area)}
                      className={`rounded-xl px-3 py-2.5 text-xs font-bold transition ${active
                          ? "bg-[#C4252D] text-white shadow-sm"
                          : "bg-[#FDF1F2] text-[#665A5B] hover:text-[#C4252D]"
                        }`}
                    >
                      {area}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-[#1E1415]">
                Paket Acara / Nobar (Opsional)
              </label>
              <div className="space-y-2.5">
                {NOBAR_PACKAGES.map((pkg) => {
                  const active = nobarPackageId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setNobarPackageId(pkg.id)}
                      className={`flex w-full items-start justify-between gap-3 rounded-2xl p-3.5 text-left transition ${active
                          ? "bg-[#C4252D] text-white shadow-md shadow-[#C4252D]/20"
                          : "bg-[#FDF1F2] text-[#1E1415] hover:bg-rose-100/70"
                        }`}
                    >
                      <div>
                        <p className="text-sm font-bold">{pkg.name}</p>
                        <p
                          className={`mt-0.5 text-xs ${active ? "text-rose-100" : "text-[#665A5B]"
                            }`}
                        >
                          {pkg.description}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 font-mono text-xs font-extrabold ${active ? "text-amber-300" : "text-[#C4252D]"
                          }`}
                      >
                        {pkg.pricePerPerson === 0
                          ? "GRATIS"
                          : `${formatRupiah(pkg.pricePerPerson)}/org`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan tambahan (misal: Nobar Timnas, minta dekat colokan...)"
              className="w-full rounded-xl bg-[#FDF1F2] px-3.5 py-2.5 text-sm text-[#1E1415] placeholder:text-[#665A5B]/60 focus:bg-white focus:ring-1 focus:ring-[#C4252D] focus:outline-none"
            />

            <div className="flex flex-col items-center justify-between gap-4 border-t border-[#FDF1F2] pt-4 sm:flex-row">
              <div>
                <p className="text-xs text-[#665A5B]">
                  Estimasi Paket ({guests} Orang)
                </p>
                <p className="font-mono text-lg font-extrabold text-[#C4252D]">
                  {estimatedPackageTotal === 0
                    ? "Rp 0 (Bayar di Tempat)"
                    : formatRupiah(estimatedPackageTotal)}
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C4252D] px-6 py-3.5 text-xs font-extrabold text-white shadow-md shadow-[#C4252D]/25 transition hover:bg-[#A81D24] active:scale-[0.98] sm:w-auto sm:text-sm"
              >
                <Ticket className="h-4 w-4" />
                Terbitkan E-Ticket
              </button>
            </div>
          </form>

          {/* DIGITAL E-TICKET */}
          <div className="lg:col-span-5">
            {activeTicket ? (
              <motion.div
                key={activeTicket.bookingCode}
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="space-y-4"
              >
                <div
                  id="printable-eticket"
                  className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_45px_rgba(90,17,21,0.12)] ring-1 ring-rose-100"
                >
                  {/* Signature Deep Maroon Ticket Header matching Hero & Top Strip */}
                  <div className="bg-[#5A1115] px-6 py-5 text-white">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 uppercase">
                          <CheckCircle2 className="h-3 w-3" />
                          E-Ticket Valid
                        </span>
                        <h4 className="mt-2 font-display text-lg font-extrabold">
                          WARMINDO NUSANTARA
                        </h4>
                        <p className="text-xs text-rose-200">
                          {activeTicket.branchName}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-rose-200 uppercase">
                          Kode Booking
                        </span>
                        <span className="font-mono text-base font-extrabold text-amber-300">
                          {activeTicket.bookingCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Crisp White & Blush Ticket Body */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl bg-[#FDF1F2] p-3">
                        <span className="text-[10px] font-bold text-[#665A5B] uppercase">
                          Atas Nama
                        </span>
                        <p className="mt-0.5 font-bold text-[#1E1415]">
                          {activeTicket.customerName}
                        </p>
                        <p className="font-mono text-[11px] text-[#665A5B]">
                          {activeTicket.customerPhone}
                        </p>
                      </div>
                      <div className="rounded-xl bg-[#FDF1F2] p-3">
                        <span className="text-[10px] font-bold text-[#665A5B] uppercase">
                          Tamu & Area
                        </span>
                        <p className="mt-0.5 font-bold text-[#C4252D]">
                          {activeTicket.guests} Orang
                        </p>
                        <p className="text-[11px] text-[#1E1415]">
                          {activeTicket.seatingArea}
                        </p>
                      </div>
                      <div className="rounded-xl bg-[#FDF1F2] p-3">
                        <span className="flex items-center gap-1 text-[10px] font-bold text-[#665A5B] uppercase">
                          <Calendar className="h-3 w-3 text-[#C4252D]" />
                          Tanggal
                        </span>
                        <p className="mt-0.5 font-mono font-bold text-[#1E1415]">
                          {activeTicket.date}
                        </p>
                      </div>
                      <div className="rounded-xl bg-[#FDF1F2] p-3">
                        <span className="flex items-center gap-1 text-[10px] font-bold text-[#665A5B] uppercase">
                          <Clock className="h-3 w-3 text-[#C4252D]" />
                          Jam Kedatangan
                        </span>
                        <p className="mt-0.5 font-mono font-bold text-[#1E1415]">
                          {activeTicket.time} WIB
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl bg-[#FDF1F2] p-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#665A5B]">Paket</span>
                        <span className="font-bold text-[#1E1415]">
                          {activeTicket.nobarPackageName}
                        </span>
                      </div>
                      {activeTicket.estimatedTotal && (
                        <div className="mt-1 flex items-center justify-between border-t border-white pt-1.5">
                          <span className="text-[#665A5B]">Estimasi</span>
                          <span className="font-mono font-extrabold text-[#C4252D]">
                            {formatRupiah(activeTicket.estimatedTotal)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 border-t border-dashed border-[#F5D6D9] pt-4 text-center">
                      <div className="mx-auto flex h-12 items-end justify-center gap-1 rounded-xl bg-[#FDF1F2] px-4 py-2">
                        {barcodeBars.map((bar, idx) => (
                          <span
                            key={idx}
                            style={{
                              width: `${bar.width * 2}px`,
                              height: `${bar.height}px`,
                            }}
                            className="inline-block bg-[#1E1415]"
                          />
                        ))}
                      </div>
                      <p className="mt-2 font-mono text-[11px] font-bold tracking-[0.22em] text-[#5A1115]">
                        {activeTicket.bookingCode}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 no-print">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C4252D] px-4 py-3 text-xs font-extrabold text-white shadow-sm transition hover:bg-[#A81D24]"
                  >
                    <Printer className="h-4 w-4" />
                    Simpan / Cetak
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirmViaWhatsApp(activeTicket)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FDF1F2] px-4 py-3 text-xs font-bold text-[#C4252D] transition hover:bg-[#C4252D] hover:text-white"
                  >
                    <Send className="h-4 w-4" />
                    Konfirmasi WA
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(activeTicket.bookingCode)}
                    className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#1E1415] ring-1 ring-rose-100 transition hover:text-[#C4252D]"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Salin Kode ({activeTicket.bookingCode})
                  </button>
                </div>

                {reservations.length > 1 && (
                  <div className="rounded-2xl bg-[#FDF1F2] p-4 no-print">
                    <p className="text-[11px] font-bold text-[#C4252D] uppercase">
                      Riwayat E-Ticket ({reservations.length})
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {reservations.map((r) => (
                        <div
                          key={r.bookingCode}
                          className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs ${r.bookingCode === activeTicket.bookingCode
                              ? "bg-[#C4252D] font-bold text-white"
                              : "bg-white text-[#665A5B]"
                            }`}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveTicketCode(r.bookingCode)}
                            className="flex-1 text-left"
                          >
                            <span className="font-mono font-bold">
                              {r.bookingCode}
                            </span>{" "}
                            • {r.branchCity} ({r.guests} org)
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteReservation(r.bookingCode)}
                            className="ml-2 p-1 opacity-75 hover:opacity-100"
                            aria-label="Hapus tiket"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-[#FDF1F2] px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#C4252D] shadow-md shadow-[#5A1115]/10">
                  <Ticket className="h-8 w-8" />
                </div>
                <h4 className="mt-5 font-display text-lg font-bold text-[#1E1415]">
                  E-Ticket Reservasi Digital
                </h4>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#665A5B]">
                  Isi form di sebelah kiri untuk langsung menerbitkan E-Ticket
                  dengan kode booking unik dan tombol cetak.
                </p>
                <span className="mt-5 inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold text-[#C4252D] shadow-xs">
                  <Sparkles className="h-3 w-3" />
                  Tersimpan otomatis di perangkat
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
