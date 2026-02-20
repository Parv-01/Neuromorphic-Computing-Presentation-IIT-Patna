import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { SlideWrapper } from "../SlideWrapper";

const paradigms = [
  {
    id: "backprop",
    label: "Spike-based Backprop",
    color: "#3A6EA5",
    desc: "Adapts backpropagation for spiking networks using surrogate gradients to handle non-differentiable spike functions.",
    details: [
      "Uses surrogate gradient functions to approximate spike derivatives",
      "Enables deep SNN training with temporal credit assignment",
      "Achieves near-state-of-art on CIFAR-10, DVS-Gesture",
      "Challenge: High memory footprint during training",
    ],
  },
  {
    id: "conversion",
    label: "DNN → SNN Conversion",
    color: "#6BA292",
    desc: "Trains a conventional DNN, then converts learned weights to spike-compatible format for neuromorphic deployment.",
    details: [
      "Train ANN with standard tools (PyTorch, TensorFlow)",
      "Map ReLU activations to spike rates",
      "Deploy on TrueNorth, Loihi, SpiNNaker",
      "Trade-off: conversion accuracy vs. latency (more timesteps = higher accuracy)",
    ],
  },
  {
    id: "reservoir",
    label: "Reservoir Computing",
    color: "#5B4B8A",
    desc: "A recurrent network with fixed random connections (reservoir) and only a trained readout layer.",
    details: [
      "Reservoir provides high-dimensional temporal kernel",
      "Only readout layer is trained — simple, fast learning",
      "Ideal for temporal pattern recognition",
      "Maps naturally to neuromorphic hardware topology",
    ],
  },
  {
    id: "evolutionary",
    label: "Evolutionary Approaches",
    color: "#E8E4D9",
    desc: "Uses evolutionary algorithms to optimize network topology, weights, and neuron parameters simultaneously.",
    details: [
      "EONS: Evolutionary Optimization for Neuromorphic Systems",
      "Co-evolves structure and parameters",
      "No gradient computation needed",
      "Can discover novel architectures not found by gradient methods",
    ],
  },
  {
    id: "stdp",
    label: "STDP",
    color: "#6BA292",
    desc: "Spike-Timing-Dependent Plasticity — a biologically observed learning rule that adjusts synapse strength based on relative spike timing.",
    details: [
      "Pre-before-post spike → strengthen synapse (LTP)",
      "Post-before-pre spike → weaken synapse (LTD)",
      "Purely local learning rule — no global signals needed",
      "Hardware-friendly: can be implemented in analog circuits",
    ],
  },
];

export function Slide08Learning({ totalSlides }: { totalSlides: number }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SlideWrapper slideNumber={8} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          Algorithms in Neuromorphic Systems
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-[#3A6EA5] mb-6"
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {paradigms.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              onClick={() => setActiveTab(i)}
              className="px-3 py-1.5 rounded-full text-[0.72rem] transition-all duration-300"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                backgroundColor: activeTab === i ? `${p.color}25` : 'rgba(255,255,255,0.03)',
                color: activeTab === i ? p.color : 'rgba(232,228,217,0.7)',
                border: `1px solid ${activeTab === i ? `${p.color}50` : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {p.label}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-5 rounded-xl"
            style={{
              backgroundColor: `${paradigms[activeTab].color}08`,
              border: `1px solid ${paradigms[activeTab].color}20`,
            }}
          >
            <h3 className="text-[#E8E4D9] mb-2" style={{ fontSize: "1.1rem", color: paradigms[activeTab].color }}>
              {paradigms[activeTab].label}
            </h3>
            <p className="text-[#E8E4D9]/80 text-[0.8rem] mb-4">{paradigms[activeTab].desc}</p>
            <ul className="space-y-2">
              {paradigms[activeTab].details.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex items-start gap-2 text-[0.75rem] text-[#E8E4D9]/70"
                >
                  <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: paradigms[activeTab].color }} />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* STDP timing diagram */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {activeTab === 4 ? (
              <STDPDiagram />
            ) : (
              <SpikeRaster activeTab={activeTab} />
            )}
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function STDPDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 280;

    const cx = 200;
    const cy = 140;

    // Axes
    ctx.strokeStyle = "rgba(232,228,217,0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, cy);
    ctx.lineTo(360, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, 20);
    ctx.lineTo(cx, 260);
    ctx.stroke();

    // Labels
    ctx.fillStyle = "rgba(232,228,217,0.7)";
    ctx.font = "10px 'IBM Plex Mono', monospace";
    ctx.fillText("Δt (post - pre)", 310, cy - 8);
    ctx.fillText("Δw", cx + 8, 30);
    ctx.fillText("LTP", cx + 40, 55);
    ctx.fillText("(strengthen)", cx + 40, 68);
    ctx.fillText("LTD", cx - 110, 220);
    ctx.fillText("(weaken)", cx - 90, 233);

    // STDP curve - positive side (LTP)
    ctx.beginPath();
    ctx.strokeStyle = "#6BA292";
    ctx.lineWidth = 2;
    for (let x = 0; x <= 150; x++) {
      const t = x / 150;
      const y = 100 * Math.exp(-t * 3);
      const px = cx + x;
      const py = cy - y;
      if (x === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // STDP curve - negative side (LTD)
    ctx.beginPath();
    ctx.strokeStyle = "#d4183d";
    ctx.lineWidth = 2;
    for (let x = 0; x <= 150; x++) {
      const t = x / 150;
      const y = 60 * Math.exp(-t * 3);
      const px = cx - x;
      const py = cy + y;
      if (x === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Zero line label
    ctx.fillStyle = "rgba(232,228,217,0.5)";
    ctx.fillText("0", cx + 5, cy + 15);

    // Pre-before-post arrow
    ctx.fillStyle = "rgba(107,162,146,0.8)";
    ctx.fillText("pre → post", cx + 20, cy + 30);
    ctx.fillStyle = "rgba(212,24,61,0.8)";
    ctx.fillText("post → pre", cx - 100, cy + 30);
  }, []);

  return (
    <div className="bg-[rgba(255,255,255,0.03)] rounded-xl border border-[#6BA292]/10 p-4">
      <p className="text-[0.7rem] text-[#E8E4D9]/60 mb-2 uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        STDP Learning Window
      </p>
      <canvas ref={canvasRef} className="w-full h-auto" style={{ maxWidth: 400 }} />
      <p className="text-[0.6rem] text-[#E8E4D9]/50 text-center mt-2">
        Synaptic weight change (Δw) as function of spike timing difference (Δt)
      </p>
    </div>
  );
}

function SpikeRaster({ activeTab }: { activeTab: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 280;

    const numNeurons = 12;
    const spikeTrains: number[][] = [];
    for (let i = 0; i < numNeurons; i++) {
      const spikes: number[] = [];
      const rate = 0.02 + Math.random() * 0.05;
      for (let t = 0; t < 400; t++) {
        if (Math.random() < rate) spikes.push(t);
      }
      spikeTrains.push(spikes);
    }

    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      offset += 0.5;
      if (offset > 200) offset = 0;

      // Background grid
      ctx.strokeStyle = "rgba(232,228,217,0.03)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < numNeurons; i++) {
        const y = 20 + i * 20;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(400, y);
        ctx.stroke();
      }

      // Draw spikes
      const colors = ["#3A6EA5", "#6BA292", "#5B4B8A", "#E8E4D9"];
      for (let i = 0; i < numNeurons; i++) {
        const y = 20 + i * 20;
        const color = colors[i % colors.length];
        for (const t of spikeTrains[i]) {
          const x = ((t + offset) % 400);
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.moveTo(x, y - 7);
          ctx.lineTo(x, y + 7);
          ctx.stroke();
        }
      }

      // Labels
      ctx.fillStyle = "rgba(232,228,217,0.5)";
      ctx.font = "9px 'IBM Plex Mono', monospace";
      for (let i = 0; i < numNeurons; i++) {
        ctx.fillText(`N${i}`, 2, 24 + i * 20);
      }
      ctx.fillText("Time →", 350, 270);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [activeTab]);

  return (
    <div className="bg-[rgba(255,255,255,0.03)] rounded-xl border border-[#3A6EA5]/10 p-4">
      <p className="text-[0.7rem] text-[#E8E4D9]/60 mb-2 uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        Spike Raster Visualization
      </p>
      <canvas ref={canvasRef} className="w-full h-auto" style={{ maxWidth: 400 }} />
      <p className="text-[0.6rem] text-[#E8E4D9]/50 text-center mt-2">
        Each row = one neuron | Vertical lines = spike events over time
      </p>
    </div>
  );
}