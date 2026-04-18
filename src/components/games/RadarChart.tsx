"use client";

import { motion } from "framer-motion";
import { DIMENSIONS, DIMENSION_COLORS } from "@/lib/constants/quiz-questions";

interface RadarChartProps {
  scores: Record<string, number>; // 0-20 per dimension
  animated?: boolean;
}

export function RadarChart({ scores, animated = true }: RadarChartProps) {
  const cx = 150;
  const cy = 150;
  const maxR = 110;
  const levels = 4;
  const dims = DIMENSIONS;
  const n = dims.length;

  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, radius: number) => {
    const angle = startAngle + index * angleStep;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  // Polygon grid
  const gridPolygons = Array.from({ length: levels }, (_, level) => {
    const r = (maxR / levels) * (level + 1);
    return dims.map((_, i) => getPoint(i, r)).map((p) => `${p.x},${p.y}`).join(" ");
  });

  // Data polygon
  const dataPoints = dims.map((dim, i) => {
    const val = (scores[dim] || 0) / 20; // normalize to 0-1
    const r = val * maxR;
    return getPoint(i, r);
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[300px] mx-auto">
      {/* Grid */}
      {gridPolygons.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.08}
          strokeWidth={1}
        />
      ))}

      {/* Axis lines */}
      {dims.map((_, i) => {
        const p = getPoint(i, maxR);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="currentColor"
            strokeOpacity={0.06}
            strokeWidth={1}
          />
        );
      })}

      {/* Data area */}
      <motion.polygon
        points={animated ? dims.map((_, i) => `${cx},${cy}`).join(" ") : dataPolygon}
        animate={{ points: dataPolygon }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        fill="rgba(255, 23, 68, 0.15)"
        stroke="#FF1744"
        strokeWidth={2}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={4}
          fill={DIMENSION_COLORS[dims[i]]}
          animate={{ cx: p.x, cy: p.y }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 + i * 0.1 }}
        />
      ))}

      {/* Labels */}
      {dims.map((dim, i) => {
        const p = getPoint(i, maxR + 20);
        return (
          <text
            key={dim}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="currentColor"
            fillOpacity={0.5}
            fontSize={10}
            fontWeight={500}
          >
            {dim}
          </text>
        );
      })}
    </svg>
  );
}
