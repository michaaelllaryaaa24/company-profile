"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Flame,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import {
  formatRupiah,
  MENU_CATEGORIES,
  MENU_ITEMS,
} from "@/data/warmindoData";
import { useWarmindoStore } from "@/store/useWarmindoStore";
import { MenuCategory, SpicyFilter } from "@/types/warmindo";

const SPICY_FILTERS: { id: SpicyFilter; label: string }[] = [
  { id: "Semua", label: "Semua Pedas" },
  { id: "Tidak Pedas", label: "Original (0)" },
  { id: "Sedang", label: "Sedang (1–2)" },
  { id: "Pedas", label: "Pedas (3–4)" },
  { id: "Ekstrem", label: "Ekstrem (5)" },
];

type SortOption = "recommended" | "price-asc" | "price-desc" | "spicy-desc";

export function MenuCatalogSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategory>("Semua");
  const [spicyFilter, setSpicyFilter] = useState<SpicyFilter>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [showAll, setShowAll] = useState(false);
  const [featuredId, setFeaturedId] = useState<string>(MENU_ITEMS[0].id);
  const [likedIds, setLikedIds] = useState<string[]>([MENU_ITEMS[0].id]);
  const [mounted, setMounted] = useState(false);

  const cart = useWarmindoStore((s) => s.cart);
  const addRegularItemToCart = useWarmindoStore((s) => s.addRegularItemToCart);
  const updateCartItemQuantity = useWarmindoStore(
    (s) => s.updateCartItemQuantity
  );

  useEffect(() => {
    setMounted(true);
    const onNavbarSearch = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string") {
        setSearchQuery(detail);
        setShowAll(true);
      }
    };
    window.addEventListener("warmindo:search", onNavbarSearch);
    return () => window.removeEventListener("warmindo:search", onNavbarSearch);
  }, []);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matches = MENU_ITEMS.filter((item) => {
      if (selectedCategory !== "Semua" && item.category !== selectedCategory) {
        return false;
      }

      if (spicyFilter === "Tidak Pedas" && item.spicyLevel !== 0) return false;
      if (
        spicyFilter === "Sedang" &&
        (item.spicyLevel < 1 || item.spicyLevel > 2)
      )
        return false;
      if (
        spicyFilter === "Pedas" &&
        (item.spicyLevel < 3 || item.spicyLevel > 4)
      )
        return false;
      if (spicyFilter === "Ekstrem" && item.spicyLevel !== 5) return false;

      if (q) {
        const hay = [
          item.name,
          item.description,
          item.category,
          ...item.tags,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });

    if (sortBy === "price-asc") {
      return [...matches].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...matches].sort((a, b) => b.price - a.price);
    }
    if (sortBy === "spicy-desc") {
      return [...matches].sort((a, b) => b.spicyLevel - a.spicyLevel);
    }
    return matches;
  }, [selectedCategory, spicyFilter, searchQuery, sortBy]);

  const displayedItems =
    showAll || selectedCategory !== "Semua" || searchQuery || spicyFilter !== "Semua"
      ? filteredItems
      : filteredItems.slice(0, 8); // Exact 2 rows x 4 columns = 8 cards like reference!

  const getCartQuantity = (menuItemId: string) => {
    if (!mounted) return 0;
    const found = cart.find(
      (c) => c.type === "regular" && c.menuItemId === menuItemId
    );
    return found?.quantity ?? 0;
  };

  const toggleLike = (id: string) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="menu" className="bg-white py-12 sm:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Exact Reference Header: "Best Products" / "Menu Andalan" + "VIEW ALL ->" */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#1E1415] sm:text-3xl">
              <span className="text-[#C4252D]">Menu</span> Andalan
            </h2>
            <p className="mt-1 text-xs text-[#665A5B] sm:text-sm">
              Katalog lengkap Indomie, Roti Bakar, Pancong Lumer, Kopi Nusantara
              & Camilan 24 jam.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-[#1E1415] uppercase transition hover:text-[#C4252D]"
          >
            {showAll
              ? "Tampilkan 8 Terbaik"
              : `Lihat Semua (${MENU_ITEMS.length})`}
            <ArrowRight className="h-3.5 w-3.5 text-[#C4252D]" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {MENU_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                  active
                    ? "text-white"
                    : "border border-[#F5D6D9] bg-[#FDF1F2] text-[#665A5B] hover:border-[#C4252D] hover:text-[#C4252D]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeMenuCategoryPill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#C4252D]"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Compact Search, Spicy & Sort Bar */}
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[#F5D6D9] bg-[#FDF1F2]/60 p-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari menu (telur asin, matcha, kopi aren, ceker)..."
              className="w-full rounded-xl border border-[#F5D6D9] bg-white py-2 pr-9 pl-10 text-xs text-[#1E1415] placeholder:text-zinc-400 focus:border-[#C4252D] focus:outline-none sm:text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-[#C4252D]"
                aria-label="Hapus pencarian"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {SPICY_FILTERS.map((sf) => {
              const active = spicyFilter === sf.id;
              return (
                <button
                  key={sf.id}
                  type="button"
                  onClick={() => setSpicyFilter(sf.id)}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition ${
                    active
                      ? "bg-[#C4252D] text-white"
                      : "bg-white text-[#665A5B] ring-1 ring-[#F5D6D9] hover:text-[#C4252D]"
                  }`}
                >
                  {sf.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-[#C4252D]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Urutkan menu"
              className="rounded-xl border border-[#F5D6D9] bg-white px-3 py-1.5 text-xs font-semibold text-[#1E1415] focus:border-[#C4252D] focus:outline-none"
            >
              <option value="recommended">Urut: Rekomendasi</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
              <option value="spicy-desc">Paling Pedas</option>
            </select>
          </div>
        </div>

        {/* 4-COLUMN PRODUCT GRID — Exact Blush-Pink + Solid Crimson Featured Card from Reference! */}
        {displayedItems.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#F5D6D9] bg-[#FDF1F2] px-6 py-14 text-center">
            <p className="font-display text-lg font-bold text-[#1E1415]">
              Menu tidak ditemukan
            </p>
            <p className="mt-1 text-sm text-[#665A5B]">
              Coba ubah kata kunci atau reset filter kategori & level pedas.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("Semua");
                setSpicyFilter("Semua");
                setSearchQuery("");
              }}
              className="mt-4 rounded-lg bg-[#C4252D] px-4 py-2 text-xs font-bold text-white"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {displayedItems.map((item, idx) => {
                const qtyInCart = getCartQuantity(item.id);
                const isFeatured =
                  item.id === featuredId ||
                  (idx === 0 && !displayedItems.some((d) => d.id === featuredId));
                const isLiked = likedIds.includes(item.id);

                return (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.28) }}
                    whileHover={{ y: -6 }}
                    onMouseEnter={() => setFeaturedId(item.id)}
                    className={`group relative flex flex-col rounded-2xl p-5 transition-colors duration-300 ${
                      isFeatured
                        ? "bg-[#C4252D] text-white shadow-xl shadow-[#C4252D]/25"
                        : "bg-[#FDF1F2] text-[#1E1415] hover:shadow-lg hover:shadow-[#5A1115]/10"
                    }`}
                  >
                    {/* Centered Circular Studio Food Dish Photo */}
                    <div className="relative mx-auto mt-1 mb-4 h-32 w-32">
                      <motion.div
                        whileHover={{ rotate: 6, scale: 1.07 }}
                        transition={{ type: "spring", stiffness: 280, damping: 18 }}
                        className={`h-full w-full overflow-hidden rounded-full shadow-lg ${
                          isFeatured
                            ? "ring-4 ring-white/25"
                            : "ring-4 ring-white"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </motion.div>

                      {item.spicyLevel > 0 && (
                        <span
                          className={`absolute -right-1 bottom-1 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm ${
                            isFeatured
                              ? "bg-[#4E0E12] text-amber-300"
                              : "bg-white text-[#C4252D]"
                          }`}
                        >
                          <Flame className="h-2.5 w-2.5 fill-current" />
                          L{item.spicyLevel}
                        </span>
                      )}
                    </div>

                    {/* Title & Heart Like Icon (Exact Reference Match) */}
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`font-display text-sm font-bold leading-snug line-clamp-1 ${
                          isFeatured ? "text-white" : "text-[#1E1415]"
                        }`}
                      >
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => toggleLike(item.id)}
                        aria-label={`Favoritkan ${item.name}`}
                        className="shrink-0 transition active:scale-90"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isLiked
                              ? isFeatured
                                ? "fill-white text-white"
                                : "fill-[#C4252D] text-[#C4252D]"
                              : isFeatured
                                ? "text-white/75 hover:text-white"
                                : "text-[#C4252D]/60 hover:text-[#C4252D]"
                          }`}
                        />
                      </button>
                    </div>

                    {/* 5 Golden Stars + Calories */}
                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <span
                        className={`font-mono text-[10px] ${
                          isFeatured ? "text-rose-100" : "text-[#665A5B]"
                        }`}
                      >
                        {item.calories} kkal
                      </span>
                    </div>

                    {/* Short Description */}
                    <p
                      className={`mt-2.5 flex-1 text-xs leading-relaxed line-clamp-2 ${
                        isFeatured ? "text-rose-100/90" : "text-[#665A5B]"
                      }`}
                    >
                      {item.description}
                    </p>

                    {/* Price & Square Cart Button at Bottom */}
                    <div className="mt-4 flex items-center justify-between pt-2">
                      <span
                        className={`font-mono text-sm font-extrabold ${
                          isFeatured ? "text-white" : "text-[#C4252D]"
                        }`}
                      >
                        {formatRupiah(item.price)}
                      </span>

                      {qtyInCart > 0 ? (
                        <div
                          className={`inline-flex items-center gap-1.5 rounded-lg p-1 ${
                            isFeatured
                              ? "bg-white text-[#C4252D]"
                              : "bg-[#C4252D] text-white"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              updateCartItemQuantity(`reg-${item.id}`, -1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded hover:opacity-80"
                            aria-label="Kurangi"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-4 text-center font-mono text-xs font-bold">
                            {qtyInCart}
                          </span>
                          <button
                            type="button"
                            onClick={() => addRegularItemToCart(item)}
                            className="flex h-6 w-6 items-center justify-center rounded hover:opacity-80"
                            aria-label="Tambah"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addRegularItemToCart(item)}
                          aria-label={`Tambah ${item.name} ke keranjang`}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-sm transition active:scale-90 ${
                            isFeatured
                              ? "bg-white text-[#C4252D] hover:bg-rose-50"
                              : "bg-[#C4252D] text-white hover:bg-[#A81D24]"
                          }`}
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
