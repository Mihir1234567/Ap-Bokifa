// src/pages/Home.jsx

import React from "react";
import { HeaderCorousel } from "../components/hero/HeaderCorousel";
import StatMarquee from "../components/hero/StatMarquee";
import ProductCarousel from "../components/product/ProductCorousel";
import Footer from "../components/Footer";
import { Categories } from "../components/product/Categories";
import ALL_PRODUCTS from "../components/productsData";
import ThrillerBanner from "../components/product/ThrillerBanner";
import { BannerGrid } from "../components/product/BannerGrid";
import { PicksForYouSection } from "../components/product/PicksForYouSection";
import FeaturedAuthors from "../components/product/AuthorsCorousel";
import { ClintTestemonialSection } from "../components/product/ClintTestemonialSection";
import { Services } from "../components/product/Services";
import NewsAndEvents from "../components/product/NewsAndEvents";
import NewsletterSocials from "../components/product/NewsletterSocials";
import useRecentlyViewed from "../hooks/useRecentlyViwed"; // Imported hook

const Home = () => {
    const { addRecentlyViewed } = useRecentlyViewed(); // Get the function

    const BestSellingIds = ALL_PRODUCTS.filter(
        (product) => product.currentBestselling
    ).map((product) => product.id);

    // ... (other product filters remain unchanged)
    const isHighlightIds = ALL_PRODUCTS.filter(
        (product) => product.isHighlight
    ).map((product) => product.id);

    const HalfPriced = ALL_PRODUCTS.filter(
        (product) => product.isHalfPrice
    ).map((product) => product.id);

    const smallBooks = ALL_PRODUCTS.filter(
        (product) => product.isPickForYou
    ).map((product) => product.id);

    const featuredBook = ALL_PRODUCTS.filter(
        (product) => product.isFeatured
    ).map((product) => product.id);

    return (
        <main className="flex-grow">
            <HeaderCorousel />
            <StatMarquee />
            <ProductCarousel
                title="This week's highlights"
                productIds={isHighlightIds}
                // PASS DOWN: Passing the function to the carousel
                onViewProduct={addRecentlyViewed}
            />
            <Categories></Categories>
            <ProductCarousel
                title="Current Bestsellers"
                productIds={BestSellingIds}
                // PASS DOWN: Passing the function to the carousel
                onViewProduct={addRecentlyViewed}
            />
            <ThrillerBanner />
            <ProductCarousel
                title="Current Bestsellers"
                productIds={HalfPriced}
                // PASS DOWN: Passing the function to the carousel
                onViewProduct={addRecentlyViewed}
            />
            <BannerGrid />
            <PicksForYouSection
                featuredBooks={featuredBook}
                smallBook={smallBooks}
                // PASS DOWN: Passing the function to the section
                onViewProduct={addRecentlyViewed}
            />
            <FeaturedAuthors></FeaturedAuthors>
            <ClintTestemonialSection />
            <Services />
            <NewsAndEvents />
            <NewsletterSocials />
            <Footer />
        </main>
    );
};

export default Home;
