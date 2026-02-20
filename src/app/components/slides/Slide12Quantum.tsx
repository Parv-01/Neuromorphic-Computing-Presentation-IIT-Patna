import { motion } from "motion/react";
import { useState } from "react";
import { SlideWrapper } from "../SlideWrapper";
import { Atom, Brain, Layers } from "lucide-react";

const quantumCapabilities = [
  { label: "Superposition", desc: "Explore exponentially many states simultaneously" },
  { label: "Optimization", desc: "Quantum annealing for combinatorial problems" },
  { label: "Sampling", desc: "Efficient sampling from complex distributions" },
  { label: "QUBO", desc: "Native quadratic binary optimization" },
];

const neuromorphicCapabilities = [
  { label: "Energy-efficient inference", desc: "Event-driven computation at milliwatt scale" },
  { label: "Graph-based reasoning", desc: "Natural graph traversal via spike propagation" },
  { label: "Event-driven dynamics", desc: "Asynchronous, always-on processing" },
  { label: "Temporal processing", desc: "Native handling of time-series data" },
];

const convergences = [
  { label: "Neuromorphic front-end + quantum optimizer", desc: "Neuromorphic preprocessing feeds quantum optimization for real-time decision making" },
  { label: "Quantum-inspired stochastic plasticity", desc: "Quantum randomness principles applied to neuromorphic learning rules" },
  { label: "Hybrid heterogeneous compute stack", desc: "CPU + GPU + Neuromorphic + Quantum — each handling tasks suited to their physics" },
];

const stackLayers = [
  { label: "Applications", sublabel: "AI · Optimization · Science", color: "#E8E4D9", width: "100%" },
  { label: "Software Stack", sublabel: "Compilers · Frameworks · APIs", color: "#E8E4D9", width: "90%" },
  { label: "Classical", sublabel: "CPU + GPU", color: "#3A6EA5", width: "40%" },
  { label: "Neuromorphic", sublabel: "SNN Accelerator", color: "#6BA292", width: "30%" },
  { label: "Quantum", sublabel: "QPU", color: "#5B4B8A", width: "20%" },
];

export function Slide12Quantum({ totalSlides }: { totalSlides: number }) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
    <SlideWrapper slideNumber={12} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
        >
          Quantum and Neuromorphic: Complementary Futures
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-gradient-to-r from-[#5B4B8A] to-[#6BA292] mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quantum */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-[#5B4B8A]/8 border border-[#5B4B8A]/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <Atom className="w-5 h-5 text-[#5B4B8A]" />
              <span className="text-[#5B4B8A] text-[0.9rem]">Quantum</span>
            </div>
            <div className="space-y-2">
              {quantumCapabilities.map((cap, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#5B4B8A]" />
                    <span className="text-[#E8E4D9]/85 text-[0.78rem]">{cap.label}</span>
                  </div>
                  <span className="text-[#E8E4D9]/50 text-[0.65rem] pl-3 block opacity-0 group-hover:opacity-100 transition-opacity">
                    {cap.desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Neuromorphic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-4 rounded-xl bg-[#6BA292]/8 border border-[#6BA292]/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-[#6BA292]" />
              <span className="text-[#6BA292] text-[0.9rem]">Neuromorphic</span>
            </div>
            <div className="space-y-2">
              {neuromorphicCapabilities.map((cap, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#6BA292]" />
                    <span className="text-[#E8E4D9]/85 text-[0.78rem]">{cap.label}</span>
                  </div>
                  <span className="text-[#E8E4D9]/50 text-[0.65rem] pl-3 block opacity-0 group-hover:opacity-100 transition-opacity">
                    {cap.desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Convergence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl bg-gradient-to-b from-[#5B4B8A]/8 to-[#6BA292]/8 border border-[#E8E4D9]/10"
          >
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5 text-[#E8E4D9]/70" />
              <span className="text-[#E8E4D9] text-[0.9rem]">Convergence</span>
            </div>
            <div className="space-y-3">
              {convergences.map((conv, i) => (
                <div key={i} className="group cursor-default">
                  <span className="text-[#E8E4D9]/85 text-[0.78rem]">{conv.label}</span>
                  <span className="text-[#E8E4D9]/50 text-[0.65rem] block opacity-0 group-hover:opacity-100 transition-opacity">
                    {conv.desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Layered system diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-[rgba(255,255,255,0.03)] rounded-xl border border-[#E8E4D9]/10 p-5"
        >
          <p className="text-[0.7rem] text-[#E8E4D9]/60 mb-4 uppercase tracking-wider text-center" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            Heterogeneous Compute Stack — Click to explore
          </p>

          <div className="flex flex-col items-center gap-2 max-w-lg mx-auto">
            {stackLayers.map((layer, i) => {
              const isHardwareRow = i >= 2;
              if (isHardwareRow && i === 2) {
                // Render hardware row as horizontal group
                return (
                  <div key={i} className="flex gap-2 w-full justify-center">
                    {stackLayers.slice(2).map((hw, j) => (
                      <motion.div
                        key={j}
                        className="p-2 rounded-lg text-center cursor-pointer transition-all"
                        style={{
                          backgroundColor: activeLayer === 2 + j ? `${hw.color}20` : `${hw.color}08`,
                          border: `1px solid ${activeLayer === 2 + j ? `${hw.color}50` : `${hw.color}15`}`,
                          flex: hw.width,
                        }}
                        onClick={() => setActiveLayer(activeLayer === 2 + j ? null : 2 + j)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-[0.75rem] block" style={{ color: hw.color }}>{hw.label}</span>
                        <span className="text-[0.6rem] text-[#E8E4D9]/50">{hw.sublabel}</span>
                      </motion.div>
                    ))}
                  </div>
                );
              }
              if (isHardwareRow) return null;
              return (
                <motion.div
                  key={i}
                  className="p-2 rounded-lg text-center cursor-pointer transition-all"
                  style={{
                    width: layer.width,
                    backgroundColor: activeLayer === i ? `${layer.color}15` : `${layer.color}05`,
                    border: `1px solid ${activeLayer === i ? `${layer.color}40` : `${layer.color}10`}`,
                  }}
                  onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-[0.75rem] block" style={{ color: layer.color }}>{layer.label}</span>
                  <span className="text-[0.6rem] text-[#E8E4D9]/50">{layer.sublabel}</span>
                </motion.div>
              );
            })}
          </div>

          {activeLayer !== null && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-[0.7rem] text-[#E8E4D9]/70 mt-3"
            >
              {activeLayer === 0 && "Application layer orchestrates workloads across all compute substrates"}
              {activeLayer === 1 && "Unified software stack abstracts hardware differences — compile once, deploy anywhere"}
              {activeLayer === 2 && "Classical CPUs/GPUs handle sequential logic and dense linear algebra"}
              {activeLayer === 3 && "Neuromorphic chips process event-driven, sparse, temporal workloads at ultra-low power"}
              {activeLayer === 4 && "Quantum processors tackle optimization and sampling problems with exponential advantage"}
            </motion.p>
          )}
        </motion.div>
      </div>
    </SlideWrapper>
  );
}