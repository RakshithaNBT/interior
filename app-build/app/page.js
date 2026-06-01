import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import BrandMarquee from "@/components/sections/BrandMarquee";
import ServicesSection from "@/components/sections/ServicesSection";
import RoomCategories from "@/components/sections/RoomCategories";
import PortfolioSection from "@/components/sections/PortfolioSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import StatsCounter from "@/components/sections/StatsCounter";
import VideoShowcase from "@/components/sections/VideoShowcase";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FAQSection from "@/components/sections/FAQSection";
import BookingSection from "@/components/sections/BookingSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <BrandMarquee />
      <AboutSection />
      <ServicesSection />
      <RoomCategories />
      <StatsCounter />
      <PortfolioSection />
      <BeforeAfterSection />
      <VideoShowcase />
      <TestimonialSection />
      <FAQSection />
      <BookingSection />
    </div>
  );
}
