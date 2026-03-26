import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME, scoreColor } from "../theme";
import type { CompetitorData } from "../../types";

const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: PDF_THEME.borderLight,
  },
  highlight: {
    backgroundColor: PDF_THEME.marcusBlueDim,
  },
  name: {
    flex: 3,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    fontWeight: 500,
    color: PDF_THEME.textPrimary,
  },
  cell: {
    flex: 1.5,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    color: PDF_THEME.textSecondary,
    textAlign: "center",
  },
  cellBold: {
    fontWeight: 600,
  },
  yesNo: {
    flex: 1.5,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    textAlign: "center",
  },
});

interface CompetitorRowProps {
  data: CompetitorData;
  highlight?: boolean;
}

export function CompetitorRow({ data, highlight }: CompetitorRowProps) {
  return (
    <View style={[s.row, highlight && s.highlight]}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.cell}>
        {data.googleRating !== null ? `${data.googleRating} / 5` : "—"}
      </Text>
      <Text style={s.cell}>
        {data.googleReviewCount !== null ? data.googleReviewCount : "—"}
      </Text>
      <Text
        style={[
          s.cell,
          s.cellBold,
          data.pageSpeedScore !== null
            ? { color: scoreColor(data.pageSpeedScore) }
            : {},
        ]}
      >
        {data.pageSpeedScore !== null ? `${data.pageSpeedScore}/100` : "—"}
      </Text>
      <Text
        style={[
          s.yesNo,
          {
            color: data.hasLocalBusiness ? PDF_THEME.green : PDF_THEME.red,
          },
        ]}
      >
        {data.hasLocalBusiness ? "Oui" : "Non"}
      </Text>
    </View>
  );
}
