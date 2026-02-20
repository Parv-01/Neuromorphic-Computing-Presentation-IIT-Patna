import { motion } from "motion/react";
import { type ReactNode } from "react";

interface SlideWrapperProps {
  children: ReactNode;
  slideNumber: number;
  totalSlides: number;
}

export function SlideWrapper({ children, slideNumber, totalSlides }: SlideWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ fontFamily: "'Inter', 'IBM Plex Sans', sans-serif" }}
    >
      <div className="flex-1 overflow-y-auto px-8 py-6 md:px-16 md:py-10 lg:px-24 lg:py-12">
        {children}
      </div>
      <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 py-3 border-t border-[#C9A84C]/20">
        <span className="text-[11px] tracking-wider text-[#C9A84C]/60 uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          Neuromorphic Computing <span className="text-[#E8E4D9]/50 mx-1">·</span> <span className="text-[#E8E4D9]/60">Parv Agarwal</span>
        </span>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: totalSlides }, (_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === slideNumber - 1 ? '#C9A84C' : 'rgba(232,228,217,0.25)',
                  transform: i === slideNumber - 1 ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
          <span className="text-[11px] ml-3 text-[#E8E4D9]/60" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {slideNumber}/{totalSlides}
          </span>
        </div>
      </div>
    </motion.div>
  );
}