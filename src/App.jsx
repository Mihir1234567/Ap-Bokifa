/* d:/Projects/Ap-Bokifa-main/src/App.jsx */
// App.jsx

import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ScrollToTop from "./pages/ScrollToTop";
import RecentlyViewedSidebar from "./components/RecentlyViewedSidebar";
import Footer from "./components/Footer";
import NewsletterSocials from "./components/product/NewsletterSocials";

import BookstorePage from "./pages/BookstorePage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CollectionsBooks from "./pages/CollectionsBooks";
import CategoryLanding from "./pages/CategoryLanding";
import { Coupon } from "./components/Coupon"; // Keep this import
import { ProductLayoutClassic } from "./pages/ProductLayoutClassic";
import { ProductLayoutScrollFixed } from "./pages/ProductLayoutScrollFixed";
import { ProductLayoutLeftThumbs } from "./pages/ProductLayoutLeftThumbs";
import { ProductLayoutRightThumbs } from "./pages/ProductLayoutRightThumbs";
import { ProductLayoutWithoutThumbs } from "./pages/ProductLayoutWithoutThumbs";
import { TypeWithVideo } from "./pages/TypeWithVideo";
import ProductDetailPage from "./pages/ProductDetailPage"; // New import for product detail page

// --- NEW IMPORTS ---
import UpsellModal from "./components/UpsellModal"; // 1. Import the new modal
import CrossSell from "./components/CrossSell";
import BlogPage from "./pages/BlogPage_Grid";
import BlogPageList from "./pages/BlogPage_Standard";
import BlogPostDetailWithSidebar from "./pages/BlogPage";
import AboutSection from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import MeetOurTeam from "./pages/OurTeam";
import NotFoundPage from "./pages/PageNotFound";
import LookBook from "./pages/LookBook";
import FAQPage from "./pages/FAQPage";

const App = () => {
  // 1. State to control the visibility of the coupon
  const [isCouponVisible, setIsCouponVisible] = useState(false);

  // --- NEW STATE ---
  // 2. Add new state for the upsell modal
  const [isUpsellModalOpen, setIsUpsellModalOpen] = useState(false);
  const [isCrossSellOpen, setIsCrossSellOpen] = useState(false);

  // Get current location to detect route changes
  const location = useLocation();

  // 💡 --- EFFECT TO BLOCK SCROLL --- 💡
  useEffect(() => {
    // This function blocks/unblocks body scrolling
    const body = document.body;
    // Check for both modals
    if (isUpsellModalOpen || isCrossSellOpen || isCouponVisible) {
      body.style.overflow = "hidden"; // Disable scroll
    } else {
      body.style.overflow = "auto"; // Enable scroll
    }

    // Cleanup function to re-enable scroll when component unmounts
    return () => {
      body.style.overflow = "auto";
    };
  }, [isUpsellModalOpen, isCrossSellOpen, isCouponVisible]); // 💡 Runs when *either* modal's state changes

  // 2. Function to close the coupon modal (used by the 'X' button)
  const closeCoupon = () => {
    setIsCouponVisible(false);
  };

  // 4. Function for manual trigger (you can call this from any component)
  const showCouponManually = (e) => {
    if (e) e.preventDefault();
    setIsCouponVisible(true);
  };
  const showCrossSellManually = () => {
    setIsCrossSellOpen(true);
  };

  // --- NEW FUNCTIONS ---
  // 3. Add open/close functions for the upsell modal
  const openUpsellModal = (e) => {
    if (e) e.preventDefault(); // Prevent link navigation
    setIsUpsellModalOpen(true);
  };
  const closeUpsellModal = () => {
    setIsUpsellModalOpen(false);
  };
  const openCrossSellModal = (e) => {
    if (e) e.preventDefault(); // Prevent link navigation
    setIsCrossSellOpen(true);
  };
  const closeCrossSellModal = () => {
    setIsCrossSellOpen(false);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        {/* 4. Pass the open function to your Navbar */}
        <Navbar
          onUpsellClick={openUpsellModal}
          onCrossSellClick={openCrossSellModal}
          onCouponClick={showCouponManually}
        />

        <Routes>
          {/* Your existing routes */}
          <Route path="/" element={<Home />} />
          <Route path="/leftSidebar" element={<BookstorePage />} />
          <Route path="/collections/categories" element={<CategoryLanding />} />
          <Route path="/collections/books" element={<CollectionsBooks />} />

          <Route
            path="/productPageClassic"
            element={<ProductLayoutClassic />}
          />
          <Route
            path="/productPageScrollFixed"
            element={<ProductLayoutScrollFixed />}
          />
          <Route
            path="/productPageLeftThumbs"
            element={<ProductLayoutLeftThumbs />}
          />
          <Route
            path="/productPageRightThumbs"
            element={<ProductLayoutRightThumbs />}
          />
          <Route
            path="/productPageWithoutThumbs"
            element={<ProductLayoutWithoutThumbs />}
          />
          <Route path="/typeWithVideo" element={<TypeWithVideo />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/blog/grid" element={<BlogPage />} />
          <Route path="/blog/standard" element={<BlogPageList />} />
          <Route
            path="/blog/post/:postId"
            element={
              <BlogPostDetailWithSidebar
                onSearchClick={() => console.log("Search clicked")}
              />
            }
          />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/our-team" element={<MeetOurTeam />} />
          <Route path="/PageNotFound" element={<NotFoundPage />} />
          <Route path="/LookBook" element={<LookBook />} />
          <Route path="/FAQ" element={<FAQPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>

        <RecentlyViewedSidebar />
        <NewsletterSocials />
        <Footer />
      </div>

      {/* 5. Conditionally Render the Coupon Component as an Overlay */}
      {isCouponVisible && <Coupon onClose={closeCoupon} />}

      {/* --- NEW RENDER --- */}
      {/* 6. Conditionally Render the Upsell Modal */}
      {isUpsellModalOpen && <UpsellModal onClose={closeUpsellModal} />}
      {isCrossSellOpen && <CrossSell onClose={closeCrossSellModal} />}
    </>
  );
};

export default App;
