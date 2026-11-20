"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bike,
  Check,
  Copy,
  Flame,
  Minus,
  Plus,
  ReceiptText,
  Send,
  ShoppingBag,
  Sparkles,
  Store,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { BRANCHES, BRAND_CONFIG, formatRupiah } from "@/data/warmindoData";
import { useWarmindoStore } from "@/store/useWarmindoStore";
import { OrderMethod } from "@/types/warmindo";

const ORDER_METHODS: {
  id: OrderMethod;
  label: string;
  subtitle: string;
  icon: typeof UtensilsCrossed;
}[] = [
  {
    id: "dine-in",
    label: "Dine-in",
    subtitle: "Antar ke meja",
    icon: UtensilsCrossed,
  },
  {
    id: "takeaway",
    label: "Takeaway",
    subtitle: "Ambil di kasir",
    icon: Store,
  },
  {
    id: "delivery",
    label: "Delivery",
    subtitle: "Kurir outlet",
    icon: Bike,
  },
];

const DELIVERY_FEE = 8000;

export function SmartCartDrawer() {
  const [mounted, setMounted] = useState(false);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isCartOpen = useWarmindoStore((s) => s.isCartOpen);
  const setCartOpen = useWarmindoStore((s) => s.setCartOpen);
  const cart = useWarmindoStore((s) => s.cart);
  const checkout = useWarmindoStore((s) => s.checkout);
  const updateCheckout = useWarmindoStore((s) => s.updateCheckout);
  const updateCartItemQuantity = useWarmindoStore(
    (s) => s.updateCartItemQuantity
  );
  const removeCartItem = useWarmindoStore((s) => s.removeCartItem);
  const clearCart = useWarmindoStore((s) => s.clearCart);
  const pushToast = useWarmindoStore((s) => s.pushToast);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isCartOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isCartOpen, setCartOpen]);

  const selectedBranch = useMemo(
    () => BRANCHES.find((b) => b.id === checkout.branchId) ?? BRANCHES[0],
    [checkout.branchId]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cart]
  );

  const totalCalories = useMemo(
    () => cart.reduce((sum, item) => sum + item.calories * item.quantity, 0),
    [cart]
  );

  const deliveryFee =
    checkout.method === "delivery" && cart.length > 0 ? DELIVERY_FEE : 0;
  const grandTotal = subtotal + deliveryFee;

  const receiptText = useMemo(() => {
    const now = new Date();
    const timestamp = now.toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const methodLabel =
      checkout.method === "dine-in"
        ? `Dine-in (Meja #${checkout.tableNumber.trim() || "Belum diisi"})`
        : checkout.method === "takeaway"
          ? "Takeaway (Ambil di Outlet)"
          : "Delivery Kurir Outlet";

    const lines: string[] = [
      `🔥 *PESANAN BARU - WARMINDO NUSANTARA* 🔥`,
      `================================`,
      `📍 Cabang : ${selectedBranch.name}`,
      `🕒 Waktu  : ${timestamp}`,
      `👤 Nama   : ${checkout.customerName.trim() || "Pelanggan Warmindo"}`,
      `🛎️ Metode : ${methodLabel}`,
    ];

    if (checkout.method === "delivery" && checkout.deliveryAddress.trim()) {
      lines.push(`🏠 Alamat : ${checkout.deliveryAddress.trim()}`);
    }

    lines.push(`--------------------------------`, `🍜 *DAFTAR PESANAN:*`);

    cart.forEach((item, index) => {
      lines.push(
        `${index + 1}. *${item.name}* x${item.quantity} — ${formatRupiah(
          item.unitPrice * item.quantity
        )}`
      );
      if (item.type === "custom" && item.customDetails) {
        const d = item.customDetails;
        lines.push(
          `   • Base: ${d.baseName}${d.doublePortion ? " (Porsi Jumbo 2x)" : ""}`
        );
        lines.push(
          `   • Kematangan: ${d.doneness} | Pedas: Level ${d.spicyLevel}`
        );
        if (d.toppings.length > 0) {
          lines.push(`   • Topping: ${d.toppings.join(", ")}`);
        }
        if (d.note) {
          lines.push(`   • Catatan racikan: ${d.note}`);
        }
      }
    });

    lines.push(`--------------------------------`);
    lines.push(`Subtotal      : ${formatRupiah(subtotal)}`);
    if (deliveryFee > 0) {
      lines.push(`Ongkir Kurir  : ${formatRupiah(deliveryFee)}`);
    }
    lines.push(`*TOTAL BAYAR  : ${formatRupiah(grandTotal)}*`);

    if (checkout.notes.trim()) {
      lines.push(`--------------------------------`);
      lines.push(`📝 Catatan: ${checkout.notes.trim()}`);
    }

    lines.push(
      `================================`,
      `Mohon diproses ya kak! Terima kasih 🙏`
    );

    return lines.join("\n");
  }, [cart, checkout, selectedBranch, subtotal, deliveryFee, grandTotal]);

  const validateCheckout = (): boolean => {
    if (cart.length === 0) {
      setFormError("Keranjang masih kosong. Pilih menu atau racik Indomie dulu.");
      return false;
    }
    if (checkout.method === "dine-in" && !checkout.tableNumber.trim()) {
      setFormError("Masukkan nomor meja Anda untuk pesanan Dine-in.");
      return false;
    }
    if (checkout.method === "delivery" && !checkout.deliveryAddress.trim()) {
      setFormError("Masukkan alamat pengantaran lengkap untuk pesanan Delivery.");
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleWhatsAppCheckout = () => {
    if (!validateCheckout()) return;

    const targetPhone =
      selectedBranch.whatsapp || BRAND_CONFIG.whatsappOrderNumber;
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(
      receiptText
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    pushToast({
      title: "Mengarahkan ke WhatsApp Outlet",
      description: `Struk pesanan siap dikirim ke ${selectedBranch.name}.`,
      variant: "success",
    });
  };

  const handleCopyReceipt = async () => {
    try {
      await navigator.clipboard.writeText(receiptText);
      setCopied(true);
      pushToast({
        title: "Struk Disalin!",
        description: "Format teks pesanan tersalin ke clipboard.",
        variant: "info",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      pushToast({
        title: "Gagal menyalin struk",
        variant: "warning",
      });
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end no-print">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-[#1E1415]/55 backdrop-blur-xs"
          />

          {/* White & Blush Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[#F5D6D9] bg-white shadow-2xl sm:max-w-lg"
            role="dialog"
            aria-label="Keranjang Belanja Warmindo Nusantara"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#F5D6D9] bg-[#FDF1F2] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C4252D] text-white shadow-sm">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-[#1E1415]">
                    Keranjang & Struk WA
                  </h2>
                  <p className="text-xs text-[#665A5B]">
                    {cart.reduce((a, i) => a + i.quantity, 0)} item • Estimasi{" "}
                    <span className="font-mono font-bold text-[#C4252D]">
                      {totalCalories.toLocaleString("id-ID")} kkal
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#665A5B] transition hover:bg-white hover:text-[#C4252D]"
                  >
                    Kosongkan
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="rounded-xl border border-[#F5D6D9] bg-white p-2 text-[#1E1415] transition hover:border-[#C4252D] hover:text-[#C4252D]"
                  aria-label="Tutup keranjang"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#F5D6D9] bg-[#FDF1F2]/70 px-6 py-14 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#C4252D] shadow-sm">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-[#1E1415]">
                    Keranjang Masih Kosong
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-[#665A5B]">
                    Yuk pilih menu andalan atau cobain bikin racikan Indomie
                    custom sesuai level pedasmu!
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                    <a
                      href="#racik-studio"
                      onClick={() => setCartOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#C4252D] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#A81D24]"
                    >
                      <Sparkles className="h-4 w-4" />
                      Racik Indomie
                    </a>
                    <a
                      href="#menu"
                      onClick={() => setCartOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#F5D6D9] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E1415] transition hover:border-[#C4252D]"
                    >
                      Lihat Menu
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  {/* Cart Item List */}
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <motion.div
                        key={item.cartItemId}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="rounded-2xl border border-[#F5D6D9] bg-[#FDF1F2]/75 p-3.5"
                      >
                        <div className="flex items-start gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 shrink-0 rounded-xl object-cover ring-2 ring-white shadow-sm"
                            />
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                {item.type === "custom" && (
                                  <span className="mb-1 inline-flex items-center gap-1 rounded-md bg-[#C4252D] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                                    <Sparkles className="h-3 w-3" />
                                    Custom Racikan
                                  </span>
                                )}
                                <h4 className="text-sm font-bold text-[#1E1415] leading-snug">
                                  {item.name}
                                </h4>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeCartItem(item.cartItemId)}
                                className="rounded-lg p-1 text-zinc-400 transition hover:bg-white hover:text-[#C4252D]"
                                aria-label={`Hapus ${item.name}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            {item.type === "custom" && item.customDetails && (
                              <div className="mt-2 space-y-1.5 text-xs text-[#665A5B]">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-[#1E1415]">
                                    {item.customDetails.doneness}
                                  </span>
                                  <span className="inline-flex items-center gap-1 rounded-md bg-[#C4252D]/10 px-2 py-0.5 text-[11px] font-bold text-[#C4252D]">
                                    <Flame className="h-3 w-3" />
                                    Lvl {item.customDetails.spicyLevel}
                                  </span>
                                  {item.customDetails.doublePortion && (
                                    <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                                      Jumbo 2x
                                    </span>
                                  )}
                                </div>
                                {item.customDetails.toppings.length > 0 && (
                                  <p className="text-[11px]">
                                    Topping:{" "}
                                    <span className="font-semibold text-[#1E1415]">
                                      {item.customDetails.toppings.join(", ")}
                                    </span>
                                  </p>
                                )}
                                {item.customDetails.note && (
                                  <p className="italic text-[11px] text-[#C4252D]">
                                    “{item.customDetails.note}”
                                  </p>
                                )}
                              </div>
                            )}

                            <div className="mt-3 flex items-center justify-between">
                              <span className="font-mono text-sm font-extrabold text-[#C4252D]">
                                {formatRupiah(item.unitPrice * item.quantity)}
                              </span>

                              <div className="inline-flex items-center gap-2 rounded-xl border border-[#F5D6D9] bg-white p-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCartItemQuantity(item.cartItemId, -1)
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-lg text-[#1E1415] transition hover:bg-[#FDF1F2] hover:text-[#C4252D]"
                                  aria-label="Kurangi jumlah"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-6 text-center font-mono text-xs font-bold text-[#1E1415]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCartItemQuantity(item.cartItemId, 1)
                                  }
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C4252D] text-white transition hover:bg-[#A81D24]"
                                  aria-label="Tambah jumlah"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Order Method Selector */}
                  <div className="space-y-3 rounded-2xl border border-[#F5D6D9] bg-[#FDF1F2]/60 p-4">
                    <p className="text-xs font-bold tracking-wider text-[#C4252D] uppercase">
                      Metode Pemesanan
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {ORDER_METHODS.map((m) => {
                        const Icon = m.icon;
                        const active = checkout.method === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              updateCheckout({ method: m.id });
                              setFormError(null);
                            }}
                            className={`flex flex-col items-center rounded-xl border p-2.5 text-center transition ${
                              active
                                ? "border-[#C4252D] bg-[#C4252D] text-white shadow-sm"
                                : "border-[#F5D6D9] bg-white text-[#665A5B] hover:border-[#C4252D] hover:text-[#C4252D]"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="mt-1.5 text-xs font-bold">
                              {m.label}
                            </span>
                            <span className="text-[10px] opacity-85">
                              {m.subtitle}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Branch & Customer Details */}
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-[#1E1415]">
                          Pilih Cabang Tujuan
                        </label>
                        <select
                          value={checkout.branchId}
                          onChange={(e) =>
                            updateCheckout({ branchId: e.target.value })
                          }
                          className="w-full rounded-xl border border-[#F5D6D9] bg-white px-3 py-2.5 text-sm text-[#1E1415] focus:border-[#C4252D] focus:outline-none"
                        >
                          {BRANCHES.map((branch) => (
                            <option key={branch.id} value={branch.id}>
                              {branch.city} —{" "}
                              {branch.name.replace("Warmindo Nusantara ", "")}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-[#1E1415]">
                            Nama Pemesan
                          </label>
                          <input
                            type="text"
                            value={checkout.customerName}
                            onChange={(e) =>
                              updateCheckout({ customerName: e.target.value })
                            }
                            placeholder="Contoh: Bima"
                            className="w-full rounded-xl border border-[#F5D6D9] bg-white px-3 py-2.5 text-sm text-[#1E1415] placeholder:text-zinc-400 focus:border-[#C4252D] focus:outline-none"
                          />
                        </div>

                        {checkout.method === "dine-in" && (
                          <div>
                            <label className="mb-1 block text-xs font-semibold text-[#1E1415]">
                              Nomor Meja <span className="text-[#C4252D]">*</span>
                            </label>
                            <input
                              type="text"
                              value={checkout.tableNumber}
                              onChange={(e) => {
                                updateCheckout({ tableNumber: e.target.value });
                                setFormError(null);
                              }}
                              placeholder="Misal: A-12 / Outdoor 4"
                              className="w-full rounded-xl border border-[#F5D6D9] bg-white px-3 py-2.5 text-sm text-[#1E1415] placeholder:text-zinc-400 focus:border-[#C4252D] focus:outline-none"
                            />
                          </div>
                        )}
                      </div>

                      {checkout.method === "delivery" && (
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-[#1E1415]">
                            Alamat Pengantaran{" "}
                            <span className="text-[#C4252D]">*</span>
                          </label>
                          <textarea
                            rows={2}
                            value={checkout.deliveryAddress}
                            onChange={(e) => {
                              updateCheckout({
                                deliveryAddress: e.target.value,
                              });
                              setFormError(null);
                            }}
                            placeholder="Jl. Merdeka No. 10, Kos Putri Melati (Patokan depan minimarket)"
                            className="w-full rounded-xl border border-[#F5D6D9] bg-white px-3 py-2 text-sm text-[#1E1415] placeholder:text-zinc-400 focus:border-[#C4252D] focus:outline-none"
                          />
                        </div>
                      )}

                      <div>
                        <label className="mb-1 block text-xs font-semibold text-[#1E1415]">
                          Catatan Khusus Dapur (Opsional)
                        </label>
                        <input
                          type="text"
                          value={checkout.notes}
                          onChange={(e) =>
                            updateCheckout({ notes: e.target.value })
                          }
                          placeholder="Misal: Tanpa daun bawang, es batu sedikit..."
                          className="w-full rounded-xl border border-[#F5D6D9] bg-white px-3 py-2.5 text-sm text-[#1E1415] placeholder:text-zinc-400 focus:border-[#C4252D] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Receipt Preview */}
                  <div className="rounded-2xl border border-[#F5D6D9] bg-white">
                    <button
                      type="button"
                      onClick={() => setShowReceiptPreview((prev) => !prev)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-bold text-[#1E1415] transition hover:text-[#C4252D]"
                    >
                      <span className="flex items-center gap-2">
                        <ReceiptText className="h-4 w-4 text-[#C4252D]" />
                        Pratinjau Format Struk WhatsApp
                      </span>
                      <span>{showReceiptPreview ? "Tutup" : "Lihat"}</span>
                    </button>
                    {showReceiptPreview && (
                      <div className="border-t border-[#F5D6D9] p-4">
                        <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-xl bg-[#FDF1F2] p-3 font-mono text-[11px] leading-relaxed text-[#1E1415]">
                          {receiptText}
                        </pre>
                        <button
                          type="button"
                          onClick={handleCopyReceipt}
                          className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-[#F5D6D9] bg-white px-3 py-1.5 text-xs font-semibold text-[#1E1415] transition hover:border-[#C4252D] hover:text-[#C4252D]"
                        >
                          {copied ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                              Tersalin
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Salin Teks Struk
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Footer Checkout CTA */}
            {cart.length > 0 && (
              <div className="border-t border-[#F5D6D9] bg-[#FDF1F2] px-5 py-4">
                {formError && (
                  <div className="mb-3 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-xs font-semibold text-[#C4252D]">
                    {formError}
                  </div>
                )}

                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center justify-between text-[#665A5B]">
                    <span>Subtotal Pesanan</span>
                    <span className="font-mono font-semibold text-[#1E1415]">
                      {formatRupiah(subtotal)}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex items-center justify-between text-[#665A5B]">
                      <span>Ongkir Kurir Outlet</span>
                      <span className="font-mono font-semibold text-[#1E1415]">
                        {formatRupiah(deliveryFee)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-[#F5D6D9] pt-2 text-base font-bold text-[#1E1415]">
                    <span>Total Pembayaran</span>
                    <span className="font-mono text-lg font-extrabold text-[#C4252D]">
                      {formatRupiah(grandTotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C4252D] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#C4252D]/25 transition hover:bg-[#A81D24] active:scale-[0.99]"
                >
                  <Send className="h-4 w-4" strokeWidth={2.5} />
                  Checkout & Kirim Struk via WhatsApp
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
