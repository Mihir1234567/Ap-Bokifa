// App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom"; //

import Navbar from "./components/Navbar"; //
import Home from "./pages/Home"; //
import RecentlyViewedSidebar from "./components/RecentlyViewedSidebar"; //
import Footer from "./components/Footer"; //
import NewsletterSocials from "./components/product/NewsletterSocials"; //

// 🌟 1. IMPORT YOUR NEW COMPONENT
import BookstorePage from "./pages/BookstorePage"; // <-- Adjust path if needed

import "slick-carousel/slick/slick.css"; //
import "slick-carousel/slick/slick-theme.css"; //

const App = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <Routes>
                    {/* Your existing home route */}
                    <Route path="/" element={<Home />} />

                    {/* 🌟 2. ADD THE NEW ROUTE FOR YOUR BOOKSTORE PAGE */}
                    <Route path="/leftSidebar" element={<BookstorePage />} />

                    {/* This was the commented-out route from your file */}
                    {/* <Route path="/leftSidebar" element={<BookstoreHome />} /> */}
                </Routes>

                <RecentlyViewedSidebar />
                <NewsletterSocials />
                <Footer />
            </div>
        </>
    );
};

export default App;
