import { motion } from "motion/react";
import { useState } from "react";
import { SlideWrapper } from "../SlideWrapper";
import { Smartphone, Cpu, Server } from "lucide-react";

const pathways = [
  {
    icon: Smartphone,
    label: "Edge Computing",
    color: "#6BA292",
    desc: "Low-power, always-on inference at the sensor edge",
    details: [
      "Autonomous vehicles: real-time object detection at <1W",
      "IoT sensor fusion: continuous environmental monitoring",
      "Wearable health: neural signal processing on-body",
      "Robotics: reactive control with microsecond latency",
    ],
    metrics: { power: "< 1W", latency: "< 1ms", form: "mm²-scale" },
  },
  {
    icon: Cpu,
    label: "AI Accelerators",
    color: "#3A6EA5",
    desc: "Replacing GPU-based inference with spike-based accelerators",
    details: [
      "Intel Loihi 2: 1M neurons, 128 cores, 1-10mW",
      "IBM TrueNorth: 1M neurons, 4096 cores, 70mW",
      "BrainChip Akida: commercial neuromorphic processor",
      "SpiNNaker 2: 10M ARM cores for brain simulation",
    ],
    metrics: { power: "10-100mW", latency: "< 10ms", form: "chip-scale" },
  },
  {
    icon: Server,
    label: "HPC Co-Processors",
    color: "#5B4B8A",
    desc: "Heterogeneous systems combining neuromorphic with classical HPC",
    details: [
      "Graph analytics on massive networks",
      "Combinatorial optimization at scale",
      "Scientific simulation augmentation",
      "CPU + GPU + Neuromorphic + Quantum integrated compute",
    ],
    metrics: { power: "1-10W", latency: "variable", form: "rack-scale" },
  },
];

export function Slide11Future({ totalSlides }: { totalSlides: number }) {
  const [activePathway, setActivePathway] = useState(0);

  return (
    <SlideWrapper slideNumber={11} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          The Three Deployment Pathways
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-[#5B4B8A] mb-6"
        />

        {/* Pathway selector */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {pathways.map((p, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              onClick={() => setActivePathway(i)}
              className="p-4 rounded-xl text-left transition-all duration-500"
              style={{
                backgroundColor: activePathway === i ? `${p.color}15` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${activePathway === i ? `${p.color}50` : 'rgba(255,255,255,0.04)'}`,
                transform: activePathway === i ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              <p.icon className="w-6 h-6 mb-2" style={{ color: p.color }} />
              <span className="text-[#E8E4D9] text-[0.9rem] block">{p.label}</span>
              <span className="text-[#E8E4D9]/60 text-[0.7rem]">{p.desc}</span>
            </motion.button>
          ))}
        </div>

        {/* Active pathway details */}
        <motion.div
          key={activePathway}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Details */}
          <div className="lg:col-span-2 space-y-2">
            {pathways[activePathway].details.map((detail, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{
                  backgroundColor: `${pathways[activePathway].color}08`,
                  border: `1px solid ${pathways[activePathway].color}15`,
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: pathways[activePathway].color }} />
                <span className="text-[#E8E4D9]/80 text-[0.8rem]">{detail}</span>
              </motion.div>
            ))}
          </div>

          {/* Metrics */}
          <div className="space-y-3">
            <p className="text-[0.65rem] text-[#E8E4D9]/60 uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Target Specifications
            </p>
            {Object.entries(pathways[activePathway].metrics).map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-3 rounded-lg text-center"
                style={{
                  backgroundColor: `${pathways[activePathway].color}10`,
                  border: `1px solid ${pathways[activePathway].color}20`,
                }}
              >
                <span className="text-[0.65rem] text-[#E8E4D9]/40 uppercase block" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {key}
                </span>
                <span className="text-[1rem]" style={{ color: pathways[activePathway].color, fontFamily: "'IBM Plex Mono', monospace" }}>
                  {value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System architecture preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 flex items-center justify-center gap-3 flex-wrap"
        >
          {["CPU", "GPU", "Neuromorphic", "Quantum"].map((label, i) => (
            <motion.div
              key={label}
              className="px-3 py-1.5 rounded-lg text-[0.7rem]"
              style={{
                backgroundColor: ['rgba(232,228,217,0.08)', 'rgba(58,110,165,0.12)', 'rgba(107,162,146,0.12)', 'rgba(91,75,138,0.12)'][i],
                border: `1px solid ${['rgba(232,228,217,0.15)', 'rgba(58,110,165,0.25)', 'rgba(107,162,146,0.25)', 'rgba(91,75,138,0.25)'][i]}`,
                color: ['#E8E4D9', '#3A6EA5', '#6BA292', '#5B4B8A'][i],
                fontFamily: "'IBM Plex Mono', monospace",
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            >
              {label}
            </motion.div>
          ))}
          <span className="text-[0.6rem] text-[#E8E4D9]/50 ml-2">→ Heterogeneous Compute Stack</span>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}