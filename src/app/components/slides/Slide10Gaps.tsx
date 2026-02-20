import { motion } from "motion/react";
import { useState } from "react";
import { SlideWrapper } from "../SlideWrapper";
import { AlertCircle, BarChart3, Monitor, Code, Lock } from "lucide-react";

const gaps = [
  {
    icon: AlertCircle,
    label: "No Breakthrough Algorithm",
    desc: "No neuromorphic algorithm has yet convincingly outperformed deep learning on mainstream benchmarks",
    severity: "high",
  },
  {
    icon: BarChart3,
    label: "Limited Benchmarks",
    desc: "Lack of standardized benchmarks makes fair comparison between neuromorphic and conventional approaches difficult",
    severity: "medium",
  },
  {
    icon: Monitor,
    label: "Simulator Inefficiency",
    desc: "Current SNN simulators run on Von Neumann hardware, negating efficiency advantages during development",
    severity: "medium",
  },
  {
    icon: Code,
    label: "Programming Abstraction Absence",
    desc: "No equivalent of PyTorch/TensorFlow for neuromorphic — steep learning curve, fragmented ecosystem",
    severity: "high",
  },
  {
    icon: Lock,
    label: "Hardware Accessibility",
    desc: "Most neuromorphic chips are research prototypes with limited access — TrueNorth, Loihi, SpiNNaker restricted",
    severity: "medium",
  },
];

const coDesignLayers = [
  { label: "Applications", color: "#E8E4D9", y: 30 },
  { label: "Algorithms", color: "#6BA292", y: 80 },
  { label: "Architecture", color: "#3A6EA5", y: 130 },
  { label: "Circuits", color: "#5B4B8A", y: 180 },
  { label: "Devices", color: "#3A6EA5", y: 230 },
  { label: "Materials", color: "#6BA292", y: 280 },
];

export function Slide10Gaps({ totalSlides }: { totalSlides: number }) {
  const [showCoDesign, setShowCoDesign] = useState(false);

  return (
    <SlideWrapper slideNumber={10} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
        >
          Closing the Gap Between Expectation and Reality
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-red-500/50 mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            {gaps.map((gap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.12 }}
                className="flex items-start gap-3 p-3 rounded-lg group transition-all hover:bg-[rgba(255,255,255,0.04)]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${gap.severity === 'high' ? 'rgba(212,24,61,0.15)' : 'rgba(255,255,255,0.04)'}`,
                }}
              >
                <gap.icon
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  style={{ color: gap.severity === 'high' ? '#d4183d' : '#E8E4D9' }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#E8E4D9] text-[0.85rem]">{gap.label}</span>
                    {gap.severity === 'high' && (
                      <span className="text-[0.55rem] px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/20"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        CRITICAL
                      </span>
                    )}
                  </div>
                  <span className="text-[#E8E4D9]/60 text-[0.72rem] block opacity-0 group-hover:opacity-100 transition-opacity">
                    {gap.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => setShowCoDesign(!showCoDesign)}
              className="px-4 py-1.5 rounded-full text-[0.72rem] mb-4 transition-all"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                backgroundColor: showCoDesign ? 'rgba(91,75,138,0.2)' : 'rgba(91,75,138,0.1)',
                color: '#5B4B8A',
                border: '1px solid rgba(91,75,138,0.3)',
              }}
            >
              {showCoDesign ? "Current Approach" : "Proposed Co-Design"} (Fig. 3)
            </button>

            <div className="bg-[rgba(255,255,255,0.03)] rounded-xl border border-[#5B4B8A]/10 p-5 min-h-[300px]">
              {!showCoDesign ? (
                <BottomUpDiagram />
              ) : (
                <OmnidirectionalDiagram />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function BottomUpDiagram() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
      <p className="text-[0.7rem] text-[#E8E4D9]/70 mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        CURRENT: Bottom-Up Approach
      </p>
      <div className="flex flex-col items-center gap-2 w-full max-w-xs">
        {coDesignLayers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="w-full"
          >
            <div
              className="p-2 rounded text-center text-[0.75rem]"
              style={{
                backgroundColor: `${layer.color}10`,
                border: `1px solid ${layer.color}25`,
                color: layer.color,
              }}
            >
              {layer.label}
            </div>
            {i < coDesignLayers.length - 1 && (
              <div className="flex justify-center">
                <motion.div
                  className="w-px h-3"
                  style={{ backgroundColor: `${layer.color}30` }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <p className="text-[0.6rem] text-red-400/80 mt-4 text-center">
        ↑ Information flows only upward — limited cross-layer optimization
      </p>
    </motion.div>
  );
}

function OmnidirectionalDiagram() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
      <p className="text-[0.7rem] text-[#E8E4D9]/70 mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        PROPOSED: Omnidirectional Co-Design
      </p>
      <div className="flex flex-col items-center gap-2 w-full max-w-xs relative">
        {coDesignLayers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="w-full"
          >
            <div
              className="p-2 rounded text-center text-[0.75rem]"
              style={{
                backgroundColor: `${layer.color}15`,
                border: `1px solid ${layer.color}35`,
                color: layer.color,
              }}
            >
              {layer.label}
            </div>
            {i < coDesignLayers.length - 1 && (
              <div className="flex justify-center items-center gap-1 py-0.5">
                <motion.span
                  className="text-[0.55rem]"
                  style={{ color: `${layer.color}80` }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ↕
                </motion.span>
              </div>
            )}
          </motion.div>
        ))}

        {/* Cross-layer arrows */}
        <motion.div
          className="absolute -right-6 top-1/4 bottom-1/4 w-4 flex items-center justify-center"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-full bg-gradient-to-b from-[#6BA292]/40 via-[#3A6EA5]/40 to-[#5B4B8A]/40" />
        </motion.div>
        <motion.div
          className="absolute -left-6 top-1/4 bottom-1/4 w-4 flex items-center justify-center"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <div className="w-px h-full bg-gradient-to-b from-[#5B4B8A]/40 via-[#3A6EA5]/40 to-[#6BA292]/40" />
        </motion.div>
      </div>
      <p className="text-[0.6rem] text-[#6BA292]/80 mt-4 text-center">
        ↕ Bidirectional influence across all layers — true hardware-software synergy
      </p>
    </motion.div>
  );
}