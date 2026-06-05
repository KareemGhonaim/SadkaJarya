"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const deeds = [
  { id: "fatiha", icon: "📖", label: "قرأتُ الفاتحة", short: "الفاتحة", color: "#2C5440" },
  { id: "istighfar100", icon: "🙏", label: "استغفرتُ ١٠٠ مرة", short: "١٠٠ استغفار", color: "#9A7B2C" },
  { id: "salah", icon: "☪️", label: "صلّيتُ على النبي ﷺ", short: "الصلاة على النبي", color: "#1B3A2D" },
  { id: "sadaqah", icon: "💛", label: "تصدّقتُ بنية المتوفّى", short: "صدقة", color: "#7B3A10" },
];

export default function GoodDeedsSection() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [recent, setRecent] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("good_deeds_counts");
    if (stored) setCounts(JSON.parse(stored));
  }, []);

  const handleDeed = (id: string) => {
    const newCounts = { ...counts, [id]: (counts[id] || 0) + 1 };
    setCounts(newCounts);
    localStorage.setItem("good_deeds_counts", JSON.stringify(newCounts));
    setRecent(id);
    setTimeout(() => setRecent(null), 1000);
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <section id="good-deeds" className="py-20 px-4" style={{ background: "var(--green-dark)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-3xl mb-3">✨</div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ color: "var(--gold-light)", fontFamily: "'Scheherazade New', serif" }}
          >
            أعمال صالحة
          </h2>
          <div className="section-divider my-4" />
          <p className="text-xl" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Scheherazade New', serif" }}>
            سجّل عملك الصالح وأهدِ ثوابه لروح المرحومة
          </p>
        </motion.div>

        {/* Total counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div
            className="inline-block px-8 py-4 rounded-2xl"
            style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            <p className="text-base mb-1" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Scheherazade New', serif" }}>
              إجمالي الأعمال الصالحة المُهداة
            </p>
            <motion.p
              key={total}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-5xl font-bold"
              style={{ color: "var(--gold)", fontFamily: "'Scheherazade New', serif" }}
            >
              {total.toLocaleString("ar-SA")}
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {deeds.map((deed, i) => (
            <motion.div
              key={deed.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-xl p-6 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(201,168,76,0.25)",
                backdropFilter: "blur(10px)",
              }}
              onClick={() => handleDeed(deed.id)}
            >
              <AnimatePresence>
                {recent === deed.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    className="absolute inset-0 flex items-center justify-center z-10 rounded-xl"
                    style={{ background: "rgba(201,168,76,0.2)" }}
                  >
                    <span className="text-4xl">✓</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{deed.icon}</span>
                <p
                  className="text-xl font-bold leading-snug flex-1"
                  style={{ color: "var(--gold-light)", fontFamily: "'Scheherazade New', serif" }}
                >
                  {deed.label}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <motion.p
                  key={counts[deed.id] || 0}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-bold"
                  style={{ color: "white", fontFamily: "'Scheherazade New', serif" }}
                >
                  {(counts[deed.id] || 0).toLocaleString("ar-SA")}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => { e.stopPropagation(); handleDeed(deed.id); }}
                  className="px-5 py-2 rounded-lg text-base font-bold"
                  style={{
                    background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                    color: "white",
                    fontFamily: "'Scheherazade New', serif",
                  }}
                >
                  فعلتُها ✓
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
