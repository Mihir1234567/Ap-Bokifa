// App.jsx

import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
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

// --- NEW IMPORTS ---
import UpsellModal from "./components/UpsellModal"; // 1. Import the new modal

const App = () => {
    // 1. State to control the visibility of the coupon
    const [isCouponVisible, setIsCouponVisible] = useState(false);

    // --- NEW STATE ---
    // 2. Add new state for the upsell modal
    const [isUpsellModalOpen, setIsUpsellModalOpen] = useState(false);

    // Get current location to detect route changes
    const location = useLocation();

    // 🚀 Effect to refresh page when route changes
    useEffect(() => {
        // Store the previous location to avoid refresh on initial mount
        const previousLocation = sessionStorage.getItem("previousLocation");
        const currentLocation = location.pathname + location.search;

        if (previousLocation && previousLocation !== currentLocation) {
            // Route has changed, refresh the page
            window.location.reload();
        }

        // Update the stored location
        sessionStorage.setItem("previousLocation", currentLocation);
    }, [location.pathname, location.search]);

    // 💡 --- EFFECT TO BLOCK SCROLL --- 💡
    useEffect(() => {
        // This function blocks/unblocks body scrolling
        const body = document.body;
        // Check for both modals
        if (isUpsellModalOpen || isCouponVisible) {
            body.style.overflow = "hidden"; // Disable scroll
        } else {
            body.style.overflow = "auto"; // Enable scroll
        }

        // Cleanup function to re-enable scroll when component unmounts
        return () => {
            body.style.overflow = "auto";
        };
    }, [isUpsellModalOpen, isCouponVisible]); // 💡 Runs when *either* modal's state changes

    // 2. Function to close the coupon modal (used by the 'X' button)
    const closeCoupon = () => {
        setIsCouponVisible(false);
    };

    // 4. Function for manual trigger (you can call this from any component)
    const showCouponManually = () => {
        setIsCouponVisible(true);
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

    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* 4. Pass the open function to your Navbar */}
                <Navbar onUpsellClick={openUpsellModal} />

                <Routes>
                    {/* Your existing routes */}
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/couponTest"
                        // 💡 FIXED: Typo `showCouponManally` changed to `showCouponManually`
                        element={<Home showCoupon={showCouponManually} />}
                    />
                    <Route path="/leftSidebar" element={<BookstorePage />} />
                    <Route
                        path="/collections/categories"
                        element={<CategoryLanding />}
                    />
                    <Route
                        path="/collections/books"
                        element={<CollectionsBooks />}
                    />

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
        </>
    );
};

export default App;
