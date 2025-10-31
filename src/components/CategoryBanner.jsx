// src/components/product/CategoryBanner.jsx

import React from "react";

const CategoryBanner = () => {
    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-100">
            {/* Breadcrumb */}
            <nav className="mb-4 text-sm font-normal text-gray-500">
                <a href="/" className="hover:text-gray-700">
                    <span className="inline-block">
                        <img src="/src/assets/home.svg" alt="" />{" "}
                    </span>{" "}
                    Home
                </a>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Books New</span>
            </nav>

            {/* Page Title */}
            <h1 className="text-6xl font-serif font-light text-gray-900 mb-6 tracking-wide">
                Books New
            </h1>

            {/* Subtitle/Description */}
            <p className="max-w-3xl mx-auto text-base text-gray-700 leading-relaxed">
                Discover your favorite book: you will find a wide range of
                selected books from bestseller to newcomer, children's book to
                crime novel or thriller to science fiction novel.
            </p>
        </div>
    );
};

export default CategoryBanner;
