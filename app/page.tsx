import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import StackBar from "@/components/StackBar";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import BasisTerminal from "@/components/BasisTerminal";
import Marketplace from "@/components/Marketplace";
import LaunchPad from "@/components/LaunchPad";
import EarnSection from "@/components/EarnSection";
import Architecture from "@/components/Architecture";
import Timeline from "@/components/Timeline";
import Finale from "@/components/Finale";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#161006] text-[#f7efdd] antialiased">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <StackBar />
        <Problem />
        <HowItWorks />
        <BasisTerminal />
        <Marketplace />
        <LaunchPad />
        <EarnSection />
        <Architecture />
        <Timeline />
        <Finale />
      </main>
      <Footer />
    </div>
  );
}
