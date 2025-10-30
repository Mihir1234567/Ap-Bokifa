// App.jsx (Final Version)

import React from "react";
import { Navbar } from "./components/layout";
import Home from "./pages/Home";
import RecentlyViewedSidebar from "./components/RecentlyViewedSidebar"; // 👈 New Import

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Home />
            {/* 🌟 FIX: Sidebar is now a direct child of App, listening to the hook */}
            <RecentlyViewedSidebar />
        </div>
    );
};

export default App;
