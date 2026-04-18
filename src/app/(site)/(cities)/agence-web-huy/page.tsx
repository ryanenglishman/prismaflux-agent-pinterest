import type { Metadata } from "next";
import { CityPage } from "@/components/templates/CityPage";
import { CITIES_DATA } from "@/lib/constants/cities";

const city = CITIES_DATA.huy;

export const metadata: Metadata = {
  title: city.metaTitle,
  description: city.metaDescription,
  alternates: {
    canonical: "/agence-web-huy",
  },
};

export default function AgenceWebHuy() {
  return <CityPage city={city} />;
}
