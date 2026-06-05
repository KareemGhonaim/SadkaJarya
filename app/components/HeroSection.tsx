"use client";
import { motion } from "framer-motion";
import { Heart, ImageIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  onOpenFlyer: () => void;
}

export default function HeroSection({ onOpenFlyer }: Props) {
  const scrollToPrayers = () => {
    document.getElementById("prayers")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── FULL-BLEED HEADER PHOTO ── */}
      <div className="relative w-full" style={{ minHeight: "70vh" }}>
        <Image
          src="/memorial-header.png"
          alt="بطاقة تذكار المرحومة"
          fill
          priority
          className="object-cover object-top"
          style={{ objectPosition: "center 20%" }}
        />

        {/* Dark gradient overlay — stronger at bottom for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.2) 40%, rgba(27,58,45,0.92) 80%, #1B3A2D 100%)",
          }}
        />

        {/* Islamic pattern subtle overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg fill='none' stroke='rgba(201,168,76,0.8)' stroke-width='0.5'%3E%3Cpolygon points='40,5 75,27.5 75,52.5 40,75 5,52.5 5,27.5'/%3E%3Cpolygon points='40,15 65,30 65,50 40,65 15,50 15,30'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Gold top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 z-10"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent)" }}
        />

        {/* Bismillah — floats over the photo */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="absolute top-20 left-0 right-0 text-center z-10 px-4"
        >
          <p
            className="text-2xl md:text-3xl"
            style={{ color: "rgba(201,168,76,0.9)", fontFamily: "'Scheherazade New', serif", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </motion.div>

        {/* Name + dates overlay at bottom of photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 z-10 text-center pb-10 px-4"
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-2 leading-relaxed"
            style={{
              color: "var(--gold-light)",
              fontFamily: "'Scheherazade New', serif",
              textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            الحاجة/فوقية أحمد فؤاد الحصين
          </h1>

          <div className="section-divider my-3" />

          <p
            className="text-xl md:text-2xl"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Scheherazade New', serif", textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
          >
            ١٩٦٣م — ٢٠٢٦م
          </p>
          <p
            className="text-base mt-1"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Scheherazade New', serif" }}
          >
            رحمها الله وأسكنها فسيح جناته
          </p>
        </motion.div>
      </div>

      {/* ── CARD SECTION below the photo ── */}
      <div
        className="relative z-10 flex-1 px-4 pb-16 pt-10 text-center"
        style={{ background: "#1B3A2D" }}
      >
        {/* Pattern bg overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg fill='none' stroke='rgba(201,168,76,0.8)' stroke-width='0.5'%3E%3Cpolygon points='40,5 75,27.5 75,52.5 40,75 5,52.5 5,27.5'/%3E%3Cpolygon points='40,15 65,30 65,50 40,65 15,50 15,30'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-2xl mx-auto">
          {/* Remembrance message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="rounded-2xl p-6 md:p-8 mb-8"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(201,168,76,0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              className="text-xl md:text-2xl leading-loose"
              style={{ color: "rgba(255,255,255,0.88)", fontFamily: "'Scheherazade New', serif" }}
            >
              "كانت نعم الأم والمرأة، تركت في قلوبنا أثراً لا يُمحى،
              وفي حياتنا نوراً لا يُنسى.
              اللهم اجعل لها مكاناً في أعلى الجنان."
            </p>
          </motion.div>

          {/* Quran verse */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-2xl leading-loose mb-8"
            style={{ color: "rgba(201,168,76,0.8)", fontFamily: "'Scheherazade New', serif" }}
          >
            ﴿ كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ﴾
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToPrayers}
              className="btn-gold inline-flex items-center gap-3 text-xl glow-animation"
            >
              <Heart size={22} fill="white" />
              ادعي لها بالرحمة
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenFlyer}
              className="inline-flex items-center gap-3 text-xl px-7 py-3 rounded-lg font-bold transition-all"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(201,168,76,0.5)",
                color: "var(--gold-light)",
                fontFamily: "'Scheherazade New', serif",
                backdropFilter: "blur(6px)",
              }}
            >
              <ImageIcon size={20} />
              بطاقة التذكار
            </motion.button>
          </motion.div>
        </div>

        {/* Gold bottom bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />
      </div>
    </section>
  );
}
