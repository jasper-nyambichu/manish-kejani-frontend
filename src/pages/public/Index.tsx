import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/sections/HeroBanner";
import CategoryStrip from "@/components/sections/CategoryStrip";
import FlashDeals from "@/components/sections/FlashDeals";
import BestSellers from "@/components/sections/BestSellers";
import NewArrivals from "@/components/sections/NewArrivals";
import PromoBanner from "@/components/sections/PromoBanner";
import StatCounters from "@/components/sections/StatCounters";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <HeroBanner />
        <CategoryStrip />
        <FlashDeals />
        <PromoBanner />
        <BestSellers />
        <NewArrivals />
        <StatCounters />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
