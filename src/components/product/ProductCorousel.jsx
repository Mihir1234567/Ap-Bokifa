// ProductCarousel.js

import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard"; // Assuming this path is correct
import ALL_PRODUCTS from "../productsData"; // Assuming this path is correct

// Import react-slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { s } from "framer-motion/client";

// Reusable ProductCarousel component
// 🌟 MODIFICATION 1: Accept the onViewProduct prop
const ProductCarousel = ({ title, productIds, onViewProduct }) => {
    // Filter ALL_PRODUCTS based on the passed IDs
    const products = productIds
        ? ALL_PRODUCTS.filter((p) => productIds.includes(p.id))
        : ALL_PRODUCTS;

    // Configuration settings for the react-slick carousel
    const sliderSettings = {
        dots: false,
        infinite: false, // Only be infinite if there are more products than can be shown
        speed: 500,
        arrows: false, // Show the default navigation arrows
        slidesToShow: 6, // Default for desktop (screens >= 1200px)
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
            {
                // Custom breakpoint: screens < 1200px, show 2 large cards
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                // Custom breakpoint: screens < 575px, show 1 large card
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full bg-white mx-auto py-8 px-4 pt-20 sm:px-6 font-sans">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
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
                            {/* The padding creates the 'gap' between slides */}
                            {/* 🌟 MODIFICATION 2: Pass onViewProduct to ProductCard */}
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
