// src/components/product/BookstoreHome.jsx

import React from "react";
import CategoryBanner from "./CategoryBanner";
import ProductList from "../components/ProductList";
import ProductCarousel from "../components/product/ProductCorousel"; // Import your existing carousel component
import useRecentlyViewed from "../hooks/useRecentlyViwed"; // Import your hook
import ALL_PRODUCTS from "../components/productsData";
import Footer from "./Footer";
import NewsletterSocials from "./product/NewsletterSocials";

// Filter for the 'Recently Viewed' section shown in image_12977e.jpg
const RECENTLY_VIEWED_IDS = [24, 1];
const recentlyViewedProducts = ALL_PRODUCTS.filter((p) =>
    RECENTLY_VIEWED_IDS.includes(p.id)
);

const BookstoreHome = () => {
    // Initialize the recently viewed hook
    const { addRecentlyViewed } = useRecentlyViewed();

    // Define the handler to be passed to ProductCard
    const handleViewProduct = (product) => {
        // 1. Add product to the recently viewed list
        addRecentlyViewed(product);

        // 2. Navigation logic goes here (e.g., navigate to a product detail page)
        console.log(`Navigating to detail page for: ${product.title}`);
        // Example: navigate(`/product/${product.id}`);
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* 1. Category Banner (image_129701.png) */}
            <CategoryBanner />

            <main>
                {/* 2. Main Product List (Filters + Grid) */}
                <ProductList onViewProduct={handleViewProduct} />

                {/* 3. Recently Viewed Section (image_12977e.jpg - but using your Carousel component) */}
                {/* NOTE: I am using your ProductCarousel component for this section, 
                         as it handles the slick slider logic. */}
                <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-4xl font-serif font-light text-center text-gray-900 mb-8">
                        Recently viewed products
                    </h2>

                    {/* The ProductCarousel needs to be adapted or used here. 
                        Since your ProductCarousel is built for ALL_PRODUCTS and filtering by ID, 
                        we'll pass the IDs of the products shown in your image_12977e.jpg. */}
                    <ProductCarousel
                        title="Recently viewed products" // The title is ignored by the carousel but is a prop
                        productIds={RECENTLY_VIEWED_IDS}
                        onViewProduct={handleViewProduct}
                    />
                </section>
            </main>
            <NewsletterSocials></NewsletterSocials>
            <Footer></Footer>
        </div>
    );
};

export default BookstoreHome;
