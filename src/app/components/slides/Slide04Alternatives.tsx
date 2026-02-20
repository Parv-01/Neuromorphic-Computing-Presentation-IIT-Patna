import { motion } from "motion/react";
import { useState } from "react";
import { SlideWrapper } from "../SlideWrapper";
import { Cpu, Waves, Atom, Brain, Layers } from "lucide-react";

const alternatives = [
  {
    icon: Cpu,
    label: "Approximate Computing",
    desc: "Trading precision for efficiency — acceptable in many AI workloads",
    color: "#E8E4D9",
    detail: "Uses reduced-precision arithmetic (INT8, FP16) to cut energy by 4-16x with minimal accuracy loss.",
  },
  {
    icon: Waves,
    label: "Analog Computing",
    desc: "Continuous-valued computation using physical processes",
    color: "#E8E4D9",
    detail: "Performs matrix operations in the analog domain using memristors and crossbar arrays — O(1) energy for multiply-accumulate.",
  },
  {
    icon: Atom,
    label: "Quantum Computing",
    desc: "Leveraging superposition and entanglement for specific problems",
    color: "#5B4B8A",
    detail: "Exponential speedup for optimization and simulation tasks, but requires near-zero temperatures and error correction.",
  },
  {
    icon: Brain,
    label: "Brain-Inspired Computing",
    desc: "Neuromorphic systems that mimic biological neural networks",
    color: "#6BA292",
    highlight: true,
    detail: "Event-driven, massively parallel, co-located memory and processing — the focus of this presentation.",
  },
  {
    icon: Layers,
    label: "Heterogeneous Systems",
    desc: "Combining multiple compute paradigms in one system",
    color: "#E8E4D9",
    detail: "CPU + GPU + FPGA + Neuromorphic + Quantum — each handling tasks best suited to their architecture.",
  },
];

export function Slide04Alternatives({ totalSlides }: { totalSlides: number }) {
  const [selected, setSelected] = useState<number | null>(3);
  const [showHighlight, setShowHighlight] = useState(false);

  return (
    <SlideWrapper slideNumber={4} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          What Are the Alternatives?
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-[#5B4B8A] mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {alternatives.map((alt, i) => {
            const isSelected = selected === i;
            const isHighlighted = alt.highlight && showHighlight;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => {
                  setSelected(i);
                  if (alt.highlight) setShowHighlight(true);
                }}
                className="p-4 rounded-xl cursor-pointer transition-all duration-500 flex flex-col items-center text-center"
                style={{
                  backgroundColor: isHighlighted
                    ? 'rgba(107,162,146,0.15)'
                    : isSelected
                    ? 'rgba(58,110,165,0.12)'
                    : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${
                    isHighlighted
                      ? 'rgba(107,162,146,0.5)'
                      : isSelected
                      ? 'rgba(58,110,165,0.3)'
                      : 'rgba(255,255,255,0.04)'
                  }`,
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${alt.color}15`, border: `1px solid ${alt.color}30` }}
                >
                  <alt.icon className="w-5 h-5" style={{ color: alt.color }} />
                </div>
                <span className="text-[0.8rem] text-[#E8E4D9] mb-1">{alt.label}</span>
                <span className="text-[0.65rem] text-[#E8E4D9]/60">{alt.desc}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Detail panel */}
        {selected !== null && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-5 rounded-xl border"
            style={{
              backgroundColor: alternatives[selected].highlight
                ? 'rgba(107,162,146,0.08)'
                : 'rgba(58,110,165,0.08)',
              borderColor: alternatives[selected].highlight
                ? 'rgba(107,162,146,0.2)'
                : 'rgba(58,110,165,0.15)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              {(() => {
                const Icon = alternatives[selected].icon;
                return <Icon className="w-5 h-5" style={{ color: alternatives[selected].color }} />;
              })()}
              <span className="text-[#E8E4D9] text-[0.95rem]">{alternatives[selected].label}</span>
              {alternatives[selected].highlight && (
                <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-[#6BA292]/20 text-[#6BA292] border border-[#6BA292]/30" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  FOCUS
                </span>
              )}
            </div>
            <p className="text-[#E8E4D9]/80 text-[0.8rem]">{alternatives[selected].detail}</p>
          </motion.div>
        )}

        {!showHighlight && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center text-[0.7rem] text-[#6BA292] mt-4"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Click "Brain-Inspired Computing" to focus →
          </motion.p>
        )}
      </div>
    </SlideWrapper>
  );
}