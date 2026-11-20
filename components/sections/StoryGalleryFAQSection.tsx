"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  MapPin,
  Quote,
  Star,
  X,
  ZoomIn,
} from "lucide-react";
import {
  FAQ_ITEMS,
  GALLERY_PHOTOS,
  STORY_MILESTONES,
  TESTIMONIALS,
} from "@/data/warmindoData";
import { SectionHeading } from "@/components/ui/SectionHeading";

const GALLERY_CATS = [
  "Semua",
  "Suasana",
  "Kuliner",
  "Nobar & Komunitas",
  "Bar Kopi",
] as const;

export function StoryGalleryFAQSection() {
  const [galleryCategory, setGalleryCategory] =
    useState<(typeof GALLERY_CATS)[number]>("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const filteredPhotos = useMemo(() => {
    if (galleryCategory === "Semua") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((p) => p.category === galleryCategory);
  }, [galleryCategory]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const currentLightboxPhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;
  const currentTestimonial = TESTIMONIALS[activeTestimonial];

  return (
    <div id="cerita" className="bg-white">
      {/* 1. MOST POPULAR GALLERY WITH LIGHTBOX */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Galeri Suasana & Kuliner"
              highlight="Momen"
              title="Paling Populer"
              highlightFirst
              description="Klik foto mana pun untuk melihat detail resolusi penuh melalui lightbox interaktif."
              icon={<Camera className="h-4 w-4" />}
            />

            <div className="flex flex-wrap gap-2">
              {GALLERY_CATS.map((cat) => {
                const active = galleryCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setGalleryCategory(cat);
                      setLightboxIndex(null);
                    }}
                    className={`rounded-full px-3.5 py-2 text-xs font-bold transition ${
                      active
                        ? "bg-[#C4252D] text-white shadow-sm"
                        : "bg-[#FDF1F2] text-[#665A5B] hover:text-[#C4252D]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-4">
            {filteredPhotos.map((photo, index) => (
              <motion.button
                key={photo.id}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setLightboxIndex(index)}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl bg-[#FDF1F2] text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C4252D]"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                    photo.span === "tall"
                      ? "h-80"
                      : photo.span === "wide"
                        ? "h-56"
                        : "h-64"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1415]/85 via-[#1E1415]/10 to-transparent" />
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#C4252D] opacity-0 shadow transition group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </div>
                <div className="absolute right-3 bottom-3 left-3">
                  <span className="inline-block rounded bg-[#C4252D] px-2 py-0.5 text-[10px] font-bold text-white">
                    {photo.category}
                  </span>
                  <h4 className="mt-1 font-display text-sm font-bold text-white">
                    {photo.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-rose-100/80">
                    {photo.branch}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {currentLightboxPhoto && lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E1415]/85 p-4 backdrop-blur-sm no-print"
              role="dialog"
              aria-label="Pratinjau foto galeri"
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1E1415] shadow transition hover:bg-[#C4252D] hover:text-white"
                  aria-label="Tutup lightbox"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="relative bg-[#1E1415]">
                  <img
                    src={currentLightboxPhoto.image}
                    alt={currentLightboxPhoto.title}
                    className="max-h-[68vh] w-full object-contain"
                  />

                  {filteredPhotos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxIndex(
                            (lightboxIndex - 1 + filteredPhotos.length) %
                              filteredPhotos.length
                          )
                        }
                        className="absolute top-1/2 left-3 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#1E1415] shadow transition hover:bg-[#C4252D] hover:text-white"
                        aria-label="Foto sebelumnya"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxIndex(
                            (lightboxIndex + 1) % filteredPhotos.length
                          )
                        }
                        className="absolute top-1/2 right-3 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#1E1415] shadow transition hover:bg-[#C4252D] hover:text-white"
                        aria-label="Foto berikutnya"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-col justify-between gap-2 p-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#FDF1F2] px-2 py-0.5 text-[11px] font-bold text-[#C4252D]">
                        {currentLightboxPhoto.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#665A5B]">
                        <MapPin className="h-3.5 w-3.5 text-[#C4252D]" />
                        {currentLightboxPhoto.branch}
                      </span>
                    </div>
                    <h4 className="mt-1.5 font-display text-lg font-bold text-[#1E1415]">
                      {currentLightboxPhoto.title}
                    </h4>
                    <p className="mt-0.5 text-sm text-[#665A5B]">
                      {currentLightboxPhoto.caption}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs font-bold text-[#665A5B]">
                    {lightboxIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 2. BRAND STORY TIMELINE (Clean 4-Col Blush Cards) */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Jejak Perjalanan"
            highlight="Timeline"
            title="Warmindo Nusantara"
            highlightFirst
            description="Bagaimana 6 meja kayu sederhana di Purwokerto berkembang menjadi 18 cabang modern 24 jam."
            icon={<BookOpen className="h-4 w-4" />}
          />

          <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {STORY_MILESTONES.map((milestone, idx) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex flex-col rounded-2xl bg-[#FDF1F2] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#C4252D] hover:text-white hover:shadow-xl hover:shadow-[#C4252D]/20"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-lg bg-[#C4252D] px-2.5 py-1 font-mono text-xs font-extrabold text-white transition group-hover:bg-white group-hover:text-[#C4252D]">
                    {milestone.year}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#C4252D] transition group-hover:text-amber-300">
                    {milestone.metric}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-[#1E1415] transition group-hover:text-white">
                  {milestone.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#C4252D] transition group-hover:text-rose-100">
                  {milestone.subtitle}
                </p>
                <p className="mt-2.5 flex-1 text-xs leading-relaxed text-[#665A5B] transition group-hover:text-rose-100/90">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIAL SLIDER & 4. INTERACTIVE FAQ */}
      <section className="bg-white pt-10 pb-20 sm:pt-14 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Testimonial Slider */}
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Kata Nongkrongers"
                highlight="Testimoni"
                title="Pelanggan"
                highlightFirst
                icon={<Quote className="h-4 w-4" />}
              />

              <div className="mt-7 rounded-3xl bg-[#FDF1F2] p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: currentTestimonial.rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      )
                    )}
                  </div>
                  <span className="text-xs text-[#665A5B]">
                    {currentTestimonial.date}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5"
                  >
                    <p className="text-sm leading-relaxed text-[#1E1415] italic sm:text-base">
                      “{currentTestimonial.quote}”
                    </p>

                    <div className="mt-4 inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-[#C4252D] shadow-xs">
                      Favorit: {currentTestimonial.favoriteMenu}
                    </div>

                    <div className="mt-6 flex items-center gap-3 border-t border-white pt-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C4252D] font-display text-sm font-extrabold text-white">
                        {currentTestimonial.avatarInitials}
                      </div>
                      <div>
                        <p className="font-display text-sm font-bold text-[#1E1415]">
                          {currentTestimonial.name}
                        </p>
                        <p className="text-xs text-[#665A5B]">
                          {currentTestimonial.role}
                        </p>
                        <p className="text-[11px] font-semibold text-[#C4252D]">
                          {currentTestimonial.branch}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {TESTIMONIALS.map((t, idx) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveTestimonial(idx)}
                        aria-label={`Lihat testimoni ${t.name}`}
                        className={`h-2 rounded-full transition-all ${
                          idx === activeTestimonial
                            ? "w-7 bg-[#C4252D]"
                            : "w-2 bg-white hover:bg-[#C4252D]/60"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTestimonial(
                          (prev) =>
                            (prev - 1 + TESTIMONIALS.length) %
                            TESTIMONIALS.length
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1E1415] shadow-xs transition hover:bg-[#C4252D] hover:text-white"
                      aria-label="Testimoni sebelumnya"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTestimonial(
                          (prev) => (prev + 1) % TESTIMONIALS.length
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1E1415] shadow-xs transition hover:bg-[#C4252D] hover:text-white"
                      aria-label="Testimoni berikutnya"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive FAQ Accordion */}
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Tanya Jawab (FAQ)"
                highlight="Pertanyaan"
                title="Umum"
                highlightFirst
                icon={<HelpCircle className="h-4 w-4" />}
              />

              <div className="mt-7 space-y-3">
                {FAQ_ITEMS.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`overflow-hidden rounded-2xl transition ${
                        isOpen
                          ? "bg-[#FDF1F2] shadow-xs"
                          : "bg-[#FDF1F2]/60 hover:bg-[#FDF1F2]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-[#C4252D] uppercase">
                            {faq.category}
                          </span>
                          <p className="mt-0.5 font-display text-sm font-bold text-[#1E1415] sm:text-base">
                            {faq.question}
                          </p>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-[#C4252D] transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                          >
                            <div className="border-t border-white px-5 py-4 text-sm leading-relaxed text-[#665A5B]">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
