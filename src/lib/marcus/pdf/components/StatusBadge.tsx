import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME, statusColor, statusColorDim, statusLabel } from "../theme";

const s = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 600,
  },
});

interface StatusBadgeProps {
  status: "ok" | "warn" | "error";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <View style={[s.badge, { backgroundColor: statusColorDim(status) }]}>
      <View style={[s.dot, { backgroundColor: statusColor(status) }]} />
      <Text style={[s.text, { color: statusColor(status) }]}>
        {statusLabel(status)}
      </Text>
    </View>
  );
}
