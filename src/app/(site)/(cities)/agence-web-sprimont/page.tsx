import type { Metadata } from "next";
import { CityPage } from "@/components/templates/CityPage";
import { CITIES_DATA } from "@/lib/constants/cities";

const city = CITIES_DATA.sprimont;

export const metadata: Metadata = {
  title: city.metaTitle,
  description: city.metaDescription,
  alternates: {
    canonical: "/agence-web-sprimont",
  },
};

export default function AgenceWebSprimont() {
  return <CityPage city={city} />;
}
