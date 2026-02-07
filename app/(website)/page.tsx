import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectWall from "@/components/ProjectWall";
import ComparisonSection from "@/components/ComparisonSection";
import BentoGrid from "@/components/BentoGrid";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProcessSection from "@/components/ProcessSection";
import GrowthPartner from "@/components/GrowthPartner";
import Testimonials from "@/components/Testimonials";
import LatestBlog from "@/components/LatestBlog";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import PlansSection from "@/components/PlansSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      {/* Other sections like Services, Portfolio etc. */}
      <ProjectWall />
      <ComparisonSection /> 
      <BentoGrid />
      <ServicesSection />
      <FeaturedProjects />
      <ProcessSection />
      {/* <PlansSection /> */}
      {/* <GrowthPartner /> */}
      <Testimonials />
      <LatestBlog />
      <FAQSection />
      <Footer />
    </main>
  );
}