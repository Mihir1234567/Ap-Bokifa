import React, { useState } from "react";

// Reusable StarRating component
const StarRating = ({ rating, reviewCount }) => {
    return (
        <div className="flex items-center">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 fill-current ${
                            i < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}
            </div>
            <span className="text-gray-500 text-sm ml-2">({reviewCount})</span>
        </div>
    );
};

// Reusable ProductCard component
const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div className="flex flex-col flex-shrink-0 w-60 m-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out group">
            <div className="relative overflow-hidden rounded-t-lg">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.discount}%
                    </div>
                )}
                {/* Icons Overlay */}
                <div className="absolute top-4 right-4 flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors shadow"
                    >
                        <svg
                            className={`w-5 h-5 ${
                                isWishlisted
                                    ? "text-red-500 fill-current"
                                    : "text-gray-700"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                            />
                        </svg>
                    </button>
                    <button className="relative bg-white rounded-full p-2 hover:bg-gray-200 transition-colors shadow group/tooltip">
                        <svg
                            className="w-5 h-5 text-gray-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-max px-3 py-1.5 bg-gray-800 text-white text-xs font-semibold rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
                            Quick view
                        </span>
                    </button>
                    <button className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors shadow">
                        <svg
                            className="w-5 h-5 text-gray-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-md font-semibold text-gray-800 truncate">
                    {product.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{product.author}</p>
                <div className="mt-2">
                    {/* Use the imported StarRating component */}
                    <StarRating
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                    />
                </div>
                <p className="text-lg font-bold text-green-600 mt-3">
                    ${product.price}
                </p>
            </div>
            {/* Add To Cart Button */}
            <div className="px-4 pb-4 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
                <button className="w-full bg-green-700 text-white font-bold py-2.5 px-4 rounded-full flex items-center justify-center hover:bg-green-800 transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                    Add To Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
