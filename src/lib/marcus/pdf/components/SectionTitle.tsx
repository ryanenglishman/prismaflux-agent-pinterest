import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";

const s = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 12,
    fontWeight: 700,
    color: PDF_THEME.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textMuted,
  },
  accent: {
    width: 24,
    height: 2,
    backgroundColor: PDF_THEME.brand,
    borderRadius: 1,
    marginTop: 4,
  },
});

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      {subtitle && <Text style={s.subtitle}>{subtitle}</Text>}
      <View style={s.accent} />
    </View>
  );
}
