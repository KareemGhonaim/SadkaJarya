"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2 } from "lucide-react";

interface Prayer {
  id: string;
  text: string;
  time: string;
}

const suggestions = [
  "اللهم ارحمها رحمة واسعة",
  "اللهم اغفر لها وأسكنها الفردوس الأعلى",
  "اللهم نوّر قبرها وارحمها",
  "رحمها الله",
];

export default function PrayerWall() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("prayer_wall");
    if (stored) setPrayers(JSON.parse(stored));
  }, []);

  const addPrayer = () => {
    if (!input.trim()) return;
    const newPrayer: Prayer = {
      id: Date.now().toString(),
      text: input.trim(),
      time: new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" }),
    };
    const updated = [newPrayer, ...prayers];
    setPrayers(updated);
    localStorage.setItem("prayer_wall", JSON.stringify(updated));
    setInput("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const removePrayer = (id: string) => {
    const updated = prayers.filter((p) => p.id !== id);
    setPrayers(updated);
    localStorage.setItem("prayer_wall", JSON.stringify(updated));
  };

  return (
    <section id="prayer-wall" className="py-20 px-4 pattern-light">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-3xl mb-3">💬</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: "var(--green-dark)", fontFamily: "'Scheherazade New', serif" }}>
            جدار الدعاء
          </h2>
          <div className="section-divider my-4" />
          <p className="text-lg" style={{ color: "var(--text-muted)", fontFamily: "'Scheherazade New', serif" }}>
            اترك دعاءً للمرحومة، كل كلمة خير تصلها بإذن الله
          </p>
        </motion.div>

        {/* Input area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="arabic-card p-6 mb-8"
        >
          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="px-3 py-1.5 rounded-full text-sm transition-all"
                style={{
                  background: "rgba(27,58,45,0.07)",
                  color: "var(--green-dark)",
                  fontFamily: "'Scheherazade New', serif",
                  border: "1px solid rgba(27,58,45,0.15)",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب دعاءك هنا..."
            rows={3}
            className="w-full rounded-lg p-4 text-xl outline-none resize-none mb-4"
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              background: "var(--cream)",
              color: "var(--green-dark)",
              fontFamily: "'Scheherazade New', serif",
              direction: "rtl",
              lineHeight: 1.8,
            }}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), addPrayer())}
          />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-3 rounded-lg text-xl font-bold"
                style={{
                  background: "rgba(44,84,64,0.1)",
                  color: "var(--green-mid)",
                  fontFamily: "'Scheherazade New', serif",
                }}
              >
                جزاك الله خيراً ✓
              </motion.div>
            ) : (
              <motion.button
                key="send"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={addPrayer}
                disabled={!input.trim()}
                className="btn-gold w-full flex items-center justify-center gap-2 text-xl disabled:opacity-50"
                style={{ fontFamily: "'Scheherazade New', serif" }}
              >
                <Send size={18} />
                أرسل دعاءك
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Prayers list */}
        <div className="space-y-4">
          <AnimatePresence>
            {prayers.map((prayer) => (
              <motion.div
                key={prayer.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="arabic-card p-5 flex items-start gap-4"
              >
                <div className="flex-1">
                  <p
                    className="text-xl leading-loose mb-2"
                    style={{ color: "var(--green-dark)", fontFamily: "'Scheherazade New', serif" }}
                  >
                    {prayer.text}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{prayer.time}</p>
                </div>
                <button
                  onClick={() => removePrayer(prayer.id)}
                  className="p-1.5 rounded transition-colors mt-1"
                  style={{ color: "rgba(0,0,0,0.2)" }}
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {prayers.length === 0 && (
            <p
              className="text-center text-xl py-8"
              style={{ color: "var(--text-muted)", fontFamily: "'Scheherazade New', serif" }}
            >
              كن أول من يدعو للمرحومة 🤲
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
