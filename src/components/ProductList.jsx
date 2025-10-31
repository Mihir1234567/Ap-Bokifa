// src/components/product/ProductList.jsx

import React, { useState } from "react";
import ProductCard from "./product/ProductCard"; // Assuming ProductCard is imported or available
import ALL_PRODUCTS from "../components/productsData.js"; // Assuming productsData.js is in the root/src directory

// --- Helper Component for Sidebar Filters ---
const FilterGroup = ({ title, options }) => {
    // State to toggle the filter group visibility, matching the accordion style
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-gray-200 py-5">
            <button
                type="button"
                className="w-full flex justify-between items-center text-left text-gray-800 hover:text-gray-900"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-base font-medium">{title}</h3>
                <span className="text-xl font-light text-gray-500">
                    {isOpen ? "−" : "+"}
                </span>
            </button>

            {isOpen && (
                <div className="pt-4 space-y-3">
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                id={`filter-${title}-${index}`}
                                name={`${title.toLowerCase()}[]`}
                                type="checkbox"
                                // Using gray-900 to match the dark text/style
                                className="h-4 w-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900"
                            />
                            <label
                                htmlFor={`filter-${title}-${index}`}
                                className="ml-3 text-sm text-gray-600"
                            >
                                {option.label} ({option.count})
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Main ProductList Component ---
const ProductList = ({ onViewProduct }) => {
    // In a real app, this data would be managed by state and filtering logic.
    // For display purposes, we use ALL_PRODUCTS.
    const productsToDisplay = ALL_PRODUCTS;

    const filterOptions = {
        categories: [
            { label: "Books", count: 28 },
            { label: "Books New", count: 28 },
            { label: "Family", count: 7 },
            { label: "Fantasy", count: 7 },
            { label: "Fiction", count: 28 },
            { label: "Horror", count: 7 },
        ],
        availability: [
            {
                label: "In stock",
                count: productsToDisplay.filter((p) => !p.isSoldOut).length,
            },
            {
                label: "Out of stock",
                count: productsToDisplay.filter((p) => p.isSoldOut).length,
            },
        ],
        format: [
            { label: "Audio cd", count: 28 },
            { label: "Ebook", count: 28 },
            { label: "Hardcover", count: 28 },
            { label: "Paperback", count: 28 },
        ],
        brand: [
            { label: "Ap Bokifa", count: 28 }, // Example from your image
        ],
        rating: [
            {
                label: "1 Star & up",
                count: productsToDisplay.filter((p) => p.rating >= 1).length,
            },
        ],
    };

    return (
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Product Count & Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 mb-8">
                <div className="text-sm font-medium text-gray-700 mb-2 sm:mb-0">
                    Product categories / {productsToDisplay.length} products
                </div>
                <div className="flex items-center">
                    <label
                        htmlFor="sort-by"
                        className="text-sm text-gray-700 mr-2"
                    >
                        Sort by:
                    </label>
                    <select
                        id="sort-by"
                        name="sort-by"
                        className="py-1 pl-3 pr-8 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-gray-900 focus:border-gray-900"
                    >
                        <option>Best selling</option>
                        <option>Newest</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Main Grid: Filters + Products */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
                {/* 1. Filter Sidebar (lg:col-span-1) */}
                <aside className="lg:col-span-1 p-4 bg-white border-r border-gray-100 lg:pr-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Product categories
                    </h2>
                    <div className="mb-8">
                        {/* Replicate the category list */}
                        {filterOptions.categories.map((cat, index) => (
                            <p
                                key={index}
                                className="text-base text-gray-700 py-1 hover:text-gray-900 cursor-pointer"
                            >
                                {cat.label}{" "}
                                <span className="text-sm text-gray-500">
                                    ({cat.count})
                                </span>
                            </p>
                        ))}
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Filters
                    </h2>

                    <FilterGroup
                        title="Availability"
                        options={filterOptions.availability}
                    />
                    <FilterGroup
                        title="Format"
                        options={filterOptions.format}
                    />
                    <FilterGroup title="Brand" options={filterOptions.brand} />
                    <FilterGroup
                        title="Product rating count"
                        options={filterOptions.rating}
                    />
                </aside>

                {/* 2. Product Grid (lg:col-span-3) */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                        {productsToDisplay.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onViewProduct={onViewProduct} // Pass the view handler
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
