import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Spike {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  active: boolean;
}

export function NeuralBackground({ opacity = 0.15 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const spikesRef = useRef<Spike[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodeCount = 60;
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }
    nodesRef.current = nodes;

    const spikes: Spike[] = [];
    spikesRef.current = spikes;

    let lastSpikeTime = 0;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += node.pulseSpeed;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }

      // Draw connections
      const maxDist = 180;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(90, 160, 210, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Spawn spikes
      if (time - lastSpikeTime > 200) {
        const fromIdx = Math.floor(Math.random() * nodes.length);
        let toIdx = Math.floor(Math.random() * nodes.length);
        if (toIdx === fromIdx) toIdx = (toIdx + 1) % nodes.length;
        const dx = nodes[fromIdx].x - nodes[toIdx].x;
        const dy = nodes[fromIdx].y - nodes[toIdx].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist * 1.5) {
          spikes.push({
            fromIdx,
            toIdx,
            progress: 0,
            speed: 0.02 + Math.random() * 0.02,
            active: true,
          });
        }
        lastSpikeTime = time;
      }

      // Draw and update spikes
      for (const spike of spikes) {
        if (!spike.active) continue;
        spike.progress += spike.speed;
        if (spike.progress >= 1) {
          spike.active = false;
          continue;
        }
        const from = nodes[spike.fromIdx];
        const to = nodes[spike.toIdx];
        const x = from.x + (to.x - from.x) * spike.progress;
        const y = from.y + (to.y - from.y) * spike.progress;

        ctx.beginPath();
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 6);
        grad.addColorStop(0, "rgba(140, 195, 165, 0.8)");
        grad.addColorStop(1, "rgba(140, 195, 165, 0)");
        ctx.fillStyle = grad;
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Clean up dead spikes
      spikesRef.current = spikes.filter((s) => s.active);

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
        const r = node.radius + pulse * 1.5;
        ctx.beginPath();
        const grad = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          r * 2
        );
        grad.addColorStop(0, `rgba(90, 160, 210, ${0.6 + pulse * 0.4})`);
        grad.addColorStop(1, "rgba(90, 160, 210, 0)");
        ctx.fillStyle = grad;
        ctx.arc(node.x, node.y, r * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(232, 228, 217, ${0.4 + pulse * 0.4})`;
        ctx.arc(node.x, node.y, r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity, zIndex: 0 }}
    />
  );
}