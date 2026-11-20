"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { useWarmindoStore } from "@/store/useWarmindoStore";

export function ToastContainer() {
  const toasts = useWarmindoStore((s) => s.toasts);
  const dismissToast = useWarmindoStore((s) => s.dismissToast);

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-50 flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2.5 sm:w-full no-print">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon =
            toast.variant === "warning"
              ? AlertTriangle
              : toast.variant === "info"
                ? Info
                : CheckCircle2;

          const accentClass =
            toast.variant === "warning"
              ? "border-red-300 text-[#C4252D]"
              : toast.variant === "info"
                ? "border-amber-300 text-amber-600"
                : "border-[#F5D6D9] text-[#C4252D]";

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border bg-white p-3.5 shadow-xl shadow-[#5A1115]/10 ${accentClass}`}
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#1E1415]">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="mt-0.5 text-xs text-[#665A5B]">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="rounded-lg p-1 text-zinc-400 transition hover:bg-[#FDF1F2] hover:text-[#C4252D]"
                aria-label="Tutup notifikasi"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
