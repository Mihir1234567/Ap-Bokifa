import React, { useState } from "react";

// (StarRating component remains unchanged)
const StarRating = ({ rating, reviewCount }) => {
    // Determine the number of filled stars based on the rating prop
    const filledStars = Math.floor(rating || 0);
    // Determine the review count to display, defaulting to 0 if not provided
    const displayReviewCount = reviewCount === undefined ? 0 : reviewCount;

    return (
        // Matches the centered, subtle look from the image
        <div className="flex items-center justify-center">
            <div className="flex text-yellow-400">
                {/* Always render 5 stars for consistent layout */}
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 fill-current ${
                            // Use rating prop for filled stars
                            i < filledStars
                                ? "text-yellow-400"
                                : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}
            </div>
            {/* Displaying review count in a subtle gray, small font, and centered */}
            <span className="text-gray-500 text-sm ml-1">
                ({displayReviewCount || 0})
            </span>
        </div>
    );
};

// Component to match the style of the product card in the image
// MODIFIED: Added onViewProduct prop
const ProductCard = ({ product, onViewProduct }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        // MODIFIED: Added onClick handler to the main div and added cursor-pointer class
        <div
            className="group flex flex-col flex-shrink-0 w-full bg-white rounded-xl shadow-none hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => onViewProduct(product)} // <-- KEY CHANGE
        >
            <div className="relative  rounded-t-xl">
                {/* Image Scaling on Hover */}
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    // KEY CHANGE: Replaced fixed height (h-[360px]) with a responsive aspect ratio.
                    // aspect-[2/3] means Height = 1.5 * Width, ensuring proportional scaling.
                    className="w-full aspect-[2/3] object-cover transition-transform duration-300 rounded-t-xl"
                />

                {/* Discount tag (e.g., -15%) is present and styled differently on the top-left */}
                {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-base font-bold rounded-full w-10 h-10 flex items-center justify-center z-10">
                        <span className="text-xs font-semibold">
                            -{product.discount}%
                        </span>
                    </div>
                )}
                {product.isSoldOut && (
                    <div className="absolute top-3 left-3 bg-gray-600 text-white text-base font-bold rounded-full w-10 h-10 flex items-center justify-center z-10">
                        <span className="text-xs  text-center font-semibold">
                            Sold Out
                        </span>
                    </div>
                )}

                {/* Icon Bar: Quick View and Compare appear on card hover. */}
                <div className="absolute top-3 right-3 flex flex-col items-center space-y-2 z-10">
                    {/* 1. Wishlist Icon: Always visible */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevents card click from being registered
                            setIsWishlisted(!isWishlisted);
                        }}
                        // Added aria-label for accessibility
                        aria-label={
                            isWishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                        }
                        className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md"
                    >
                        <svg
                            className={`w-5 h-5 ${
                                isWishlisted
                                    ? "text-red-500 fill-current"
                                    : "text-gray-900"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                            />
                        </svg>
                    </button>

                    {/* Improvement 2: Icon Staggered Fade-In (Quick View) */}
                    <button
                        aria-label="Quick view product details"
                        className="group/icon relative bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"
                        onClick={(e) => e.stopPropagation()} // Prevents card click from being registered
                    >
                        {/* Tooltip: Visible only on icon hover (group-hover/icon) */}
                        <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 whitespace-nowrap">
                            Quick view
                        </span>
                        {/* Icon (Eye) */}
                        <svg
                            className="w-5 h-5 text-gray-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                    </button>

                    {/* Improvement 3: Icon Staggered Fade-In (Compare) */}
                    <button
                        aria-label="Add product to comparison list"
                        className="group/icon relative bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 transform translate-x-4 group-hover:translate-x-0"
                        onClick={(e) => e.stopPropagation()} // Prevents card click from being registered
                    >
                        {/* Tooltip: Visible only on icon hover (group-hover/icon) */}
                        <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 whitespace-nowrap">
                            Add to compare
                        </span>
                        {/* Icon (Refresh/Loop) */}
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACn0lEQVR4nO2ZS2sUQRSFv8SJj504iK+sowgSNBgmiX/CTUQCgoguFNdqloJmqRiNf0CREGahgqILEbMQtxpXSkCN4GjizvhI4siF01AMkUzPVJUW9AfNvGrqcrpuV9U9BQUFBQU56QAOAqPAJPAaqAE/gF/AV2AGqAIXgArQSSReAM/XaLMTuAx8BOo5rw/AGNAdWkhd12psAa4DP51274Bx4BjQC2wDNgJdQBnYDxwFbgBvnf9ZHxNqE1XIMDCv31aUShWlVx4GgFvAkvqaB44QQUiX7mb2/RNgj4c4PcBDp18bnRKBhFiK3NNne4BPtTACa3EC+KYY94FNvoXY3Xmg9zWlUSj6FCMTU/Ip5JpevwD7CE+PI8ZSuW3cqdLSqZ949AGLim2TizchZ4jPScX+rOm+ZZpd2KYJxyPFsPUpuJBnhGM3sKzU3kXi3NYNs61Q0gxKyBywjoTpAGYlJubMGYSbEnKexBmRkCkS54CEvCRxtjrbJK+VYWw2OFulpsmqvvX8X0znXXwXJCRY6RmLGQmxGjtpqhJiRkHSjPosav4lFQl5E6Auj0on8F5izLJJmjEJMd8pabq1nizJDAi5NjRbwLXMhDow8yxpIWXHGjXzLDZnfQlBXmxdDqBZNLEYaDDI2xbiplgt8POS0tsk674FFKSfZmJCTkyQ/KxLNZd1ejehCBDOROzKPPMJ7bwnnbSqersvr0KyUbGPVZ4LN+pXfYCT9Xnb+Bqg3ntXUjGsDP8y/KdBnNuZ6ztId35FSdtD6/SNpgQ5MWOq2LLAs3K7RhRjV1WetjZyg6VBcc1ecw1GOQ2Cpv/EiuoEPcw9JKzN8tz2ZnjRWC778qw3Y1mv3ynKbkdC3p4vwOfgFfAHeCcRqygoKCAXPwB0TURifa7dFwAAAAASUVORK5CYII="
                            alt="update-left-rotation"
                            className="h-5 "
                        />
                    </button>
                </div>

                {/* Star Rating container for overlapping placement */}
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-20 p-2 bg-white rounded-full border-t border-gray-200">
                    <StarRating
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                    />
                </div>
            </div>

            {/* Product details section - Start padding moved down to account for the overlapping rating */}
            {/* Added subtle translateY on hover to accompany the "Add to Cart" button animation */}
            <div className="p-2 pt-6 flex-grow flex flex-col items-center text-center transition-transform duration-300 group-hover:translate-y-[-8px]">
                <h3 className="text-xl font-serif font-light text-gray-900 leading-snug">
                    {product.title}
                </h3>

                {/* Author as a clickable link */}
                <a
                    href="#"
                    className="text-base text-gray-500 mt-1 hover:text-gray-900 hover:underline"
                    onClick={(e) => e.stopPropagation()} // Prevents card click from being registered
                >
                    {product.author}
                </a>

                <p
                    className={
                        product.isSoldOut
                            ? "text-2xl font-bold text-gray-500 mt-3 "
                            : "text-2xl font-bold text-green-700 mt-3"
                    }
                >
                    ${product.price}
                </p>
            </div>

            {/* Add to Cart button slides up */}
            <div className="p-3 pt-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform -translate-y-24 group-hover:translate-y-0">
                <button
                    className={
                        product.isSoldOut
                            ? "w-full bg-gray-300 text-gray-500 font-bold py-2.5 px-4 rounded-full flex items-center justify-center cursor-not-allowed text-sm"
                            : "w-full bg-green-700 text-white font-bold py-2.5 px-4 rounded-full flex items-center justify-center hover:bg-green-800 transition-colors text-sm"
                    }
                    onClick={(e) => e.stopPropagation()} // Prevents card click from being registered
                >
                    {/* The SVG path for the Add to Cart button matches the image */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        {/* Note: It's also a good idea to conditionally hide the plus icon when sold out */}
                        {product.isSoldOut ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        )}
                    </svg>
                    {product.isSoldOut ? "Sold Out" : "Add To Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
