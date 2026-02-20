import { motion } from "motion/react";
import { useState } from "react";
import { SlideWrapper } from "../SlideWrapper";
import { AlertTriangle, Cpu, HardDrive, Zap, ArrowLeftRight } from "lucide-react";

const crisisPoints = [
  { icon: AlertTriangle, label: "End of Moore's Law", desc: "Transistor density approaching atomic limits — 2nm and below face quantum tunneling effects" },
  { icon: Zap, label: "End of Dennard Scaling", desc: "Power density no longer decreases with smaller transistors — thermal wall reached" },
  { icon: HardDrive, label: "Memory Wall", desc: "Memory access speed grows 10x slower than compute speed — data movement dominates energy" },
  { icon: ArrowLeftRight, label: "Von Neumann Bottleneck", desc: "Separation of memory and processing creates fundamental data transfer overhead" },
  { icon: Zap, label: "Energy Inefficiency in AI", desc: "GPT-3 training consumed ~1,287 MWh — equivalent to 120 US homes for a year" },
  { icon: Cpu, label: "GPU Scaling Unsustainable", desc: "Doubling compute every 3.4 months for AI but only 2-year hardware cycle" },
];

export function Slide02Crisis({ totalSlides }: { totalSlides: number }) {
  const [showVonNeumann, setShowVonNeumann] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <SlideWrapper slideNumber={2} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          The Limits of the Classical Paradigm
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-[#3A6EA5] mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Crisis points */}
          <div className="space-y-3">
            {crisisPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: hoveredIdx === i ? 'rgba(58,110,165,0.12)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${hoveredIdx === i ? 'rgba(58,110,165,0.3)' : 'rgba(255,255,255,0.04)'}`,
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <point.icon className="w-5 h-5 text-[#3A6EA5] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#E8E4D9] block" style={{ fontSize: "0.9rem" }}>{point.label}</span>
                  <motion.span
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredIdx === i ? "auto" : 0,
                      opacity: hoveredIdx === i ? 1 : 0,
                    }}
                    className="text-[#E8E4D9]/70 block overflow-hidden"
                    style={{ fontSize: "0.78rem" }}
                  >
                    {point.desc}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Von Neumann architecture toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <button
              onClick={() => setShowVonNeumann(!showVonNeumann)}
              className="mb-4 px-4 py-1.5 rounded-full text-[0.75rem] transition-all duration-300"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                backgroundColor: 'rgba(58,110,165,0.15)',
                color: '#3A6EA5',
                border: '1px solid rgba(58,110,165,0.3)',
              }}
            >
              {showVonNeumann ? "Von Neumann Architecture" : "Show CPU–Memory Separation"}
            </button>

            <div className="w-full max-w-sm relative">
              {showVonNeumann ? (
                <VonNeumannDiagram />
              ) : (
                <BottleneckDiagram />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function VonNeumannDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="p-4 rounded-xl border border-[#3A6EA5]/30 bg-[#3A6EA5]/10 w-full text-center">
        <Cpu className="w-8 h-8 text-[#3A6EA5] mx-auto mb-2" />
        <span className="text-[#E8E4D9] text-[0.85rem]">CPU (Processing Unit)</span>
        <div className="flex justify-center gap-4 mt-2 text-[0.7rem] text-[#E8E4D9]/70">
          <span>ALU</span>
          <span>Control Unit</span>
          <span>Registers</span>
        </div>
      </div>

      {/* Bottleneck arrow */}
      <motion.div
        className="flex flex-col items-center"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-6 bg-gradient-to-b from-[#3A6EA5] to-red-500" />
        <span className="text-[0.6rem] text-red-400/80 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          BOTTLENECK
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-red-500 to-[#6BA292]" />
      </motion.div>

      <div className="p-4 rounded-xl border border-[#6BA292]/30 bg-[#6BA292]/10 w-full text-center">
        <HardDrive className="w-8 h-8 text-[#6BA292] mx-auto mb-2" />
        <span className="text-[#E8E4D9] text-[0.85rem]">Memory (Separate Unit)</span>
        <div className="flex justify-center gap-4 mt-2 text-[0.7rem] text-[#E8E4D9]/70">
          <span>Data</span>
          <span>Instructions</span>
        </div>
      </div>

      <p className="text-center text-[0.7rem] text-[#E8E4D9]/60 mt-2 max-w-xs">
        Data must travel between CPU and memory for every operation — the fundamental Von Neumann bottleneck
      </p>
    </motion.div>
  );
}

function BottleneckDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4 py-4"
    >
      <div className="relative w-full h-48 flex items-center justify-center">
        {/* Data flow animation */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-red-400"
            animate={{
              y: [-80, 80],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear",
            }}
          />
        ))}

        <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#3A6EA5]/20 border border-[#3A6EA5]/30 rounded-lg">
          <span className="text-[#3A6EA5] text-[0.8rem]">CPU</span>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#6BA292]/20 border border-[#6BA292]/30 rounded-lg">
          <span className="text-[#6BA292] text-[0.8rem]">Memory</span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-[#3A6EA5]/20 via-red-500/30 to-[#6BA292]/20" />
      </div>

      <div className="grid grid-cols-3 gap-2 w-full text-center">
        <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
          <span className="text-[0.65rem] text-red-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>~100 GB/s</span>
          <br />
          <span className="text-[0.6rem] text-[#E8E4D9]/60">Bandwidth</span>
        </div>
        <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
          <span className="text-[0.65rem] text-red-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>~100ns</span>
          <br />
          <span className="text-[0.6rem] text-[#E8E4D9]/60">Latency</span>
        </div>
        <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
          <span className="text-[0.65rem] text-red-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>~65%</span>
          <br />
          <span className="text-[0.6rem] text-[#E8E4D9]/60">Energy on Data</span>
        </div>
      </div>
    </motion.div>
  );
}