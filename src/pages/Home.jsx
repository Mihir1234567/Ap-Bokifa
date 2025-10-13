import React from "react";
import { HeaderCorousel } from "../components/hero/HeaderCorousel";
import StatMarquee from "../components/hero/StatMarquee";
import ProductCarousel from "../components/product/ProductCorousel";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <main className="flex-grow">
            <HeaderCorousel />
            <StatMarquee />
            <ProductCarousel title="This week's highlights" />
            <Footer />
        </main>
    );
};

export default Home;
