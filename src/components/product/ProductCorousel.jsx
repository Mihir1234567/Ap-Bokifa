// ProductCarousel.jsx

import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import ALL_PRODUCTS from "../productsData";

// Import react-slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { s } from "framer-motion/client";

// Reusable ProductCarousel component
// 🌟 Change: Accept the onViewProduct prop
const ProductCarousel = ({ title, productIds, onViewProduct }) => {
    // Filter ALL_PRODUCTS based on the passed IDs
    const products = productIds
        ? ALL_PRODUCTS.filter((p) => productIds.includes(p.id))
        : ALL_PRODUCTS;

    // Configuration settings for the react-slick carousel
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        arrows: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
            // ... (rest of responsive settings)
            {
                // Custom breakpoint: screens < 1200px, show 2 large cards
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                // Custom breakpoint: screens < 5...
            },
        ],
    };

    return (
        <div className="py-12 px-4 sm:px-8 bg-gray-50">
            {/* Header section (unchanged) */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-serif font-light text-gray-900">
                    {title}
                </h2>
                <div className="flex items-center space-x-4">
                    <a
                        href="#"
                        className="
                            inline-flex items-center
                            justify-center
                            px-6 py-3
                            rounded-full
                            bg-white shadow-lg
                            text-base font-semibold text-gray-900
                            whitespace-nowrap
                            transition-all duration-300
                            hover:bg-gray-900
                            hover:text-white
                            hover:shadow-xl
                        "
                    >
                        Browse All
                        <span className="ml-2 leading-none">&gt;</span>
                    </a>
                </div>
            </div>

            {/* Carousel Content - REPLACED WITH REACT-SLICK */}
            <div className="relative">
                <Slider {...sliderSettings}>
                    {products.map((product) => (
                        <div key={product.id} className="p-2">
                            {/* 🌟 Change: Pass the onViewProduct prop down to ProductCard */}
                            <ProductCard
                                product={product}
                                onViewProduct={onViewProduct}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ProductCarousel;
