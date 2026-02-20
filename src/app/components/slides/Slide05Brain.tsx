import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { SlideWrapper } from "../SlideWrapper";

const brainProperties = [
  { label: "Massively Parallel", value: "~86 billion neurons, ~100 trillion synapses" },
  { label: "Event-Driven", value: "Neurons fire only when threshold is reached — sparse activation" },
  { label: "Collocated Memory & Processing", value: "Synapses store and compute simultaneously" },
  { label: "Stochastic", value: "Inherent noise used for exploration, not a bug" },
  { label: "Energy Efficient", value: "~20 Watts for all cognition, perception, motor control" },
];

const comparisonTable = [
  { property: "Architecture", vonNeumann: "Sequential / pipelined", neuromorphic: "Massively parallel" },
  { property: "Memory Model", vonNeumann: "Separate (RAM)", neuromorphic: "In-compute (synaptic)" },
  { property: "Communication", vonNeumann: "Clock-driven bus", neuromorphic: "Event-driven spikes" },
  { property: "Data Encoding", vonNeumann: "Binary / floating-point", neuromorphic: "Spike timing / rate" },
  { property: "Computation", vonNeumann: "Deterministic", neuromorphic: "Stochastic" },
  { property: "Energy", vonNeumann: "~250W (CPU)", neuromorphic: "~20W (brain)" },
  { property: "Learning", vonNeumann: "Software (backprop)", neuromorphic: "Hardware (plasticity)" },
];

export function Slide05Brain({ totalSlides }: { totalSlides: number }) {
  const [showTable, setShowTable] = useState(false);

  return (
    <SlideWrapper slideNumber={5} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          Biological Computation Principles
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-[#6BA292] mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Neural diagram */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <NeuralDiagram />
          </motion.div>

          {/* Properties */}
          <div className="space-y-3">
            <p className="text-[0.75rem] text-[#E8E4D9]/70 mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              KEY PROPERTIES OF BIOLOGICAL COMPUTATION
            </p>
            {brainProperties.map((prop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="p-3 rounded-lg bg-[#6BA292]/5 border border-[#6BA292]/10 hover:border-[#6BA292]/30 transition-all group"
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6BA292]" />
                  <span className="text-[#E8E4D9] text-[0.85rem]">{prop.label}</span>
                </div>
                <span className="text-[#E8E4D9]/60 text-[0.72rem] pl-3.5 block opacity-0 group-hover:opacity-100 transition-opacity">
                  {prop.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison table toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6"
        >
          <button
            onClick={() => setShowTable(!showTable)}
            className="px-4 py-1.5 rounded-full text-[0.72rem] transition-all"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              backgroundColor: showTable ? 'rgba(107,162,146,0.2)' : 'rgba(107,162,146,0.1)',
              color: '#6BA292',
              border: '1px solid rgba(107,162,146,0.3)',
            }}
          >
            {showTable ? "Hide" : "Show"} Comparison Table
          </button>

          {showTable && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 overflow-x-auto"
            >
              <table className="w-full text-[0.75rem]">
                <thead>
                  <tr className="border-b border-[#E8E4D9]/10">
                    <th className="text-left py-2 px-3 text-[#E8E4D9]/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Property</th>
                    <th className="text-left py-2 px-3 text-[#3A6EA5]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Von Neumann</th>
                    <th className="text-left py-2 px-3 text-[#6BA292]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Neuromorphic</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, i) => (
                    <tr key={i} className="border-b border-[#E8E4D9]/5 hover:bg-[#E8E4D9]/3 transition-colors">
                      <td className="py-2 px-3 text-[#E8E4D9]/90">{row.property}</td>
                      <td className="py-2 px-3 text-[#E8E4D9]/70">{row.vonNeumann}</td>
                      <td className="py-2 px-3 text-[#6BA292]/90">{row.neuromorphic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </motion.div>
      </div>
    </SlideWrapper>
  );
}

function NeuralDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    // Draw a simplified neuron
    const cx = 200;
    const cy = 150;

    // Dendrites
    const dendrites = [
      { x: 50, y: 40 },
      { x: 30, y: 120 },
      { x: 60, y: 200 },
      { x: 40, y: 260 },
    ];

    ctx.strokeStyle = "rgba(107,162,146,0.5)";
    ctx.lineWidth = 2;
    for (const d of dendrites) {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.bezierCurveTo(d.x + 40, d.y + 10, cx - 60, cy - 20, cx - 30, cy);
      ctx.stroke();

      // Dendrite dots
      ctx.beginPath();
      ctx.fillStyle = "rgba(107,162,146,0.8)";
      ctx.arc(d.x, d.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cell body (soma)
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
    grad.addColorStop(0, "rgba(58,110,165,0.6)");
    grad.addColorStop(1, "rgba(58,110,165,0.1)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 35, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(58,110,165,0.5)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Nucleus
    ctx.beginPath();
    ctx.fillStyle = "rgba(232,228,217,0.3)";
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fill();

    // Axon
    ctx.beginPath();
    ctx.strokeStyle = "rgba(91,75,138,0.6)";
    ctx.lineWidth = 3;
    ctx.moveTo(cx + 35, cy);
    ctx.bezierCurveTo(cx + 80, cy - 10, cx + 120, cy + 20, cx + 160, cy);
    ctx.stroke();

    // Axon terminals
    const terminals = [
      { x: cx + 160, y: cy - 20 },
      { x: cx + 170, y: cy },
      { x: cx + 160, y: cy + 20 },
    ];

    for (const t of terminals) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(91,75,138,0.4)";
      ctx.lineWidth = 1.5;
      ctx.moveTo(cx + 145, cy);
      ctx.lineTo(t.x, t.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "rgba(91,75,138,0.7)";
      ctx.arc(t.x, t.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Labels
    ctx.fillStyle = "rgba(232,228,217,0.7)";
    ctx.font = "10px 'IBM Plex Mono', monospace";
    ctx.fillText("Dendrites", 10, 30);
    ctx.fillText("Soma", cx - 15, cy + 55);
    ctx.fillText("Axon", cx + 80, cy - 20);
    ctx.fillText("Synapses", cx + 140, cy - 30);

    // Signal arrows
    ctx.fillStyle = "rgba(107,162,146,0.8)";
    ctx.font = "9px 'IBM Plex Mono', monospace";
    ctx.fillText("input signals →", 10, 280);
    ctx.fillStyle = "rgba(91,75,138,0.8)";
    ctx.fillText("→ output spikes", cx + 130, cy + 45);
  }, []);

  return (
    <div className="bg-[rgba(255,255,255,0.03)] rounded-xl border border-[#3A6EA5]/10 p-4">
      <canvas ref={canvasRef} className="w-full h-auto" style={{ maxWidth: 400 }} />
      <p className="text-[0.65rem] text-[#E8E4D9]/50 text-center mt-2">
        Biological neuron: input → integration → threshold → spike
      </p>
    </div>
  );
}