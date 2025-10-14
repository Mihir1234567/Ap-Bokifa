import React from "react";
import { HeaderCorousel } from "../components/hero/HeaderCorousel";
import StatMarquee from "../components/hero/StatMarquee";
import ProductCarousel from "../components/product/ProductCorousel";
import Footer from "../components/Footer";
import { Categories } from "../components/product/Categories";
import ALL_PRODUCTS from "../components/productsData";
import ThrillerBanner from "../components/product/ThrillerBanner";
import { BannerGrid } from "../components/product/BannerGrid";
const Home = () => {
    const BestSellingIds = ALL_PRODUCTS.filter(
        (product) => product.currentBestselling
    ).map((product) => product.id);
    
    const isHighlightIds = ALL_PRODUCTS.filter(
        (product) => product.isHighlight
    ).map((product) => product.id);

    const HalfPriced = ALL_PRODUCTS.filter(
        (product) => product.isHalfPrice
    ).map((product) => product.id);

    return (
        <main className="flex-grow">
            <HeaderCorousel />
            <StatMarquee />
            <ProductCarousel title="This week's highlights" productIds={isHighlightIds} />
            <Categories></Categories>
            <ProductCarousel
                title="Current Bestsellers"
                productIds={BestSellingIds}
            />
            <ThrillerBanner />
            <ProductCarousel
                title="Current Bestsellers"
                productIds={HalfPriced}
            />
            <BannerGrid />
            <Footer />
        </main>
    );
};

export default Home;
