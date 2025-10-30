// ProductCard.jsx

import React, { useState } from "react";

const StarRating = ({ rating, reviewCount }) => {
    const filledStars = Math.floor(rating || 0);
    const displayReviewCount = reviewCount === undefined ? 0 : reviewCount;

    return (
        <div className="flex items-center justify-center">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 fill-current ${
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
            <span className="text-gray-500 text-sm ml-1">
                ({displayReviewCount || 0})
            </span>
        </div>
    );
};

const ProductCard = ({ product, onViewProduct }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div
            className="group flex flex-col flex-shrink-0 w-full bg-white rounded-xl shadow-none hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => onViewProduct(product)} // 争 Calls the update function
        >
            <div className="relative rounded-t-xl overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full aspect-[2/3] object-cover transition-transform duration-300 rounded-t-xl group-hover:scale-105"
                />

                {/* Discount tag */}
                {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-base font-bold rounded-full w-10 h-10 flex items-center justify-center z-10">
                        <span className="text-xs font-semibold">
                            -{product.discount}%
                        </span>
                    </div>
                )}
                {product.isSoldOut && (
                    <div className="absolute top-3 left-3 bg-gray-600 text-white text-base font-bold rounded-full w-10 h-10 flex items-center justify-center z-10">
                        <span className="text-xs text-center font-semibold">
                            Sold Out
                        </span>
                    </div>
                )}

                {/* Icon Bar consolidated on the right */}
                {/* MODIFIED: Outer div is now always visible */}
                <div className="absolute top-3 right-3 flex flex-col items-center space-y-2 z-10 transition-opacity duration-300">
                    {/* 1. Wishlist Icon (Heart) - PERMANENTLY VISIBLE */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // 争 Prevents card click
                            setIsWishlisted(!isWishlisted);
                        }}
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

                    {/* NEW: Container for Hover-only icons */}
                    <div className="flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* 2. Quick View */}
                        <button
                            aria-label="Quick view product details"
                            className="group/icon relative bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md"
                            onClick={(e) => e.stopPropagation()} // 争 Prevents card click
                        >
                            <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 whitespace-nowrap">
                                Quick view
                            </span>
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

                        {/* 3. Compare */}
                        <button
                            aria-label="Add product to comparison list"
                            className="group/icon relative bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md"
                            onClick={(e) => e.stopPropagation()} // 争 Prevents card click
                        >
                            <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 whitespace-nowrap">
                                Add to compare
                            </span>
                            <img
                                src="/src/assets/compare.svg"
                                alt="update-left-rotation"
                                className="h-5 "
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Product details section */}
            <div className="p-4 flex-grow flex flex-col items-center text-center transition-transform duration-300 group-hover:translate-y-[-8px]">
                <StarRating
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                />

                <h3 className="text-xl font-serif font-light text-gray-900 leading-snug mt-2">
                    {product.title}
                </h3>

                <a
                    href="#"
                    className="text-base text-gray-500 mt-1 hover:text-gray-900 hover:underline"
                    onClick={(e) => e.stopPropagation()}
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
                    onClick={(e) => e.stopPropagation()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
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
