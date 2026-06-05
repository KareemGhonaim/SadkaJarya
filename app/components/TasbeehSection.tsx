"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

const tasbeehItems = [
  { id: "subhanallah", text: "سُبْحَانَ اللَّهِ", color: "#2C5440", bg: "rgba(44,84,64,0.08)" },
  { id: "alhamdulillah", text: "الحَمْدُ لِلَّهِ", color: "#9A7B2C", bg: "rgba(154,123,44,0.08)" },
  { id: "allahuakbar", text: "اللَّهُ أَكْبَرُ", color: "#1B3A2D", bg: "rgba(27,58,45,0.08)" },
  { id: "lailahaillallah", text: "لَا إِلَهَ إِلَّا اللَّهُ", color: "#7B3A10", bg: "rgba(123,58,16,0.06)" },
];

export default function TasbeehSection() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const stored = localStorage.getItem("tasbeeh_counts");
    if (stored) setCounts(JSON.parse(stored));
  }, []);

  const increment = (id: string) => {
    const newCounts = { ...counts, [id]: (counts[id] || 0) + 1 };
    setCounts(newCounts);
    localStorage.setItem("tasbeeh_counts", JSON.stringify(newCounts));
  };

  const reset = (id: string) => {
    const newCounts = { ...counts, [id]: 0 };
    setCounts(newCounts);
    localStorage.setItem("tasbeeh_counts", JSON.stringify(newCounts));
  };

  return (
    <section id="tasbeeh" className="py-20 px-4" style={{ background: "var(--cream)" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-3xl mb-3">📿</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: "var(--green-dark)", fontFamily: "'Scheherazade New', serif" }}>
            السبحة الإلكترونية
          </h2>
          <div className="section-divider my-4" />
          <p className="text-lg" style={{ color: "var(--text-muted)", fontFamily: "'Scheherazade New', serif" }}>
            سبّح وأهدِ الأجر لروح المرحومة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tasbeehItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="arabic-card p-6 text-center"
            >
              <p
                className="text-3xl md:text-4xl leading-loose mb-4"
                style={{ color: item.color, fontFamily: "'Scheherazade New', serif" }}
              >
                {item.text}
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={counts[item.id] || 0}
                  initial={{ scale: 1.25, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-5xl font-bold mb-5"
                  style={{ color: item.color, fontFamily: "'Scheherazade New', serif" }}
                >
                  {(counts[item.id] || 0).toLocaleString("ar-SA")}
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => increment(item.id)}
                  className="flex-1 py-3 rounded-lg font-bold text-white text-xl transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}dd, ${item.color})`,
                    fontFamily: "'Scheherazade New', serif",
                    boxShadow: `0 4px 15px ${item.color}33`,
                  }}
                >
                  تسبيح
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => reset(item.id)}
                  className="p-3 rounded-lg transition-colors"
                  style={{ background: item.bg, color: item.color }}
                  title="إعادة تعيين"
                >
                  <RotateCcw size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
