import Hero from "@/components/Homepage/Hero";
import TrustBar from "@/components/Homepage/TrustBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Hero/>
      <TrustBar/>
    </div>
  );
}
