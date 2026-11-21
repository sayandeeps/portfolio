import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ProjectsSection from "./components/ProjectsSection";
import CurrentFocus from "./components/CurrentFocus";
import EmailSection from "./components/EmailSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto w-full max-w-content px-6 sm:px-8">
        <HeroSection />
        <AboutSection />
        <ExperienceTimeline />
        <ProjectsSection />
        <SkillsSection />
        <CurrentFocus />
        <EmailSection />
      </main>
      <Footer />
    </>
  );
}
