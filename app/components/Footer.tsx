"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="pattern-bg py-16 px-4 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
      />

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-4xl mb-6">🌙</div>

          <p
            className="text-2xl md:text-3xl leading-loose mb-8"
            style={{ color: "var(--gold-light)", fontFamily: "'Scheherazade New', serif" }}
          >
            نَسْأَلُ اللَّهَ أَنْ يَجْعَلَ هَذَا العَمَلَ
            <br />
            صَدَقَةً جَارِيَةً فِي مِيزَانِ حَسَنَاتِهَا
          </p>

          <div className="section-divider mb-8" />

          <p
            className="text-xl leading-loose mb-6"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Scheherazade New', serif" }}
          >
            اللَّهُمَّ اغْفِرْ لِلْحَاجَّةِ فَوْقِيَّةَ أَحْمَد فُؤَاد الحُصَيْن
            <br />
            وَارْحَمْهَا وَأَسْكِنْهَا فَسِيحَ جَنَّاتِكَ
          </p>

          <p
            className="text-base"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Scheherazade New', serif" }}
          >
            أُعِدَّ هَذَا المَوْقِعُ بِحُبٍّ وَإِخْلَاصٍ مِنْ أَهْلِهِ وَذَوِيهِ
          </p>

          <p
            className="text-sm mt-4"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            ﴿ رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ ﴾
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
