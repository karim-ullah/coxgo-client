import CTA from "@/components/Homepage/CTA";
import DeliveryArea from "@/components/Homepage/DeliveryArea";
import Faq from "@/components/Homepage/Faq";
import Hero from "@/components/Homepage/Hero";
import HowItWorks from "@/components/Homepage/HowItWorks";
import OurServices from "@/components/Homepage/OurServices";
import TrustBar from "@/components/Homepage/TrustBar";
import WhyChooseus from "@/components/Homepage/WhyChooseus";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Hero/>
      <TrustBar/>
      <OurServices/>
      <HowItWorks/>
      <WhyChooseus/>
      <DeliveryArea/>
      <Faq/>
      <CTA/>
    </div>
  );
}
