import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import AchievementsSection from "./components/AchievementSection";
import AboutSection from "./components/AboutSection";
import CustomizedTimeline from "./components/CustomizedTimeline"
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
    <Navbar />
    <div className="container mt-24 mx-auto px-12 py-4">
      <HeroSection />
      <AchievementsSection />
      <AboutSection />
      <CustomizedTimeline />
      <ProjectsSection />
      <EmailSection />
    </div>
    <Footer />
  </main>
  );
}
