import React from "react";
import { Navbar } from "./components/layout";
import Home from "./pages/Home";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Home />
        </div>
    );
};

export default App;
