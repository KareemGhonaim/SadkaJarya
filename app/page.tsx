"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PrayersSection from "./components/PrayersSection";
import IstighfarSection from "./components/IstighfarSection";
import TasbeehSection from "./components/TasbeehSection";
import QuranSection from "./components/QuranSection";
import GoodDeedsSection from "./components/GoodDeedsSection";
import PrayerWall from "./components/PrayerWall";
import Footer from "./components/Footer";
import PhotoFlyerModal from "./components/PhotoFlyerModal";

export default function Home() {
  const [showFlyer, setShowFlyer] = useState(false);

  // Auto-open flyer on first visit
  useEffect(() => {
    const timer = setTimeout(() => setShowFlyer(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <Navbar />
      <HeroSection onOpenFlyer={() => setShowFlyer(true)} />
      <PrayersSection />
      <IstighfarSection />
      <TasbeehSection />
      <QuranSection />
      <GoodDeedsSection />
      <PrayerWall />
      <Footer />

      {showFlyer && <PhotoFlyerModal onClose={() => setShowFlyer(false)} />}
    </main>
  );
}
