import { motion } from "motion/react";
import { SlideWrapper } from "../SlideWrapper";
import labLogo from "../../assets/lab-logo.png";

const PAPER_URL = "https://www.nature.com/articles/s43588-021-00184-y";

export function Slide01Title({ totalSlides }: { totalSlides: number }) {
  return (
    <SlideWrapper slideNumber={1} totalSlides={totalSlides}>
      <div className="flex flex-col items-center justify-center h-full text-center relative">
        {/* Lab logo — top-right corner badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute top-3 right-2 z-20 flex flex-col items-center"
        >
          <div
            className="rounded-full overflow-hidden flex items-center justify-center"
            style={{
              width: 140,
              height: 140,
              border: '2.5px solid rgba(201,168,76,0.45)',
              boxShadow: '0 0 28px rgba(201,168,76,0.15), 0 0 56px rgba(25,25,112,0.4)',
              background: '#f5f5f5',
            }}
          >
            <img
              src={labLogo}
              alt="AI-NLP-ML Research Group"
              style={{
                width: 150,
                height: 150,
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
          <span
            className="text-[0.7rem] text-[#C9A84C]/80 mt-2 tracking-wider uppercase text-center max-w-[140px]"
            style={{ fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.3 }}
          >
            AI-NLP-ML Research Group
          </span>
        </motion.div>
        {/* Decorative rings */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full border border-[#C9A84C]/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full border border-[#6BA292]/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full border border-[#3A6EA5]/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-[2px] bg-gradient-to-r from-[#C9A84C] to-[#6BA292] mx-auto mb-8"
          />

          <h1
            className="text-[#E8E4D9] mb-4 tracking-tight max-w-4xl font-bold"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", lineHeight: 1.15 }}
          >
            Beyond Von Neumann
          </h1>
          <h2
            className="text-[#C9A84C] mb-8 tracking-tight max-w-3xl font-semibold"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)", lineHeight: 1.3 }}
          >
            Brain-Inspired Computing for the Post-Moore Era
          </h2>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-[#E8E4D9]/20 to-transparent mx-auto mb-8"
          />

          <p
            className="text-[#E8E4D9]/80 max-w-2xl mx-auto mb-12 font-medium"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.05rem)" }}
          >
            A deep dive into neuromorphic algorithms and future computing paradigms
          </p>

          <div className="flex flex-col gap-2 text-[#E8E4D9] mb-8" style={{ fontSize: "0.95rem" }}>
            <div className="font-semibold text-[1.1rem]">Parv Agarwal</div>
            <div className="text-[#E8E4D9]/75">JRA (Tech)</div>
            <div className="text-[#E8E4D9]/75 mt-1">
              Supervised under: <span className="font-medium text-[#E8E4D9]/90">Dr. Asif Ekbal Sir</span>
            </div>
            <div className="text-[#C9A84C] font-medium">IIT Patna</div>
          </div>

          <div className="flex flex-col gap-1 text-[#E8E4D9]/60" style={{ fontSize: "0.90rem", fontFamily: "'IBM Plex Mono', monospace" }}>
            <span>27-February-2026</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 text-[10px] text-[#E8E4D9]/60"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Based on Schuman et al.,{" "}
          <a
            href={PAPER_URL}
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