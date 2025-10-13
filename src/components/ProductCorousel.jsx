// ProductCarousel.js

import React, { useRef } from "react";
// FIX 1: Assuming ProductCard is available in the current directory or specified in the file list.
import ProductCard from "./ProductCard";

// FIX 2: Creating a dummy ALL_PRODUCTS array since the external file "../productsData" cannot be resolved.
const ALL_PRODUCTS = [
    {
        id: 1,
        title: "Modern Design Book 1",
        author: "Jane Doe",
        price: "24.99",
        rating: 5,
        reviewCount: 150,
        discount: 15,
        imageUrl: "https://placehold.co/230x360/99f6e4/083344?text=Book+1",
    },
    {
        id: 2,
        title: "Abstract Art Guide",
        author: "Alex Smith",
        price: "39.99",
        rating: 4,
        reviewCount: 85,
        discount: 10,
        imageUrl: "https://placehold.co/230x360/a5f3fc/083344?text=Book+2",
    },
    {
        id: 3,
        title: "The Future of Tech",
        author: "Chris Lee",
        price: "49.99",
        rating: 5,
        reviewCount: 220,
        discount: 20,
        imageUrl: "https://placehold.co/230x360/f0abfc/083344?text=Book+3",
    },
    {
        id: 4,
        title: "Culinary Masterpieces",
        author: "Sam Chen",
        price: "19.50",
        rating: 3,
        reviewCount: 45,
        discount: null,
        imageUrl: "https://placehold.co/230x360/f5d0fe/083344?text=Book+4",
    },
    {
        id: 5,
        title: "Photography Basics",
        author: "Patel R.",
        price: "32.00",
        rating: 5,
        reviewCount: 300,
        discount: 5,
        imageUrl: "https://placehold.co/230x360/e9d5ff/083344?text=Book+5",
    },
    {
        id: 6,
        title: "History's Mysteries",
        author: "Kelly J.",
        price: "27.99",
        rating: 4,
        reviewCount: 120,
        discount: null,
        imageUrl: "https://placehold.co/230x360/fecdd3/083344?text=Book+6",
    },
    {
        id: 7,
        title: "Garden & Home Decor",
        author: "Risa T.",
        price: "21.99",
        rating: 5,
        reviewCount: 90,
        discount: 10,
        imageUrl: "https://placehold.co/230x360/fed7aa/083344?text=Book+7",
    },
    {
        id: 8,
        title: "Advanced Javascript",
        author: "Dev A.",
        price: "59.99",
        rating: 4,
        reviewCount: 180,
        discount: 15,
        imageUrl: "https://placehold.co/230x360/fde68a/083344?text=Book+8",
    },
];

// Reusable ProductCarousel component
const ProductCarousel = ({ title, productIds }) => {
    const scrollContainerRef = useRef(null);

    // Filter ALL_PRODUCTS based on the passed IDs (Option C logic)
    const products = productIds
        ? ALL_PRODUCTS.filter((p) => productIds.includes(p.id))
        : ALL_PRODUCTS;

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            // Scrolling by a percentage of the container width ensures responsiveness.
            const scrollWidth = scrollContainerRef.current.offsetWidth;
            const scrollAmount =
                direction === "left" ? -scrollWidth : scrollWidth;

            scrollContainerRef.current.scrollBy({
                left: scrollAmount / 2, // Scroll half a screen width for better viewing
                behavior: "smooth",
            });
        }
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

            {/* Carousel Content */}
            <div className="relative">
                {/* Scroll Buttons */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute z-10 top-1/2 -left-3 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity hidden lg:block"
                >
                    <svg
                        className="w-6 h-6 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <button
                    onClick={() => scroll("right")}
                    className="absolute z-10 top-1/2 -right-3 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity hidden lg:block"
                >
                    <svg
                        className="w-6 h-6 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>

                <div
                    ref={scrollContainerRef}
                    // Added gap-4 for spacing between cards and ensured scrollbar-hide works
                    className="flex overflow-x-auto pb-4 -mb-4 scrollbar-hide gap-4"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            // *** RESPONSIVE WIDTH CLASSES IMPLEMENTED ***
                            className="
                                flex-shrink-0 p-1
                                w-full                            /* w < 575px (Small/Default): 1 product (100% width) */
                                sm:w-1/2                          /* sm:w-1/2 (Width < 1200px): 2 products (50% width each) */
                                lg:w-1/3                          /* Added an intermediate step for tablets */
                                xl:w-[calc(100%/6)]               /* xl:w-1/6 (Full Width > 1280px): 6 products (approx 16.66% each) */
                                scroll-snap-align-start
                            "
                        >
                            {/* Use the imported ProductCard */}
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ProductCarousel;
