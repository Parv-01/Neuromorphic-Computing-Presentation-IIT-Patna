import { motion } from "motion/react";
import { useState } from "react";
import { SlideWrapper } from "../SlideWrapper";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, Thermometer, Globe, Smartphone, Clock } from "lucide-react";

const energyData = [
  { name: "Human Brain", value: 20, unit: "W", color: "#6BA292" },
  { name: "Smartphone\nInference", value: 5, unit: "W", color: "#3A6EA5" },
  { name: "Edge TPU\nInference", value: 15, unit: "W", color: "#3A6EA5" },
  { name: "GPU\nInference", value: 300, unit: "W", color: "#5B4B8A" },
  { name: "GPT-3\nTraining", value: 1287000, unit: "W", color: "#d4183d" },
];

const logEnergyData = energyData.map((d) => ({
  ...d,
  logValue: Math.log10(d.value),
  displayValue: d.value >= 1000 ? `${(d.value / 1000).toFixed(0)} kW` : `${d.value} W`,
}));

const points = [
  { icon: TrendingUp, label: "Exponential Training Costs", desc: "Compute costs doubling every 3.4 months since 2012" },
  { icon: Thermometer, label: "Environmental Impact", desc: "A single large model training can emit as much CO₂ as 5 cars over their lifetime" },
  { icon: Globe, label: "Edge Limitations", desc: "Cannot deploy 175B+ parameter models to edge devices" },
  { icon: Smartphone, label: "Latency Constraints", desc: "Real-time applications need <10ms response — cloud roundtrip too slow" },
  { icon: Clock, label: "Diminishing Returns", desc: "10x more compute yields only marginal accuracy improvements" },
];

export function Slide03Scaling({ totalSlides }: { totalSlides: number }) {
  const [showChart, setShowChart] = useState(false);

  return (
    <SlideWrapper slideNumber={3} totalSlides={totalSlides}>
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E8E4D9] mb-1"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          Scaling ≠ Intelligence
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3 }}
          className="h-[2px] bg-[#6BA292] mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#6BA292]/10 border border-[#6BA292]/20 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-4 h-4 text-[#6BA292]" />
                </div>
                <div>
                  <span className="text-[#E8E4D9] text-[0.85rem]">{point.label}</span>
                  <span className="text-[#E8E4D9]/60 text-[0.75rem] block opacity-0 group-hover:opacity-100 transition-opacity duration-300">{point.desc}</span>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 p-3 rounded-lg bg-[#5B4B8A]/10 border border-[#5B4B8A]/20"
            >
              <p className="text-[0.75rem] text-[#E8E4D9]/80 italic">
                "Transformers scale via compute brute force, not computational efficiency. This path leads to diminishing returns on both intelligence and sustainability."
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col"
          >
            <button
              onClick={() => setShowChart(!showChart)}
              className="self-start mb-3 px-3 py-1 rounded-full text-[0.7rem] transition-all"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                backgroundColor: showChart ? 'rgba(107,162,146,0.2)' : 'rgba(107,162,146,0.1)',
                color: '#6BA292',
                border: '1px solid rgba(107,162,146,0.3)',
              }}
            >
              {showChart ? "Hide" : "Show"} Energy Comparison
            </button>

            {showChart && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-[rgba(255,255,255,0.03)] rounded-xl border border-[#3A6EA5]/10 p-4"
              >
                <p className="text-[0.7rem] text-[#E8E4D9]/70 mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  Energy per inference / operation (log₁₀ scale, Watts)
                </p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={logEnergyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(232,228,217,0.08)" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#E8E4D9', fontSize: 10 }}
                      axisLine={{ stroke: 'rgba(232,228,217,0.25)' }}
                      tickLine={{ stroke: 'rgba(232,228,217,0.2)' }}
                      interval={0}
                    />
                    <YAxis
                      tick={{ fill: '#E8E4D9', fontSize: 10 }}
                      axisLine={{ stroke: 'rgba(232,228,217,0.25)' }}
                      tickLine={{ stroke: 'rgba(232,228,217,0.2)' }}
                      label={{ value: 'log₁₀(W)', angle: -90, position: 'insideLeft', fill: '#E8E4D9', fontSize: 10 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0d0d3a',
                        border: '1px solid rgba(58,110,165,0.4)',
                        borderRadius: 8,
                        fontSize: 11,
                        color: '#E8E4D9',
                      }}
                      labelStyle={{ color: '#E8E4D9' }}
                      itemStyle={{ color: '#E8E4D9' }}
                      formatter={(value: number, name: string, props: any) => [props.payload.displayValue, 'Energy']}
                    />
                    <Bar dataKey="logValue" radius={[4, 4, 0, 0]}>
                      {logEnergyData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-[0.6rem] text-[#E8E4D9]/50 mt-2 text-center">
                  The human brain operates at 20W — orders of magnitude more efficient than any AI system
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}