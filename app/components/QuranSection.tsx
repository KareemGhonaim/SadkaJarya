"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";

const surahs = [
  {
    id: "fatiha",
    name: "سورة الفاتحة",
    number: "١",
    verse: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    verses: "٧ آيات",
    virtue: "أعظم سورة في القرآن الكريم",
    link: "https://quran.com/1",
  },
  {
    id: "ikhlas",
    name: "سورة الإخلاص",
    number: "١١٢",
    verse: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    verses: "٤ آيات",
    virtue: "تعدل ثلث القرآن الكريم",
    link: "https://quran.com/112",
  },
  {
    id: "mulk",
    name: "سورة الملك",
    number: "٦٧",
    verse: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ ۝ الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا...",
    verses: "٣٠ آية",
    virtue: "تشفع لصاحبها في القبر",
    link: "https://quran.com/67",
  },
  {
    id: "yasin",
    name: "سورة يس",
    number: "٣٦",
    verse: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ يس ۝ وَالْقُرْآنِ الْحَكِيمِ ۝ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ۝ عَلَى صِرَاطٍ مُّسْتَقِيمٍ...",
    verses: "٨٣ آية",
    virtue: "قلب القرآن الكريم",
    link: "https://quran.com/36",
  },
];

export default function QuranSection() {
  const [read, setRead] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem("quran_read");
    if (stored) setRead(JSON.parse(stored));
  }, []);

  const toggleRead = (id: string) => {
    const newRead = { ...read, [id]: !read[id] };
    setRead(newRead);
    localStorage.setItem("quran_read", JSON.stringify(newRead));
  };

  return (
    <section id="quran" className="py-20 px-4 pattern-light">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-3xl mb-3">📖</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: "var(--green-dark)", fontFamily: "'Scheherazade New', serif" }}>
            اقرأ وأهدِ الثواب
          </h2>
          <div className="section-divider my-4" />
          <p className="text-lg" style={{ color: "var(--text-muted)", fontFamily: "'Scheherazade New', serif" }}>
            اقرأ هذه السور وأهدِ ثوابها لروح المرحومة الحاجة/فوقية أحمد فؤاد الحصين
          </p>
        </motion.div>

        <div className="grid gap-6">
          {surahs.map((surah, i) => (
            <motion.div
              key={surah.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="arabic-card overflow-hidden"
              style={read[surah.id] ? { borderColor: "var(--green-mid)", background: "rgba(44,84,64,0.03)" } : {}}
            >
              {/* Header */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ background: read[surah.id] ? "rgba(44,84,64,0.08)" : "rgba(201,168,76,0.06)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: "var(--green-dark)", color: "var(--gold-light)", fontFamily: "'Scheherazade New', serif" }}
                  >
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: "var(--green-dark)", fontFamily: "'Scheherazade New', serif" }}>
                      {surah.name}
                    </h3>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{surah.verses} — {surah.virtue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={surah.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: "var(--gold-dark)", background: "rgba(201,168,76,0.1)" }}
                    title="قراءة كاملة"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Verses */}
              <div className="px-6 py-5">
                <p
                  className="text-xl md:text-2xl leading-loose mb-5"
                  style={{ color: "var(--green-dark)", fontFamily: "'Scheherazade New', serif", direction: "rtl" }}
                >
                  {surah.verse}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleRead(surah.id)}
                  className="w-full py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-bold transition-all"
                  style={{
                    background: read[surah.id] ? "rgba(44,84,64,0.12)" : "rgba(27,58,45,0.06)",
                    color: read[surah.id] ? "var(--green-mid)" : "var(--green-dark)",
                    border: `1px solid ${read[surah.id] ? "var(--green-mid)" : "rgba(27,58,45,0.2)"}`,
                    fontFamily: "'Scheherazade New', serif",
                  }}
                >
                  {read[surah.id] ? <CheckCircle2 size={20} fill="currentColor" /> : <Circle size={20} />}
                  {read[surah.id] ? "✓ قرأتها وأهديت الثواب" : "قرأتها وأهديت الثواب"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
