import { motion } from "motion/react";
import { SlideWrapper } from "../SlideWrapper";
import { BookOpen, GitBranch, Layers, Target, Lightbulb } from "lucide-react";

const contributions = [
  { icon: BookOpen, label: "Surveys neuromorphic algorithms", desc: "Comprehensive review of SNN learning rules, optimization approaches, and non-ML workloads across neuromorphic platforms" },
  { icon: GitBranch, label: "Categorizes learning approaches", desc: "Systematic taxonomy: spike-based backprop, DNN→SNN conversion, reservoir computing, evolutionary methods, STDP" },
  { icon: Layers, label: "Identifies hardware-algorithm gap", desc: "Current algorithms don't fully exploit neuromorphic hardware advantages — significant efficiency potential remains untapped" },
  { icon: Target, label: "Proposes full-stack co-design", desc: "Bidirectional, omnidirectional design between materials, devices, circuits, architecture, algorithms, and applications" },
  { icon: Lightbulb, label: "Highlights non-ML applications", desc: "Graph algorithms, combinatorial optimization, constraint satisfaction — uniquely suited to neuromorphic's parallel, event-driven nature" },
];

const algorithmCategories = [
  { name: "Supervised Learning", items: ["Spike-based Backpropagation", "DNN → SNN Conversion", "Surrogate Gradients"], color: "#3A6EA5" },
  { name: "Unsupervised Learning", items: ["STDP", "Competitive Learning", "Hebbian Rules"], color: "#6BA292" },
  { name: "Other ML", items: ["Reservoir Computing", "Evolutionary Optimization", "Reinforcement Learning"], color: "#5B4B8A" },
  { name: "Non-ML", items: ["Graph Algorithms", "Optimization (QUBO)", "Constraint Satisfaction"], color: "#E8E4D9" },
];

export function Slide07DeepDive({ totalSlides }: { totalSlides: number }) {
  return (
    <SlideWrapper slideNumber={7} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          Core Contribution of the Paper
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-[#5B4B8A] mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key contributions */}
          <div className="space-y-3">
            {contributions.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.12 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-[#5B4B8A]/5 border border-[#5B4B8A]/10 hover:border-[#5B4B8A]/30 transition-all group"
              >
                <c.icon className="w-5 h-5 text-[#5B4B8A] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#E8E4D9] text-[0.85rem]">{c.label}</span>
                  <span className="text-[#E8E4D9]/60 text-[0.72rem] block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {c.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Algorithm taxonomy flowchart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[0.7rem] text-[#E8E4D9]/60 mb-3 uppercase tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Algorithm Taxonomy (Based on Fig. 2)
            </p>

            <div className="bg-[rgba(255,255,255,0.03)] rounded-xl border border-[#5B4B8A]/10 p-4">
              {/* Root */}
              <div className="flex justify-center mb-4">
                <div className="px-4 py-2 rounded-lg bg-[#5B4B8A]/20 border border-[#5B4B8A]/30 text-[#E8E4D9] text-[0.8rem]">
                  Neuromorphic Algorithms
                </div>
              </div>

              {/* Branches */}
              <div className="flex justify-center mb-2">
                <div className="w-px h-4 bg-[#E8E4D9]/20" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {algorithmCategories.map((cat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="flex flex-col"
                  >
                    {/* Connector */}
                    <div className="flex justify-center mb-1">
                      <div className="w-px h-3" style={{ backgroundColor: `${cat.color}40` }} />
                    </div>

                    <div
                      className="p-2 rounded-lg text-center"
                      style={{
                        backgroundColor: `${cat.color}10`,
                        border: `1px solid ${cat.color}25`,
                      }}
                    >
                      <span className="text-[0.7rem] block mb-1.5" style={{ color: cat.color }}>
                        {cat.name}
                      </span>
                      {cat.items.map((item, j) => (
                        <span
                          key={j}
                          className="text-[0.6rem] text-[#E8E4D9]/60 block"
                          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="text-[0.6rem] text-[#E8E4D9]/50 mt-2 text-center" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <a
                href="https://www.nature.com/articles/s43588-021-00184-y"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#5B4B8A]/40 hover:text-[#5B4B8A] transition-colors"
              >
                Schuman et al., Nature Comp. Sci. (2022) — Fig. 2
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}