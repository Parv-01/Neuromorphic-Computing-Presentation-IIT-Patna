import { motion } from "motion/react";
import { SlideWrapper } from "../SlideWrapper";

export function Slide14Paradigm({ totalSlides }: { totalSlides: number }) {
  return (
    <SlideWrapper slideNumber={14} totalSlides={totalSlides}>
      <div className="max-w-4xl mx-auto flex flex-col justify-center h-full">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          The Next Computing Revolution
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-gradient-to-r from-[#3A6EA5] via-[#6BA292] to-[#5B4B8A] mb-10"
        />

        {/* Key message blocks */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl bg-[#3A6EA5]/8 border border-[#3A6EA5]/20"
          >
            <p className="text-[#E8E4D9] mb-2" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
              We are not replacing classical computing.
            </p>
            <p className="text-[#3A6EA5]" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
              We are extending the computing stack.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-xl bg-[#6BA292]/8 border border-[#6BA292]/20"
          >
            <p className="text-[#E8E4D9] mb-2" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
              The future is <span className="text-[#6BA292]">Heterogeneous Intelligence</span>.
            </p>
            <p className="text-[#E8E4D9]/70 text-[0.85rem]">
              Different compute substrates for different problem classes — unified by a common software abstraction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-6 rounded-xl bg-[#5B4B8A]/8 border border-[#5B4B8A]/20"
          >
            <p className="text-[#E8E4D9] mb-2" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
              The key metric becomes:
            </p>
            <p className="text-[#5B4B8A]" style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)", fontFamily: "'IBM Plex Mono', monospace" }}>
              Energy per Intelligence
            </p>
            <p className="text-[#E8E4D9]/65 text-[0.75rem] mt-2">
              Not FLOPS, not parameters, not benchmark accuracy — but intelligence delivered per joule consumed.
            </p>
          </motion.div>
        </div>

        {/* Visual timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex items-center gap-4 justify-center"
        >
          {[
            { era: "Sequential", tech: "CPU", color: "#E8E4D9", opacity: 0.3 },
            { era: "Parallel", tech: "GPU", color: "#3A6EA5", opacity: 0.5 },
            { era: "Neural", tech: "Neuromorphic", color: "#6BA292", opacity: 0.8 },
            { era: "Quantum", tech: "QPU", color: "#5B4B8A", opacity: 0.8 },
            { era: "Heterogeneous", tech: "All", color: "#E8E4D9", opacity: 1 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: item.opacity }}
              transition={{ delay: 1.4 + i * 0.2 }}
            >
              <div
                className="w-3 h-3 rounded-full mb-1"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[0.6rem]" style={{ color: item.color, fontFamily: "'IBM Plex Mono', monospace" }}>
                {item.era}
              </span>
              <span className="text-[0.5rem] text-[#E8E4D9]/50">
                {item.tech}
              </span>
              {i < 4 && (
                <motion.div
                  className="absolute"
                  style={{ marginLeft: '2rem' }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideWrapper>
  );
}