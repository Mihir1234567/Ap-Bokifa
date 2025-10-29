import React from "react";
import { Navbar } from "./components/layout";
import Home from "./pages/Home";
// NEW IMPORT: Import the sidebar component
import RecentlyViewedSidebar from "./components/RecentlyViewedSidebar";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Home />
            {/* NEW: Render the RecentlyViewedSidebar component */}
            <RecentlyViewedSidebar />
        </div>
    );
};

export default App;
