import React from "react";
import { View, Text, Svg, Path, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";

const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  wordmark: {
    fontFamily: PDF_THEME.fontFamily,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  sub: {
    fontFamily: PDF_THEME.fontFamily,
    fontWeight: 400,
  },
});

interface LogoProps {
  size?: "small" | "large";
  variant?: "light" | "dark";
}

export function Logo({ size = "small", variant = "light" }: LogoProps) {
  const iconSize = size === "large" ? 24 : 14;
  const fontSize = size === "large" ? 16 : 10;
  const subSize = size === "large" ? 10 : 7;
  const textColor = variant === "dark" ? PDF_THEME.textOnDark : PDF_THEME.textPrimary;
  const subColor = variant === "dark" ? "#999999" : PDF_THEME.textMuted;

  return (
    <View style={s.row}>
      {/* Stylized P icon */}
      <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24">
        <Path
          d="M4 2 L4 22 L8 22 L8 14 L14 14 C18.4 14 22 11 22 8 C22 5 18.4 2 14 2 L4 2 Z M8 5 L14 5 C16.8 5 19 6.3 19 8 C19 9.7 16.8 11 14 11 L8 11 L8 5 Z"
          fill={PDF_THEME.brand}
        />
      </Svg>
      <View>
        <Text style={[s.wordmark, { fontSize, color: textColor }]}>
          <Text style={{ color: PDF_THEME.brand }}>PRISMA</Text>
          <Text>FLUX</Text>
        </Text>
        {size === "large" && (
          <Text style={[s.sub, { fontSize: subSize, color: subColor }]}>Auto</Text>
        )}
      </View>
    </View>
  );
}
