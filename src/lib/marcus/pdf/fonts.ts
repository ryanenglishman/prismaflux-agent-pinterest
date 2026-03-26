import { Font } from "@react-pdf/renderer";

const INTER_CDN =
  "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin";

export function registerFonts() {
  Font.register({
    family: "Inter",
    fonts: [
      { src: `${INTER_CDN}-400-normal.ttf`, fontWeight: 400 },
      { src: `${INTER_CDN}-500-normal.ttf`, fontWeight: 500 },
      { src: `${INTER_CDN}-600-normal.ttf`, fontWeight: 600 },
      { src: `${INTER_CDN}-700-normal.ttf`, fontWeight: 700 },
    ],
  });
}
