// App.jsx (Your uploaded file - ensure BookstoreHome import is correct)

import React from "react";
// 👈 NEW: Import the routing components
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; // 👈 Assuming your Navbar is here
import Home from "./pages/Home";

import RecentlyViewedSidebar from "./components/RecentlyViewedSidebar";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookstoreHome from "./components/BookstoreHome";

// 🌟 Ensure this path is correct based on where you place the new file

const App = () => {
    return (
        // 1. Wrap the entire app in BrowserRouter
        <>
            <div className="flex flex-col min-h-screen">
                {/* Navbar is rendered on ALL pages */}
                <Navbar />

                {/* 2. Routes define the content that changes */}
                <Routes>
                    {/* Route for the Home Page */}
                    <Route path="/" element={<Home />} />

                    {/* Route for the Products Page */}
                    <Route path="/leftSidebar" element={<BookstoreHome />} />

                    {/* Add a 404/Not Found route here if needed */}
                </Routes>

                {/* Sidebar is rendered on ALL pages */}
                <RecentlyViewedSidebar />
            </div>
        </>
    );
};

export default App;
