import { HeroSlider } from "@/components/landingpage/HeroSlider";
import { StylesSection } from "@/components/landingpage/StylesSection";
import { AboutSection } from "@/components/landingpage/AboutSection";
import { PortfolioPreview } from "@/components/landingpage/PortfolioPreview";
import { CtaBanner } from "@/components/landingpage/CtaBanner";
import { LocationSection } from "@/components/landingpage/LocationSection";

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <HeroSlider />
      <StylesSection />
      <AboutSection />
      <PortfolioPreview />
      <CtaBanner />
      <LocationSection />
    </>
  );
}
