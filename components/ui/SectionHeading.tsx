"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  highlightFirst?: boolean;
  description?: string;
  align?: "left" | "center";
  icon?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  highlightFirst = false,
  description,
  align = "left",
  icon,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className={
        isCentered ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"
      }
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#C4252D] ${
            isCentered ? "justify-center" : ""
          }`}
        >
          {icon}
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#1E1415] sm:text-3xl lg:text-4xl">
        {highlightFirst ? (
          <>
            {highlight && <span className="text-[#C4252D]">{highlight} </span>}
            {title}
          </>
        ) : (
          <>
            {title}{" "}
            {highlight && <span className="text-[#C4252D]">{highlight}</span>}
          </>
        )}
      </h2>

      {description && (
        <p className="mt-3 text-sm leading-relaxed text-[#665A5B] sm:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}
