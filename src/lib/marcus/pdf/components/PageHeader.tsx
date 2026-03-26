import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "./Logo";

const s = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: PDF_THEME.dark,
    borderRadius: 4,
    marginBottom: 14,
  },
  pageNum: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: "#666666",
  },
});

interface PageHeaderProps {
  pageNumber: number;
  totalPages: number;
}

export function PageHeader({ pageNumber, totalPages }: PageHeaderProps) {
  return (
    <View style={s.bar}>
      <Logo size="small" variant="dark" />
      <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
    </View>
  );
}
