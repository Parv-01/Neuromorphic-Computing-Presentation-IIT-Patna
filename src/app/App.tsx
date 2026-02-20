import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NeuralBackground } from "./components/NeuralBackground";
import { Slide01Title } from "./components/slides/Slide01Title";
import { Slide02Crisis } from "./components/slides/Slide02Crisis";
import { Slide03Scaling } from "./components/slides/Slide03Scaling";
import { Slide04Alternatives } from "./components/slides/Slide04Alternatives";
import { Slide05Brain } from "./components/slides/Slide05Brain";
import { Slide06IntroNeuro } from "./components/slides/Slide06IntroNeuro";
import { Slide07DeepDive } from "./components/slides/Slide07DeepDive";
import { Slide08Learning } from "./components/slides/Slide08Learning";
import { Slide09NonML } from "./components/slides/Slide09NonML";
import { Slide10Gaps } from "./components/slides/Slide10Gaps";
import { Slide11Future } from "./components/slides/Slide11Future";
import { Slide12Quantum } from "./components/slides/Slide12Quantum";
import { Slide13CoDesign } from "./components/slides/Slide13CoDesign";
import { Slide14Paradigm } from "./components/slides/Slide14Paradigm";
import { Slide15Closing } from "./components/slides/Slide15Closing";
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";

const TOTAL_SLIDES = 15;

const slideNames = [
  "Title",
  "Classical Computing Crisis",
  "Scaling ≠ Intelligence",
  "Alternatives",
  "Brain Computation",
  "Neuromorphic Computing",
  "Paper Deep Dive",
  "Learning Paradigms",
  "Non-ML Applications",
  "Research Gaps",
  "Future Pathways",
  "Quantum Synergy",
  "Co-Design",
  "Paradigm Shift",
  "Closing",
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showOverview, setShowOverview] = useState(false);

  const goToSlide = useCallback((n: number) => {
    if (n >= 1 && n <= TOTAL_SLIDES) {
      setCurrentSlide(n);
      setShowOverview(false);
    }
  }, []);

  const nextSlide = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "Escape") {
        setShowOverview((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const renderSlide = () => {
    switch (currentSlide) {
      case 1: return <Slide01Title totalSlides={TOTAL_SLIDES} />;
      case 2: return <Slide02Crisis totalSlides={TOTAL_SLIDES} />;
      case 3: return <Slide03Scaling totalSlides={TOTAL_SLIDES} />;
      case 4: return <Slide04Alternatives totalSlides={TOTAL_SLIDES} />;
      case 5: return <Slide05Brain totalSlides={TOTAL_SLIDES} />;
      case 6: return <Slide06IntroNeuro totalSlides={TOTAL_SLIDES} />;
      case 7: return <Slide07DeepDive totalSlides={TOTAL_SLIDES} />;
      case 8: return <Slide08Learning totalSlides={TOTAL_SLIDES} />;
      case 9: return <Slide09NonML totalSlides={TOTAL_SLIDES} />;
      case 10: return <Slide10Gaps totalSlides={TOTAL_SLIDES} />;
      case 11: return <Slide11Future totalSlides={TOTAL_SLIDES} />;
      case 12: return <Slide12Quantum totalSlides={TOTAL_SLIDES} />;
      case 13: return <Slide13CoDesign totalSlides={TOTAL_SLIDES} />;
      case 14: return <Slide14Paradigm totalSlides={TOTAL_SLIDES} />;
      case 15: return <Slide15Closing totalSlides={TOTAL_SLIDES} />;
      default: return <Slide01Title totalSlides={TOTAL_SLIDES} />;
    }
  };

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{
        backgroundColor: "#191970",
        background: "linear-gradient(135deg, #191970 0%, #1a1a5e 40%, #151560 70%, #191970 100%)",
        fontFamily: "'Inter', 'IBM Plex Sans', sans-serif",
      }}
    >
      {/* Neural background */}
      <NeuralBackground opacity={currentSlide === 1 || currentSlide === 15 ? 0.15 : 0.06} />

      {/* Subtle wave interference pattern */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, rgba(58,110,165,0.08) 0%, transparent 50%),
                       radial-gradient(ellipse at 80% 50%, rgba(107,162,146,0.07) 0%, transparent 50%),
                       radial-gradient(ellipse at 50% 0%, rgba(91,75,138,0.06) 0%, transparent 40%)`,
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} className="w-full h-full">
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 pb-1">
        {/* Previous */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 1}
          className="p-2 rounded-full transition-all duration-300 disabled:opacity-20"
          style={{
            backgroundColor: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          <ChevronLeft className="w-4 h-4 text-[#C9A84C]" />
        </button>

        {/* Overview toggle */}
        <button
          onClick={() => setShowOverview(!showOverview)}
          className="p-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: showOverview ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          <Grid3X3 className="w-4 h-4 text-[#C9A84C]" />
        </button>

        {/* Next */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === TOTAL_SLIDES}
          className="p-2 rounded-full transition-all duration-300 disabled:opacity-20"
          style={{
            backgroundColor: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          <ChevronRight className="w-4 h-4 text-[#C9A84C]" />
        </button>
      </div>

      {/* Keyboard hint */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 4, duration: 1 }}
        className="fixed top-4 right-4 z-50 flex items-center gap-2"
      >
        <span className="text-[0.6rem] text-[#E8E4D9]/50" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          ← → navigate &middot; ESC overview
        </span>
      </motion.div>

      {/* Slide overview modal */}
      <AnimatePresence>
        {showOverview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
            style={{ backgroundColor: "rgba(12,12,50,0.97)" }}
            onClick={() => setShowOverview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-[#C9A84C] text-center mb-6" style={{ fontSize: "1.1rem" }}>
                Slide Overview
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {slideNames.map((name, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i + 1)}
                    className="p-3 rounded-lg text-left transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: currentSlide === i + 1 ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${currentSlide === i + 1 ? 'rgba(201,168,76,0.35)' : 'rgba(232,228,217,0.06)'}`,
                    }}
                  >
                    <span
                      className="text-[0.55rem] block mb-1"
                      style={{
                        color: currentSlide === i + 1 ? '#C9A84C' : 'rgba(232,228,217,0.3)',
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-[0.68rem] block"
                      style={{ color: currentSlide === i + 1 ? '#E8E4D9' : 'rgba(232,228,217,0.7)' }}
                    >
                      {name}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-center text-[0.6rem] text-[#E8E4D9]/40 mt-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                Press ESC or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}