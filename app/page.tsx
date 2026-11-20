import { Navbar } from "@/components/ui/Navbar";
import { SmartCartDrawer } from "@/components/ui/SmartCartDrawer";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { Footer } from "@/components/ui/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { MenuCatalogSection } from "@/components/sections/MenuCatalogSection";
import { HighlightsBento } from "@/components/sections/HighlightsBento";
import { RacikStudioSection } from "@/components/sections/RacikStudioSection";
import { CrowdReservationSection } from "@/components/sections/CrowdReservationSection";
import { FranchiseROISection } from "@/components/sections/FranchiseROISection";
import { BranchLocatorSection } from "@/components/sections/BranchLocatorSection";
import { StoryGalleryFAQSection } from "@/components/sections/StoryGalleryFAQSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#1E1415]">
      <Navbar />

      <main>
        {/* 1. Reference 3-Column Hero + Asymmetric 3-Photo Promo Banner */}
        <HeroSection />
        {/* 2. Reference "Best Products" / "Menu Andalan" 4-Col Blush + Red Card Grid */}
        <MenuCatalogSection />
        {/* 3. Reference "Our Stories Have Adventures" Split Maroon Frame + 3 Blush Stat Boxes */}
        <HighlightsBento />
        {/* 4. Interactive Core Feature: Studio Racik Indomie-mu */}
        <RacikStudioSection />
        {/* 5. Live Crowd Meter & Interactive Table/Nobar E-Ticket Reservation */}
        <CrowdReservationSection />
        {/* 6. Franchise & ROI Simulator */}
        <FranchiseROISection />
        {/* 7. Branch Locator & Facilities Matrix */}
        <BranchLocatorSection />
        {/* 8. Most Popular Gallery Lightbox + Timeline + Testimonials + FAQ */}
        <StoryGalleryFAQSection />
      </main>

      <Footer />
      <SmartCartDrawer />
      <ToastContainer />
    </div>
  );
}
