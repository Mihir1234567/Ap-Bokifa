// ProductCarousel.js

import React, { useRef } from "react";
// FIX 1: Assuming ProductCard is available in the current directory or specified in the file list.
import ProductCard from "./ProductCard";
import ALL_PRODUCTS from "../productsData";
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
                
                <div
                    ref={scrollContainerRef}
                    // Added gap-4 for spacing between cards and ensured scrollbar-hide works
                    className="flex overflow-x-auto pb-4 -mb-4 scrollbar-hide gap-4"
                    style={{ scrollSnapType: "none" }}
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
