import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import HeroBanner from "@/components/sections/HeroBanner";
import CategoryStrip from "@/components/sections/CategoryStrip";
import FlashDeals from "@/components/sections/FlashDeals";
import BestSellers from "@/components/sections/BestSellers";
import NewArrivals from "@/components/sections/NewArrivals";
import PromoBanner from "@/components/sections/PromoBanner";
import StatCounters from "@/components/sections/StatCounters";
import RecentlyViewed from "@/components/sections/RecentlyViewed";
import WelcomeModal from "@/components/ui/WelcomeModal";
import { useEffect } from "react";

const Index = () => {
  // Wake up the Render backend immediately on page load
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:5000'}/health`)
      .catch(() => {}); // silent — just waking it up
  }, []);

  return (
    <div className="min-h-screen bg-background font-body">
      <Helmet>
        <meta
          name="description"
          content="Shop quality kitchenware, bedding, home décor, cookware and more online in Kenya. Manish Households offers fast delivery and easy WhatsApp ordering."
        />
        <link rel="canonical" href="https://www.manishhouseholds.co.ke/" />
        <meta property="og:title" content="Manish Households - Quality Home & Kitchen Products in Kenya" />
        <meta
          property="og:description"
          content="Shop quality kitchenware, bedding, home décor, cookware and more online in Kenya."
        />
        <meta property="og:url" content="https://www.manishhouseholds.co.ke/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main>
        <HeroBanner />
        <CategoryStrip />
        <FlashDeals />
        <PromoBanner />
        <BestSellers />
        <NewArrivals />
        <RecentlyViewed />
        <StatCounters />
      </main>
      <Footer />
      <WelcomeModal />
    </div>
  );
};

export default Index;