"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, ImageIcon } from "lucide-react";
import NextImage from "next/image";

interface Props {
  onClose: () => void;
}

export default function PhotoFlyerModal({ onClose }: Props) {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);

  // Load saved photo, fall back to default memorial image
  useEffect(() => {
    const saved = localStorage.getItem("deceased_photo");
    if (saved) setPhoto(saved);
    else setPhoto("/memorial-header.png");
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPhoto(dataUrl);
      localStorage.setItem("deceased_photo", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhoto("/memorial-header.png");
    localStorage.removeItem("deceased_photo");
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        {/* Flyer container */}
        <motion.div
          ref={flyerRef}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -left-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "var(--gold)", color: "white" }}
          >
            <X size={18} />
          </button>

          {/* THE FLYER */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #1B3A2D 0%, #0d2318 50%, #1a2e1e 100%)",
              border: "2px solid rgba(201,168,76,0.6)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(201,168,76,0.15), inset 0 1px 0 rgba(201,168,76,0.3)",
            }}
          >
            {/* Top ornament band */}
            <div
              className="h-2 w-full"
              style={{ background: "linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent)" }}
            />

            {/* Islamic pattern overlay */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.8'%3E%3Cpolygon points='40,5 75,27.5 75,52.5 40,75 5,52.5 5,27.5'/%3E%3Cpolygon points='40,15 65,30 65,50 40,65 15,50 15,30'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <div className="relative px-8 pb-8 pt-6 text-center">

              {/* Bismillah */}
              <p
                className="text-lg mb-5 leading-relaxed"
                style={{ color: "rgba(201,168,76,0.85)", fontFamily: "'Scheherazade New', serif" }}
              >
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>

              {/* ── PHOTO AREA ── */}
              <div className="relative mx-auto mb-6 w-48 h-48 md:w-56 md:h-56">
                {/* Decorative rings */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, var(--gold), var(--gold-light), var(--gold-dark), var(--gold))",
                    padding: "3px",
                  }}
                >
                  <div className="w-full h-full rounded-full" style={{ background: "#1B3A2D" }} />
                </div>
                <div
                  className="absolute inset-1.5 rounded-full"
                  style={{ border: "1px solid rgba(201,168,76,0.3)" }}
                />

                {/* Photo or placeholder */}
                {photo && photo.startsWith("data:") && (
                  <img
                    src={photo}
                    alt="المرحوم"
                    className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full object-cover"
                    style={{ border: "2px solid rgba(201,168,76,0.4)" }}
                  />
                )}
                {photo && !photo.startsWith("data:") && (
                  <NextImage
                    src={photo}
                    alt="المرحوم"
                    fill
                    className="rounded-full object-cover"
                    style={{ inset: "8px", width: "calc(100% - 16px)", height: "calc(100% - 16px)", border: "2px solid rgba(201,168,76,0.4)" }}
                  />
                )}
                {!photo && (
                  <div
                    className="absolute inset-2 rounded-full flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                    style={{ background: "rgba(201,168,76,0.08)", border: "1px dashed rgba(201,168,76,0.4)" }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon size={30} style={{ color: "rgba(201,168,76,0.5)" }} />
                    <span
                      className="text-xs text-center leading-tight px-2"
                      style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'Scheherazade New', serif" }}
                    >
                      اضغط لإضافة صورة
                    </span>
                  </div>
                )}
              </div>

              {/* Photo upload / remove buttons */}
              <div className="flex justify-center gap-3 mb-6">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all"
                  style={{
                    background: "rgba(201,168,76,0.15)",
                    color: "var(--gold-light)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    fontFamily: "'Scheherazade New', serif",
                  }}
                >
                  <Upload size={14} />
                  {photo ? "تغيير الصورة" : "رفع صورة"}
                </button>
                {photo && (
                  <button
                    onClick={removePhoto}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all"
                    style={{
                      background: "rgba(255,100,100,0.1)",
                      color: "rgba(255,150,150,0.9)",
                      border: "1px solid rgba(255,100,100,0.2)",
                      fontFamily: "'Scheherazade New', serif",
                    }}
                  >
                    <X size={14} />
                    حذف
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Gold divider ornament */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.5))" }} />
                <span style={{ color: "var(--gold)", fontSize: "1.2rem" }}>✦</span>
                <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5))" }} />
              </div>

              {/* ── NAME ── */}
              <h2
                className="text-3xl md:text-4xl font-bold mb-2 leading-relaxed"
                style={{ color: "var(--gold-light)", fontFamily: "'Scheherazade New', serif" }}
              >
                الحاجة / فوقية أحمد فؤاد الحصين
              </h2>

              {/* Date of birth / death */}
              <p
                className="text-base mb-1"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Scheherazade New', serif" }}
              >
                ١٩٦٣م — ٢٠٢٦م
              </p>
              <p
                className="text-sm mb-6"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Scheherazade New', serif" }}
              >
                رحمها الله وأسكنها فسيح جناته
              </p>

              {/* Quran verse */}
              <div
                className="rounded-xl px-5 py-4 mb-6"
                style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <p
                  className="text-xl leading-loose"
                  style={{ color: "rgba(201,168,76,0.9)", fontFamily: "'Scheherazade New', serif" }}
                >
                  ﴿ كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ
                  <br />
                  وَإِنَّا إِلَيْهِ رَاجِعُونَ ﴾
                </p>
              </div>

              {/* Dua */}
              <p
                className="text-lg leading-loose mb-2"
                style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Scheherazade New', serif" }}
              >
                اللَّهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا
                <br />
                وَأَدْخِلْهَا جَنَّةَ الفِرْدَوْسِ الأَعْلَى
              </p>
            </div>

            {/* Bottom ornament band */}
            <div
              className="h-2 w-full"
              style={{ background: "linear-gradient(90deg, transparent, var(--gold), var(--gold-light), var(--gold), transparent)" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
