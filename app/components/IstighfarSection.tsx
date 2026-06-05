"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET = 100;

export default function IstighfarSection() {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("istighfar_total");
    if (stored) setTotalCount(parseInt(stored));
  }, []);

  const handleClick = () => {
    const newCount = count + 1;
    const newTotal = totalCount + 1;
    setCount(newCount >= TARGET ? 0 : newCount);
    setTotalCount(newTotal);
    localStorage.setItem("istighfar_total", String(newTotal));
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  const progress = count / TARGET;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <section id="istighfar" className="py-20 px-4 pattern-light">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: "var(--green-dark)", fontFamily: "'Scheherazade New', serif" }}>
            الاستغفار
          </h2>
          <div className="section-divider my-4" />
          <p className="text-lg" style={{ color: "var(--text-muted)", fontFamily: "'Scheherazade New', serif" }}>
            استغفر الله عن روح المرحومة
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="arabic-card p-8 md:p-12 text-center"
        >
          {/* Main dhikr text */}
          <p
            className="text-3xl md:text-4xl leading-loose mb-8"
            style={{ color: "var(--green-dark)", fontFamily: "'Scheherazade New', serif" }}
          >
            أَسْتَغْفِرُ اللَّهَ العَظِيمَ
            <br />
            وَأَتُوبُ إِلَيْهِ
          </p>

          {/* Progress circle */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg width="160" height="160" className="-rotate-90">
                {/* Background circle */}
                <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="10" />
                {/* Progress arc */}
                <circle
                  cx="80" cy="80" r={radius}
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={count}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl font-bold"
                    style={{ color: "var(--green-dark)" }}
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "'Scheherazade New', serif" }}>
                  من {TARGET}
                </span>
              </div>
            </div>
          </div>

          {/* Big click button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleClick}
            animate={flash ? { backgroundColor: "#2C5440" } : {}}
            className="btn-green w-full py-5 text-2xl mb-6 rounded-xl glow-animation"
            style={{ fontFamily: "'Scheherazade New', serif" }}
          >
            اضغط للاستغفار
          </motion.button>

          {/* Total count */}
          <div
            className="rounded-xl py-4 px-6 text-center"
            style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
          >
            <p className="text-lg mb-1" style={{ color: "var(--text-muted)", fontFamily: "'Scheherazade New', serif" }}>
              إجمالي الاستغفار
            </p>
            <motion.p
              key={totalCount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold"
              style={{ color: "var(--gold-dark)", fontFamily: "'Scheherazade New', serif" }}
            >
              {totalCount.toLocaleString("ar-SA")}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
