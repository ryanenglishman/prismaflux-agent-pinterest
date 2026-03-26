import React from "react";
import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { readFileSync } from "fs";
import { join } from "path";

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    padding: 8,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: PDF_THEME.brand,
    marginVertical: 4,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  label: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 6,
    fontWeight: 600,
    color: PDF_THEME.brand,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  text: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.55,
  },
});

// Pre-load avatar as data URI
let marcusDataUri: string | null = null;
function getMarcusAvatar(): string {
  if (!marcusDataUri) {
    try {
      const buf = readFileSync(join(process.cwd(), "assets", "avatars", "marcus.png"));
      marcusDataUri = `data:image/png;base64,${buf.toString("base64")}`;
    } catch {
      marcusDataUri = "";
    }
  }
  return marcusDataUri;
}

interface MarcusCommentProps {
  text: string;
  label?: string;
}

export function MarcusComment({ text, label = "Analyse Marcus" }: MarcusCommentProps) {
  const avatar = getMarcusAvatar();

  return (
    <View style={s.container}>
      {avatar && <Image src={avatar} style={s.avatar} />}
      <View style={s.content}>
        <Text style={s.label}>{label}</Text>
        <Text style={s.text}>{text}</Text>
      </View>
    </View>
  );
}
