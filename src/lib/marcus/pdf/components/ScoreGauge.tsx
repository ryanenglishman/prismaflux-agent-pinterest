import React from "react";
import { View, Text, Svg, Circle, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME, scoreColor } from "../theme";

const s = StyleSheet.create({
  container: { alignItems: "center" },
  label: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 500,
    color: PDF_THEME.textSecondary,
    marginTop: 6,
  },
});

interface ScoreGaugeProps {
  score: number;
  size?: number;
  label?: string;
}

export function ScoreGauge({ score, size = 100, label }: ScoreGaugeProps) {
  const strokeWidth = size > 80 ? 8 : 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100) / 100;
  const dashOffset = circumference * (1 - progress);
  const color = scoreColor(score);

  return (
    <View style={s.container}>
      <View style={{ width: size, height: size, position: "relative" }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference}`}
            strokeDashoffset={`${dashOffset}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: PDF_THEME.fontFamily,
              fontSize: size > 80 ? 24 : 16,
              fontWeight: 700,
              color,
            }}
          >
            {score}
          </Text>
          <Text
            style={{
              fontFamily: PDF_THEME.fontFamily,
              fontSize: size > 80 ? 8 : 6,
              color: PDF_THEME.textMuted,
            }}
          >
            / 100
          </Text>
        </View>
      </View>
      {label && <Text style={s.label}>{label}</Text>}
    </View>
  );
}
