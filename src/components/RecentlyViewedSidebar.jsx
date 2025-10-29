// src/components/RecentlyViewedSidebar.jsx

import React, { useState } from "react";
// Import the user's custom hook
import useRecentlyViewed from "../hooks/useRecentlyViwed";

// --- Component for a single item in the sidebar list ---
const SidebarItem = ({ item }) => (
    <div className="flex items-center space-x-3 p-2 border-b border-gray-100 hover:bg-gray-50 transition duration-150">
        <div className="w-12 h-16 shrink-0 rounded-sm bg-gray-100 overflow-hidden">
            <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
            />
        </div>
        <div className="flex-grow">
            <h4 className="text-sm font-semibold text-gray-800 truncate">
                {item.title}
            </h4>
            <p className="text-xs text-gray-500">{item.author}</p>
            <p className="text-md font-bold text-green-700">
                {/* Ensure price is displayed with two decimal places */}$
                {Number(item.price).toFixed(2)}
            </p>
        </div>
        <a
            href={`/product/${item.id}`} // Placeholder link to the product page
            className="text-xs text-indigo-600 hover:text-indigo-800 shrink-0"
            // Stop propagation so clicking 'View' doesn't close the sidebar
            onClick={(e) => e.stopPropagation()}
        >
            View
        </a>
    </div>
);

// --- Main Sidebar Component ---
const RecentlyViewedSidebar = () => {
    // Access state and constants from the hook
    const { viewedItems, MAX_ITEMS } = useRecentlyViewed();
    const [isOpen, setIsOpen] = useState(false);

    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);

    const itemCount = viewedItems.length;

    return (
        <>
            {/* 1. Floating Button (Always visible) */}
            <button
                onClick={openSidebar}
                className="fixed bottom-6 right-6 z-30 p-4 bg-indigo-600 text-white rounded-lg shadow-2xl hover:bg-indigo-700 transition flex items-center space-x-2 transform hover:scale-105"
                title="View Recent Products"
            >
                {/* Eye Icon */}
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                </svg>
                {/* Counter Badge */}
                <span className="font-semibold">{itemCount} Recent</span>
            </button>

            {/* 2. Backdrop for click-to-close */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={closeSidebar}
            ></div>

            {/* 3. Sidebar Panel */}
            <div
                className={`fixed top-0 right-0 w-80 max-w-full h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        Recently Viewed
                    </h2>
                    <button
                        onClick={closeSidebar}
                        className="text-gray-500 hover:text-gray-800 text-3xl transition"
                        aria-label="Close sidebar"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-3 space-y-2 overflow-y-auto h-[calc(100vh-65px)]">
                    {itemCount === 0 ? (
                        <p className="p-2 text-gray-500 italic text-center">
                            No products viewed yet. Click a book card!
                        </p>
                    ) : (
                        <>
                            <p className="text-sm text-gray-600 px-1 pb-1 border-b">
                                Showing {itemCount} of {MAX_ITEMS} recent items
                            </p>
                            {viewedItems.map((item) => (
                                <SidebarItem key={item.id} item={item} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default RecentlyViewedSidebar;
