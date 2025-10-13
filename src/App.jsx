import React from "react";
import { Navbar } from "./components/layout";
import Home from "./pages/Home";

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Home />
        </div>
    );
};

export default App;
