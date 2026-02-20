import { motion } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { SlideWrapper } from "../SlideWrapper";
import { Zap, Clock, Radio, Settings } from "lucide-react";

const features = [
  { icon: Zap, label: "Event-Driven", desc: "Neurons compute only when input spikes arrive — no wasted cycles" },
  { icon: Clock, label: "Asynchronous", desc: "No global clock — each neuron operates on its own timeline" },
  { icon: Radio, label: "Spike-Based Communication", desc: "Information encoded in timing and frequency of binary spikes" },
  { icon: Settings, label: "Hardware-Software Co-Design", desc: "Algorithms designed together with physical substrate" },
];

interface SpikeNeuron {
  x: number;
  y: number;
  potential: number;
  threshold: number;
  firing: boolean;
  connections: number[];
  lastSpikeTime: number;
}

export function Slide06IntroNeuro({ totalSlides }: { totalSlides: number }) {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <SlideWrapper slideNumber={6} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          What Is Neuromorphic Computing?
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-[#3A6EA5] mb-4"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl bg-[#3A6EA5]/8 border border-[#3A6EA5]/15 mb-6"
        >
          <p className="text-[0.8rem] text-[#E8E4D9]/85 italic">
            "A non-von Neumann computing paradigm based on spiking neural network architectures, where neuron and synapse models are implemented in hardware to achieve brain-inspired computation."
          </p>
          <p className="text-[0.65rem] text-[#3A6EA5]/80 mt-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            — Schuman et al.,{" "}
            <a
              href="https://www.nature.com/articles/s43588-021-00184-y"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#3A6EA5]/40 hover:text-[#3A6EA5] transition-colors"
            >
              Nature Computational Science (2022)
            </a>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-[0.7rem] text-[#E8E4D9]/60 mb-3 uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Core Features
            </p>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-3 rounded-lg cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: activeFeature === i ? 'rgba(58,110,165,0.12)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${activeFeature === i ? 'rgba(58,110,165,0.4)' : 'rgba(255,255,255,0.04)'}`,
                  }}
                  onMouseEnter={() => setActiveFeature(i)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <feat.icon className="w-5 h-5 text-[#3A6EA5] mb-2" />
                  <span className="text-[0.8rem] text-[#E8E4D9] block">{feat.label}</span>
                  <motion.span
                    className="text-[0.68rem] text-[#E8E4D9]/60 block overflow-hidden"
                    animate={{
                      height: activeFeature === i ? "auto" : 0,
                      opacity: activeFeature === i ? 1 : 0,
                    }}
                  >
                    {feat.desc}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interactive spike network */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[0.7rem] text-[#E8E4D9]/60 mb-2 uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Click neurons to trigger spikes
            </p>
            <SpikeNetwork />
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}

function SpikeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neuronsRef = useRef<SpikeNeuron[]>([]);
  const spikesRef = useRef<{ fromIdx: number; toIdx: number; progress: number; speed: number }[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const initNeurons = useCallback(() => {
    const neurons: SpikeNeuron[] = [];
    const positions = [
      { x: 60, y: 60 }, { x: 160, y: 40 }, { x: 260, y: 70 },
      { x: 50, y: 150 }, { x: 150, y: 130 }, { x: 250, y: 150 },
      { x: 340, y: 120 },
      { x: 80, y: 230 }, { x: 180, y: 220 }, { x: 280, y: 240 },
      { x: 340, y: 210 },
    ];
    for (let i = 0; i < positions.length; i++) {
      const connections: number[] = [];
      for (let j = 0; j < positions.length; j++) {
        if (i === j) continue;
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 160) connections.push(j);
      }
      neurons.push({
        ...positions[i],
        potential: 0,
        threshold: 0.8,
        firing: false,
        connections,
        lastSpikeTime: -1000,
      });
    }
    neuronsRef.current = neurons;
  }, []);

  useEffect(() => {
    initNeurons();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 280;

    const animate = () => {
      timeRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const neurons = neuronsRef.current;
      const spikes = spikesRef.current;

      // Draw connections
      for (const neuron of neurons) {
        for (const connIdx of neuron.connections) {
          const target = neurons[connIdx];
          ctx.beginPath();
          ctx.strokeStyle = "rgba(58,110,165,0.08)";
          ctx.lineWidth = 0.5;
          ctx.moveTo(neuron.x, neuron.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        }
      }

      // Update and draw spikes
      for (let i = spikes.length - 1; i >= 0; i--) {
        const spike = spikes[i];
        spike.progress += spike.speed;
        if (spike.progress >= 1) {
          // Spike arrived — add to target's potential
          const target = neurons[spike.toIdx];
          target.potential += 0.35;
          if (target.potential >= target.threshold && !target.firing) {
            target.firing = true;
            target.lastSpikeTime = timeRef.current;
            target.potential = 0;
            for (const connIdx of target.connections) {
              spikes.push({
                fromIdx: spike.toIdx,
                toIdx: connIdx,
                progress: 0,
                speed: 0.03 + Math.random() * 0.02,
              });
            }
          }
          spikes.splice(i, 1);
          continue;
        }

        const from = neurons[spike.fromIdx];
        const to = neurons[spike.toIdx];
        const x = from.x + (to.x - from.x) * spike.progress;
        const y = from.y + (to.y - from.y) * spike.progress;

        ctx.beginPath();
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 5);
        grad.addColorStop(0, "rgba(107,162,146,0.9)");
        grad.addColorStop(1, "rgba(107,162,146,0)");
        ctx.fillStyle = grad;
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw neurons
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        const timeSinceSpike = timeRef.current - n.lastSpikeTime;
        const isFiring = timeSinceSpike < 15;

        if (isFiring) {
          // Firing glow
          ctx.beginPath();
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 25);
          glow.addColorStop(0, `rgba(107,162,146,${0.5 * (1 - timeSinceSpike / 15)})`);
          glow.addColorStop(1, "rgba(107,162,146,0)");
          ctx.fillStyle = glow;
          ctx.arc(n.x, n.y, 25, 0, Math.PI * 2);
          ctx.fill();
        }

        // Potential fill
        ctx.beginPath();
        ctx.fillStyle = `rgba(58,110,165,${0.2 + n.potential * 0.6})`;
        ctx.arc(n.x, n.y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.beginPath();
        ctx.strokeStyle = isFiring ? "rgba(107,162,146,0.8)" : "rgba(58,110,165,0.4)";
        ctx.lineWidth = isFiring ? 2 : 1;
        ctx.arc(n.x, n.y, 12, 0, Math.PI * 2);
        ctx.stroke();

        // Reset firing
        if (timeSinceSpike > 15) n.firing = false;
        // Leak potential
        n.potential *= 0.995;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [initNeurons]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    const neurons = neuronsRef.current;
    for (let i = 0; i < neurons.length; i++) {
      const dx = neurons[i].x - mx;
      const dy = neurons[i].y - my;
      if (Math.sqrt(dx * dx + dy * dy) < 20) {
        neurons[i].firing = true;
        neurons[i].lastSpikeTime = timeRef.current;
        neurons[i].potential = 0;
        for (const connIdx of neurons[i].connections) {
          spikesRef.current.push({
            fromIdx: i,
            toIdx: connIdx,
            progress: 0,
            speed: 0.03 + Math.random() * 0.02,
          });
        }
        break;
      }
    }
  };

  return (
    <div className="bg-[rgba(255,255,255,0.03)] rounded-xl border border-[#3A6EA5]/10 p-3">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="w-full h-auto cursor-pointer"
        style={{ maxWidth: 400 }}
      />
      <p className="text-[0.6rem] text-[#E8E4D9]/50 text-center mt-1">
        Neurons accumulate potential from incoming spikes → fire when threshold reached → propagate
      </p>
    </div>
  );
}