import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { SlideWrapper } from "../SlideWrapper";
import { Network, Shuffle, Puzzle, Binary, CheckSquare } from "lucide-react";

const applications = [
  { icon: Network, label: "Graph Algorithms", desc: "Shortest path, graph search, and network analysis using spike propagation as natural graph traversal", color: "#3A6EA5" },
  { icon: Shuffle, label: "Random Walks", desc: "Stochastic spike emission naturally implements random walks on graph structures", color: "#6BA292" },
  { icon: Puzzle, label: "NP-Complete Approximations", desc: "Parallel spike dynamics can explore solution spaces for hard combinatorial problems", color: "#5B4B8A" },
  { icon: Binary, label: "QUBO Problems", desc: "Quadratic Unconstrained Binary Optimization — TrueNorth demonstrated efficient QUBO solving", color: "#E8E4D9" },
  { icon: CheckSquare, label: "Constraint Satisfaction", desc: "Loihi solved SAT problems using neural dynamics as constraint propagation", color: "#6BA292" },
];

export function Slide09NonML({ totalSlides }: { totalSlides: number }) {
  const [activeApp, setActiveApp] = useState(0);

  return (
    <SlideWrapper slideNumber={9} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          Non-ML Applications: A Paradigm Shift
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-[#6BA292] mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => setActiveApp(i)}
                className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: activeApp === i ? `${app.color}15` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${activeApp === i ? `${app.color}40` : 'rgba(255,255,255,0.04)'}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${app.color}15` }}
                >
                  <app.icon className="w-4 h-4" style={{ color: app.color }} />
                </div>
                <div>
                  <span className="text-[#E8E4D9] text-[0.85rem]">{app.label}</span>
                  {activeApp === i && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-[#E8E4D9]/70 text-[0.72rem] block mt-1"
                    >
                      {app.desc}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Hardware highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-3 mt-3"
            >
              <div className="p-3 rounded-lg bg-[#3A6EA5]/10 border border-[#3A6EA5]/20 flex-1">
                <span className="text-[0.65rem] text-[#3A6EA5] block mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>TrueNorth</span>
                <span className="text-[0.72rem] text-[#E8E4D9]/70">QUBO solving at 26pJ/op</span>
              </div>
              <div className="p-3 rounded-lg bg-[#6BA292]/10 border border-[#6BA292]/20 flex-1">
                <span className="text-[0.65rem] text-[#6BA292] block mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Loihi</span>
                <span className="text-[0.72rem] text-[#E8E4D9]/70">SAT solving with neural dynamics</span>
              </div>
            </motion.div>
          </div>

          {/* Graph visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GraphShortestPath />
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function GraphShortestPath() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 320;

    const nodes = [
      { x: 50, y: 50, label: "A" },
      { x: 180, y: 30, label: "B" },
      { x: 320, y: 60, label: "C" },
      { x: 100, y: 160, label: "D" },
      { x: 250, y: 150, label: "E" },
      { x: 350, y: 180, label: "F" },
      { x: 60, y: 260, label: "G" },
      { x: 200, y: 270, label: "H" },
      { x: 340, y: 280, label: "I" },
    ];

    const edges = [
      [0, 1, 4], [0, 3, 2], [1, 2, 3], [1, 4, 5],
      [2, 5, 1], [3, 4, 6], [3, 6, 3], [4, 5, 2],
      [4, 7, 4], [5, 8, 3], [6, 7, 5], [7, 8, 2],
    ];

    // Shortest path from A to I: A→D→G→H→I
    const shortestPath = [0, 3, 6, 7, 8];
    const shortestEdges = [[0, 3], [3, 6], [6, 7], [7, 8]];

    let spikeProgress = 0;
    let currentEdge = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw all edges
      for (const [from, to, weight] of edges) {
        const isOnPath = shortestEdges.some(([a, b]) => (a === from && b === to) || (a === to && b === from));
        ctx.beginPath();
        ctx.strokeStyle = isOnPath ? "rgba(107,162,146,0.5)" : "rgba(58,110,165,0.15)";
        ctx.lineWidth = isOnPath ? 2 : 1;
        ctx.moveTo(nodes[from].x, nodes[from].y);
        ctx.lineTo(nodes[to].x, nodes[to].y);
        ctx.stroke();

        // Weight label
        const mx = (nodes[from].x + nodes[to].x) / 2;
        const my = (nodes[from].y + nodes[to].y) / 2;
        ctx.fillStyle = "rgba(232,228,217,0.25)";
        ctx.font = "9px 'IBM Plex Mono', monospace";
        ctx.fillText(String(weight), mx + 3, my - 3);
      }

      // Animate spike along shortest path
      if (currentEdge < shortestEdges.length) {
        const [from, to] = shortestEdges[currentEdge];
        const x = nodes[from].x + (nodes[to].x - nodes[from].x) * spikeProgress;
        const y = nodes[from].y + (nodes[to].y - nodes[from].y) * spikeProgress;

        ctx.beginPath();
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 10);
        grad.addColorStop(0, "rgba(107,162,146,0.9)");
        grad.addColorStop(1, "rgba(107,162,146,0)");
        ctx.fillStyle = grad;
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();

        spikeProgress += 0.015;
        if (spikeProgress >= 1) {
          spikeProgress = 0;
          currentEdge++;
          if (currentEdge >= shortestEdges.length) {
            setTimeout(() => {
              currentEdge = 0;
              spikeProgress = 0;
            }, 1500);
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const isOnPath = shortestPath.includes(i);
        const n = nodes[i];

        ctx.beginPath();
        ctx.fillStyle = isOnPath ? "rgba(107,162,146,0.3)" : "rgba(58,110,165,0.15)";
        ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = isOnPath ? "rgba(107,162,146,0.7)" : "rgba(58,110,165,0.3)";
        ctx.lineWidth = isOnPath ? 2 : 1;
        ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = isOnPath ? "#6BA292" : "rgba(232,228,217,0.6)";
        ctx.font = "12px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);
      }

      // Legend
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(107,162,146,0.6)";
      ctx.font = "10px 'IBM Plex Mono', monospace";
      ctx.fillText("Shortest path: A → D → G → H → I", 20, 315);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="bg-[rgba(255,255,255,0.03)] rounded-xl border border-[#6BA292]/10 p-4">
      <p className="text-[0.7rem] text-[#E8E4D9]/60 mb-2 uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        Neuromorphic Graph Shortest Path
      </p>
      <canvas ref={canvasRef} className="w-full h-auto" style={{ maxWidth: 400 }} />
      <p className="text-[0.6rem] text-[#E8E4D9]/50 text-center mt-2">
        Spike propagation naturally finds shortest paths — neurons as nodes, synapses as weighted edges
      </p>
    </div>
  );
}