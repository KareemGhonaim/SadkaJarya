"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Check, Heart } from "lucide-react";

const prayers = [
  {
    id: "p1",
    text: "اللَّهُمَّ اغْفِرْ لَهَا وَارْحَمْهَا، وَعَافِهَا وَاعْفُ عَنْهَا، وَأَكْرِمْ نُزُلَهَا، وَوَسِّعْ مُدْخَلَهَا",
    source: "صحيح مسلم",
  },
  {
    id: "p2",
    text: "اللَّهُمَّ اجْعَلْ قَبْرَهَا رَوْضَةً مِنْ رِيَاضِ الجَنَّةِ، وَلَا تَجْعَلْهُ حُفْرَةً مِنْ حُفَرِ النِّيرَانِ",
    source: "دعاء مأثور",
  },
  {
    id: "p3",
    text: "اللَّهُمَّ اجْعَلْ أَعْمَالَهَا فِي مِيزَانِ حَسَنَاتِهَا، وَاغْفِرْ لَهَا ذُنُوبَهَا وَخَطَايَاهَا",
    source: "دعاء مأثور",
  },
  {
    id: "p4",
    text: "اللَّهُمَّ أَنِرْ قَبْرَهَا، وَاجْمَعْنَا بِهَا فِي الفِرْدَوْسِ الأَعْلَى مَعَ النَّبِيِّينَ وَالصِّدِّيقِينَ",
    source: "دعاء مأثور",
  },
];

export default function PrayersSection() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("prayer_counts");
    if (stored) setCounts(JSON.parse(stored));
  }, []);

  const incrementCount = (id: string) => {
    const newCounts = { ...counts, [id]: (counts[id] || 0) + 1 };
    setCounts(newCounts);
    localStorage.setItem("prayer_counts", JSON.stringify(newCounts));
  };

  const copyPrayer = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
      incrementCount(id);
    } catch {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const sharePrayer = async (text: string, id: string) => {
    incrementCount(id);
    if (navigator.share) {
      await navigator.share({ text: text + "\n\n(أُهدي ثواب هذا الدعاء لروح المرحومة الحاجة/فوقية أحمد فؤاد الحصين)" });
    } else {
      await copyPrayer(text, id);
    }
  };

  return (
    <section id="prayers" className="py-20 px-4" style={{ background: "var(--cream)" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-3xl mb-3" style={{ color: "var(--gold)" }}>🤲</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: "var(--green-dark)", fontFamily: "'Scheherazade New', serif" }}>
            أدعية للمرحومة
          </h2>
          <div className="section-divider my-4" />
          <p className="text-lg" style={{ color: "var(--text-muted)", fontFamily: "'Scheherazade New', serif" }}>
            اقرأ الدعاء وأهدِ ثوابه لروح المرحومة
          </p>
        </motion.div>

        {/* Prayer cards */}
        <div className="grid gap-6">
          {prayers.map((prayer, i) => (
            <motion.div
              key={prayer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="arabic-card p-6 md:p-8"
            >
              <p
                className="text-2xl md:text-3xl leading-loose mb-5 text-center"
                style={{ color: "var(--green-dark)", fontFamily: "'Scheherazade New', serif" }}
              >
                {prayer.text}
              </p>

              <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
                <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "'Scheherazade New', serif" }}>
                  المصدر: {prayer.source}
                </span>

                <div className="flex items-center gap-3">
                  {/* Count badge */}
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm"
                    style={{ background: "rgba(201,168,76,0.1)", color: "var(--gold-dark)" }}
                  >
                    <Heart size={13} fill="currentColor" />
                    <span style={{ fontFamily: "'Scheherazade New', serif" }}>
                      {counts[prayer.id] || 0} مرة
                    </span>
                  </div>

                  {/* Copy button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyPrayer(prayer.text, prayer.id)}
                    className="p-2 rounded-lg transition-colors"
                    style={{ background: copied === prayer.id ? "var(--green-mid)" : "rgba(27,58,45,0.08)", color: copied === prayer.id ? "white" : "var(--green-dark)" }}
                    title="نسخ"
                  >
                    {copied === prayer.id ? <Check size={17} /> : <Copy size={17} />}
                  </motion.button>

                  {/* Share button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sharePrayer(prayer.text, prayer.id)}
                    className="p-2 rounded-lg transition-colors"
                    style={{ background: "rgba(201,168,76,0.12)", color: "var(--gold-dark)" }}
                    title="مشاركة"
                  >
                    <Share2 size={17} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
