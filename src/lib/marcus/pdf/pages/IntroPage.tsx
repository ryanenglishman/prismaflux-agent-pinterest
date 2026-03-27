import React from "react";
import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { PageHeader } from "../components/PageHeader";
import { SectionTitle } from "../components/SectionTitle";
import { getRobinAvatar } from "../components/avatars";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.pageBg, padding: PDF_THEME.margin },
  welcomeText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7.5,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.65,
    marginBottom: 10,
  },
  whatBox: {
    padding: 10,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 4,
    marginBottom: 10,
  },
  whatLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 4,
  },
  whatText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.6,
  },
  divider: { height: 0.5, backgroundColor: PDF_THEME.border, marginVertical: 8 },
  // PrismaFlux section
  pfLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 4,
  },
  pfText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.6,
    marginBottom: 10,
  },
  // Robin spotlight
  robinCard: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    backgroundColor: PDF_THEME.dark,
    borderRadius: 6,
    marginBottom: 10,
  },
  robinAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: PDF_THEME.brand,
  },
  robinContent: { flex: 1 },
  robinName: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 11,
    fontWeight: 700,
    color: PDF_THEME.textOnDark,
    marginBottom: 1,
  },
  robinRole: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.brand,
    marginBottom: 4,
  },
  robinDesc: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 6.5,
    color: "#AAAAAA",
    lineHeight: 1.55,
  },
  // How to read
  howBox: {
    padding: 8,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: PDF_THEME.brand,
  },
  howLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    fontWeight: 600,
    color: PDF_THEME.brand,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  howText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 6.5,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.55,
  },
});

interface IntroPageProps {
  dealerName: string;
  introWelcome: string;
  introWhatIsThis: string;
  introPrismafluxDesc: string;
  introRobinDesc: string;
  introHowToRead: string;
  pageNumber: number;
  totalPages: number;
}

export function IntroPage({
  dealerName,
  introWelcome,
  introWhatIsThis,
  introPrismafluxDesc,
  introRobinDesc,
  introHowToRead,
  pageNumber,
  totalPages,
}: IntroPageProps) {
  const robinAvatar = getRobinAvatar();

  return (
    <Page size="A4" style={s.page}>
      <PageHeader pageNumber={pageNumber} totalPages={totalPages} />

      <SectionTitle title={`Bonjour, ${dealerName}`} subtitle="Pourquoi ce rapport et comment le lire" />

      <Text style={s.welcomeText}>{introWelcome}</Text>

      <View style={s.whatBox}>
        <Text style={s.whatLabel}>Votre quotidien, on le connait</Text>
        <Text style={s.whatText}>{introWhatIsThis}</Text>
      </View>

      <View style={s.divider} />

      <Text style={s.pfLabel}>Qui est PrismaFlux Auto ?</Text>
      <Text style={s.pfText}>{introPrismafluxDesc}</Text>

      {/* Robin spotlight */}
      <View style={s.robinCard}>
        {robinAvatar ? <Image src={robinAvatar} style={s.robinAvatar} /> : null}
        <View style={s.robinContent}>
          <Text style={s.robinName}>Robin</Text>
          <Text style={s.robinRole}>Copilote Diffusion Multi-Plateforme</Text>
          <Text style={s.robinDesc}>{introRobinDesc}</Text>
        </View>
      </View>

      <View style={s.howBox}>
        <Text style={s.howLabel}>Comment lire ce rapport</Text>
        <Text style={s.howText}>{introHowToRead}</Text>
      </View>
    </Page>
  );
}
