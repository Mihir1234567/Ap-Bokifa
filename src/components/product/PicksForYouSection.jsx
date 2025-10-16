import React from "react";
import { Heart, Star, ShoppingCart, Eye, GitCompareArrows } from "lucide-react";
import ALL_PRODUCTS from "../productsData";

// --- Helper component for displaying star ratings ---
const Rating = ({ count }) => (
    <div className="flex items-center text-sm space-x-0.5 text-amber-500">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={14}
                fill={i < count ? "currentColor" : "none"}
                stroke="currentColor"
            />
        ))}
        <span className="ml-1 text-gray-500 font-medium">({count})</span>
    </div>
);

// --- Helper component for a small book item ---
const SmallBookItem = ({ book }) => (
    <div className="flex items-start space-x-3 transition duration-300 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
        <div className="flex-shrink-0 w-16 h-24 lg:w-20 lg:h-30 overflow-hidden rounded-md shadow-lg">
            <div
                className="w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${book.imageUrl})`,
                    backgroundPosition: "center",
                }}
                role="img"
                aria-label={`Cover of ${book.title}`}
            ></div>
        </div>
        <div className="flex-grow pt-1 min-w-0">
            <Rating count={book.rating} />
            <p className="text-base lg:text-lg font-semibold text-gray-800 line-clamp-2 mt-1 leading-snug transition duration-150 hover:text-green-600">
                {book.title}
            </p>
            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 transition duration-150 hover:text-green-600">
                {book.author}
            </p>
            <p className="mt-2 text-lg font-extrabold text-green-700">
                ${book.price.toFixed(2)}
            </p>
        </div>
    </div>
);

// --- Main Component (Corrected circular discount) ---
export const PicksForYouSection = ({ featuredBooks, smallBook }) => {
    const featuredBook = ALL_PRODUCTS.find((book) =>
        featuredBooks.includes(book.id)
    );
    const smallBooks = ALL_PRODUCTS.filter((book) =>
        smallBook.includes(book.id)
    );

    if (!featuredBook || smallBooks.length === 0) {
        return (
            <div className="p-6 text-center text-red-500">
                Error: Book data not found.
            </div>
        );
    }

    return (
        <div className="mx-auto p-4 sm:p-6 mb-30">
            <div className="flex justify-between items-baseline mb-6 border-b pb-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                    Picks for you
                </h2>
                <button className="flex items-center text-base font-medium text-green-600 hover:text-green-800 transition">
                    Browse All{" "}
                    <span className="ml-2 text-xl font-normal">→</span>
                </button>
            </div>

            <div className="grid grid-cols-1  lg:grid-cols-2 gap-8 lg:gap-10">
                {/* 1. Large Featured Item */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-4 flex flex-col sm:flex-row lg:flex-row space-y-4 sm:space-y-0 sm:space-x-6 lg:col-span-1 lg:h-full transition duration-300 hover:shadow-xl">
                    {/* Image Container - Added 'group' for hover effects */}
                    <div className="group flex-shrink-0 w-full sm:w-1/3 lg:w-72 relative rounded-lg overflow-hidden shadow-2xl">
                        {/* Discount Tag - CORRECTED TO BE A CLEAN CIRCLE WITHIN IMAGE BOUNDS */}
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-sm font-extrabold flex items-center justify-center w-12 h-12 rounded-full shadow-md z-10">
                            <span>- {featuredBook.discount} %</span>
                        </div>

                        {/* Book Cover */}
                        <div
                            className="w-full h-80 sm:h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{
                                backgroundImage: `url(${featuredBook.imageUrl})`,
                            }}
                            role="img"
                            aria-label={`Cover of ${featuredBook.title}`}
                        ></div>

                        {/* Always visible Heart Icon */}
                        <div className="absolute top-2 right-2 z-20">
                            <div className="relative flex items-center group/icon">
                                <button className="bg-white/80 backdrop-blur-sm rounded-full p-2 text-red-500 hover:bg-white transition-colors shadow-md">
                                    <Heart
                                        size={20}
                                        fill="currentColor"
                                        stroke="none"
                                    />
                                </button>
                                <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none group-hover/icon:delay-300">
                                    Add to Wishlist
                                </span>
                            </div>
                        </div>

                        {/* Hover-only Icons Container */}
                        <div className="absolute top-14 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            {/* Eye Icon (Quick View) */}
                            <div className="relative flex items-center group/icon">
                                <button className="bg-white/80 backdrop-blur-sm rounded-full p-2 text-gray-700 hover:bg-white transition-colors shadow-md">
                                    <Eye size={20} strokeWidth={2} />
                                </button>
                                <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none group-hover/icon:delay-300">
                                    Quick View
                                </span>
                            </div>

                            {/* Compare Icon */}
                            <div className="relative flex items-center group/icon">
                                <button className="bg-white/80 backdrop-blur-sm rounded-full p-2 text-green-600 hover:bg-white transition-colors shadow-md">
                                    <GitCompareArrows
                                        size={20}
                                        strokeWidth={2}
                                    />
                                </button>
                                <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none group-hover/icon:delay-300">
                                    Compare Books
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Book Details */}
                    <div className="flex flex-col flex-grow pt-2">
                        <Rating count={featuredBook.rating} />
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 leading-tight transition duration-150 hover:text-green-600 cursor-pointer">
                            {featuredBook.title}
                        </h3>
                        <p className="text-base text-gray-600 italic mt-1 font-medium transition duration-150 hover:text-green-600 cursor-pointer">
                            {featuredBook.author}
                        </p>

                        <p className="text-sm text-gray-700 my-4 leading-relaxed line-clamp-4">
                            {featuredBook.description}
                        </p>

                        <p className="text-3xl font-extrabold text-green-700 mt-auto">
                            ${featuredBook.price.toFixed(2)}
                        </p>

                        <button className="mt-4 flex items-center justify-center space-x-2 bg-green-700 text-white text-lg font-semibold py-3 px-6 rounded-xl hover:bg-green-800 transition-colors shadow-lg shadow-green-200/50 w-full sm:w-fit">
                            <ShoppingCart size={20} strokeWidth={2.5} />
                            <span>Add To Cart</span>
                        </button>
                    </div>
                </div>

                {/* 2. Nested Container for Smaller Items */}
                <div className="lg:col-span-1 bg-white">
                    <div className="grid grid-cols-1 bg-white sm:grid-cols-2 gap-x-6 gap-y-4">
                        {smallBooks.map((book, index) => (
                            <SmallBookItem key={index} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
