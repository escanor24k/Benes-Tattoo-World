import { getPublicHeroSlides } from "@/actions/database/public";
import { HeroSliderClient } from "./HeroSliderClient";

export async function HeroSlider(): Promise<React.JSX.Element> {
  const slides = await getPublicHeroSlides();
  return <HeroSliderClient slides={slides} />;
}
