// src/hooks/useRecentlyViwed.jsx

import { useState, useEffect } from "react";

const STORAGE_KEY = "recentlyViewedItems";
const MAX_ITEMS = 5; // Limits the number of items stored

const useRecentlyViewed = () => {
    // Initialize state from local storage or an empty array
    const [viewedItems, setViewedItems] = useState(() => {
        try {
            const item = window.localStorage.getItem(STORAGE_KEY);
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error("Error reading from local storage:", error);
            return [];
        }
    });

    // Effect to update local storage whenever viewedItems changes
    useEffect(() => {
        try {
            window.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(viewedItems)
            );
        } catch (error) {
            console.error("Error writing to local storage:", error);
        }
    }, [viewedItems]);

    // Function to add a product to the recently viewed list
    const addRecentlyViewed = (product) => {
        setViewedItems((currentItems) => {
            // 1. Remove the product if it's already in the list to move it to the front
            const filtered = currentItems.filter(
                (item) => item.id !== product.id
            );

            // 2. Add the new product to the beginning
            const newItems = [product, ...filtered];

            // 3. Limit the array size (e.g., to the 5 most recent items)
            return newItems.slice(0, MAX_ITEMS);
        });
    };

    // 🌟 NEW: Helper boolean for conditional rendering
    const hasViewedItems = viewedItems.length > 0;

    return {
        viewedItems,
        addRecentlyViewed,
        MAX_ITEMS,
        hasViewedItems, // 🌟 EXPORT NEW HELPER
    };
};

export default useRecentlyViewed;
