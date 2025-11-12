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
        // Use updater form to compute newItems and persist immediately
        setViewedItems((currentItems) => {
            const filtered = currentItems.filter(
                (item) => item.id !== product.id
            );
            const newItems = [product, ...filtered].slice(0, MAX_ITEMS);

            // Persist to localStorage synchronously to keep other tabs/windows in sync
            try {
                window.localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(newItems)
                );
            } catch (error) {
                console.error("Error writing to local storage:", error);
            }

            // Broadcast update within the same window so other components update instantly
            try {
                const event = new CustomEvent("recently-viewed-updated", {
                    detail: newItems,
                });
                window.dispatchEvent(event);
            } catch {
                // If CustomEvent isn't available for some reason, ignore silently
            }

            return newItems;
        });
    };

    // 🌟 NEW: Helper boolean for conditional rendering
    const hasViewedItems = viewedItems.length > 0;

    // Listen for broadcasts inside the same window so different components using this hook
    // update instantly when any component adds a recently viewed item.
    useEffect(() => {
        const handler = (e) => {
            if (e && e.detail) {
                setViewedItems(e.detail);
            }
        };

        window.addEventListener("recently-viewed-updated", handler);
        return () =>
            window.removeEventListener("recently-viewed-updated", handler);
    }, []);

    return {
        viewedItems,
        addRecentlyViewed,
        MAX_ITEMS,
        hasViewedItems, // 🌟 EXPORT NEW HELPER
    };
};

export default useRecentlyViewed;
