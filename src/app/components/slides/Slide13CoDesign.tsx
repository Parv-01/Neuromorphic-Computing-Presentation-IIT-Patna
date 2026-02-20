import { motion } from "motion/react";
import { useState } from "react";
import { SlideWrapper } from "../SlideWrapper";

const layers = [
  {
    label: "Applications",
    color: "#E8E4D9",
    examples: "Computer vision, robotics, scientific computing, optimization",
    influences: "Defines requirements → drives algorithm choice, constrains architecture, impacts device/material needs",
  },
  {
    label: "Algorithms",
    color: "#6BA292",
    examples: "SNNs, STDP, reservoir computing, evolutionary optimization",
    influences: "Algorithm structure → shapes architecture design, learning rules influence circuit implementation",
  },
  {
    label: "Architecture",
    color: "#3A6EA5",
    examples: "Crossbar arrays, neuromorphic cores, network-on-chip",
    influences: "Architecture topology → constrains algorithm mapping, determines circuit requirements",
  },
  {
    label: "Circuits",
    color: "#5B4B8A",
    examples: "Neuron circuits, synapse circuits, routing logic",
    influences: "Circuit capabilities → define architecture primitives, constrained by device physics",
  },
  {
    label: "Devices",
    color: "#3A6EA5",
    examples: "Memristors, floating-gate transistors, phase-change memory",
    influences: "Device characteristics → determine circuit design, depend on material properties",
  },
  {
    label: "Materials",
    color: "#6BA292",
    examples: "HfO₂, chalcogenides, ferroelectrics, 2D materials",
    influences: "Material physics → enable device behavior, ultimately define what's physically possible",
  },
];

export function Slide13CoDesign({ totalSlides }: { totalSlides: number }) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [showInfluences, setShowInfluences] = useState(false);

  return (
    <SlideWrapper slideNumber={13} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
        >
          From Bottom-Up to Omnidirectional Co-Design
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-gradient-to-r from-[#6BA292] to-[#5B4B8A] mb-6"
        />

        <p className="text-[0.78rem] text-[#E8E4D9]/70 mb-6">
          Based on Fig. 3 — Click any layer to see cross-layer influence. Each layer both constrains and enables its neighbors.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stack visualization */}
          <div className="flex flex-col gap-2 relative">
            {layers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div
                  className="p-3 rounded-lg cursor-pointer transition-all duration-300 relative overflow-hidden"
                  style={{
                    backgroundColor: activeLayer === i ? `${layer.color}15` : `${layer.color}05`,
                    border: `1px solid ${activeLayer === i ? `${layer.color}50` : `${layer.color}12`}`,
                    transform: activeLayer === i ? 'scale(1.02)' : 'scale(1)',
                  }}
                  onClick={() => {
                    setActiveLayer(activeLayer === i ? null : i);
                    setShowInfluences(true);
                  }}
                >
                  {/* Highlight connecting lines */}
                  {activeLayer !== null && activeLayer !== i && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                    >
                      <div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                          background: `linear-gradient(90deg, ${layers[activeLayer].color}10, transparent)`,
                        }}
                      />
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
                      <span className="text-[0.85rem]" style={{ color: layer.color }}>{layer.label}</span>
                    </div>
                    <span className="text-[0.6rem] text-[#E8E4D9]/50" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      L{i + 1}
                    </span>
                  </div>
                  <span className="text-[0.65rem] text-[#E8E4D9]/50 pl-5 block mt-1 relative z-10">
                    {layer.examples}
                  </span>
                </div>

                {/* Bidirectional arrows */}
                {i < layers.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <motion.div
                      className="flex items-center gap-1"
                      animate={{
                        opacity: activeLayer !== null ? [0.5, 1, 0.5] : 0.3,
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-[0.5rem]" style={{ color: `${layer.color}60` }}>↕</span>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Side arrows showing cross-layer */}
            {activeLayer !== null && (
              <>
                <motion.div
                  className="absolute -right-4 top-0 bottom-0 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="relative h-full w-3">
                    {layers.map((_, i) => {
                      if (i === activeLayer) return null;
                      return (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: layers[activeLayer].color,
                            top: `${(i / (layers.length - 1)) * 100}%`,
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                          animate={{
                            scale: [0.5, 1.2, 0.5],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: Math.abs(i - activeLayer) * 0.2,
                          }}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </div>

          {/* Detail panel */}
          <div>
            {activeLayer !== null ? (
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-xl"
                style={{
                  backgroundColor: `${layers[activeLayer].color}08`,
                  border: `1px solid ${layers[activeLayer].color}20`,
                }}
              >
                <h3 className="mb-3" style={{ color: layers[activeLayer].color, fontSize: "1rem" }}>
                  {layers[activeLayer].label}
                </h3>

                <div className="mb-4">
                  <span className="text-[0.65rem] text-[#E8E4D9]/40 block mb-1 uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    Examples
                  </span>
                  <span className="text-[#E8E4D9]/80 text-[0.78rem]">{layers[activeLayer].examples}</span>
                </div>

                <div className="mb-4">
                  <span className="text-[0.65rem] text-[#E8E4D9]/40 block mb-1 uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    Cross-Layer Influence
                  </span>
                  <span className="text-[#E8E4D9]/80 text-[0.78rem]">{layers[activeLayer].influences}</span>
                </div>

                {/* Connection visualization */}
                <div className="mt-4 p-3 rounded-lg bg-[rgba(255,255,255,0.03)]">
                  <span className="text-[0.65rem] text-[#E8E4D9]/40 block mb-2 uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    Influences all layers
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {layers.map((layer, i) => {
                      if (i === activeLayer) return null;
                      const distance = Math.abs(i - activeLayer);
                      return (
                        <span
                          key={i}
                          className="text-[0.65rem] px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${layer.color}${distance === 1 ? '20' : '10'}`,
                            color: `${layer.color}${distance === 1 ? '' : '80'}`,
                            border: `1px solid ${layer.color}${distance === 1 ? '40' : '15'}`,
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}
                        >
                          {layer.label} {distance === 1 ? '(direct)' : `(${distance} hops)`}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center"
              >
                <div className="text-center p-8">
                  <span className="text-[#E8E4D9]/50 text-[0.85rem] block mb-2">Click any layer to explore</span>
                  <span className="text-[#E8E4D9]/40 text-[0.7rem]">
                    Omnidirectional co-design means every layer influences every other layer
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}