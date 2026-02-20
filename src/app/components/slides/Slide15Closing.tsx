import { motion } from "motion/react";
import { SlideWrapper } from "../SlideWrapper";
import { useEffect, useRef } from "react";

export function Slide15Closing({ totalSlides }: { totalSlides: number }) {
  return (
    <SlideWrapper slideNumber={15} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full relative">
        {/* Subtle firing neurons background */}
        <FiringNeuronsCanvas />
      
        {/* Decorative rings */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full border border-[#6BA292]/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[250px] h-[250px] rounded-full border border-[#3A6EA5]/8"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-center relative z-10 max-w-3xl px-4"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#6BA292]/40 to-transparent mx-auto mb-10"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-[#E8E4D9] mb-2"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", lineHeight: 1.3 }}
          >
            "The Brain Does Not Scale FLOPs.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-12"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
              lineHeight: 1.3,
              background: "linear-gradient(135deg, #3A6EA5, #6BA292)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            It Scales Intelligence per Joule."
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#E8E4D9]/20 to-transparent mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="text-[#E8E4D9]/60 mb-12"
            style={{ fontSize: "clamp(1.0rem, 1.2vw, 1rem)", fontFamily: "'IBM Plex Mono', monospace" }}
          >
            The Future of Computing Is Event-Driven.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-1.2rem] text-[#E8E4D9]/40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Thank you
            </span>
            <div className="flex gap-3 mt-2">
              {["#3A6EA5", "#6BA292", "#5B4B8A"].map((color, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-4 text-[10px] text-[#E8E4D9]/50"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Based on Schuman et al.,{" "}
          <a
            href="https://www.nature.com/articles/s43588-021-00184-y"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors"
          >
            Nature Computational Science (2022)
          </a>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}

function FiringNeuronsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resize();

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
    }
    const particles: Particle[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Spawn
      if (Math.random() < 0.1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 0,
          maxLife: 100 + Math.random() * 200,
          size: 1 + Math.random() * 2,
        });
      }
      // Update and draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const t = p.life / p.maxLife;
        const alpha = Math.sin(t * Math.PI) * 0.15;

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0, `rgba(107,162,146,${alpha})`);
        grad.addColorStop(1, "rgba(107,162,146,0)");
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}