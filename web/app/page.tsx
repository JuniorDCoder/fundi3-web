import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WalletPreview } from "@/components/landing/WalletPreview";
import { CoursesPreview } from "@/components/landing/CoursesPreview";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { CallToAction } from "@/components/landing/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <WalletPreview />
      <CoursesPreview />
      <Stats />
      <Testimonials />
      <CallToAction />
    </>
  );
}
