import React from "react";

// Card Data - Mocking the content, colors, and placeholder images
const cardData = [
    {
        id: 1,
        category: "Game: Anime: Life",
        title: "COLLECT SHOP",
        // Public URL used instead of local path /src/assets/CollectShop.webp
        // This is a placeholder that visually matches the dark blue/slate theme.
        image: "/src/assets/CollectShop.webp",
    },
    {
        id: 2,
        category: "New this week.",
        title: "THE TRUTH LIES HERE",
        // Public URL used instead of local path /src/assets/TheTruthLiesHere.webp
        // This is a placeholder that visually matches the dark red/purple theme.
        image: "/src/assets/TheTruthLiesHere.webp",
    },
    {
        id: 3,
        category: "Fiction bestsellers.",
        title: "WOMAN IN THE WATER",
        // Public URL used instead of local path /src/assets/WomenInTheWater.webp
        // This is a placeholder that visually matches the dark green/teal theme.
        image: "/src/assets/WomenInTheWater.webp",
    },
];

/**
 * Reusable Feature Card Component
 * Handles the layout, text, button, and hover effects for a single card.
 * The image prop is now used for the card's background.
 */
const FeatureCard = ({ category, title, image }) => {
    return (
        // Outer container: Establishes 'group' for hover effects, sets size, padding, and main styling.
        <div
            className={`relative group flex items-center p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl overflow-hidden min-h-[270px]`}
        >
            {/* 1. Scaling Background Layer
        - The image is now set using the style attribute for dynamic URL safety.
        - Uses bg-cover and bg-center to fill the space and center the image.
        - The image scales up on hover using group-hover:scale-[1.05].
      */}
            <div
                className={`absolute inset-0 rounded-2xl transition-transform duration-500 group-hover:scale-[1.15] bg-cover bg-center`}
                style={{ backgroundImage: `url(${image})` }}
            />

            {/*
        The separate Book Image Element (2.) has been removed.
      */}

            {/*
        2. Text and Button Content (Right Side)
        - Z-index set to z-20 to ensure text is above the scaling background.
        - The margin is kept to visually offset the content as if the image were still separate.
      */}
            <div className="ml-[100px] sm:ml-[120px] lg:ml-[140px] flex-1 text-white z-20 text-left pl-8">
                <p className="text-xs sm:text-sm font-semibold opacity-75 mb-1 tracking-wide uppercase">
                    {category}
                </p>
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold leading-tight mb-4">
                    {title}
                </h2>
                {/* Button Wrapper: Ensures the button is pushed to the right edge of the content area. */}
                <div className="flex justify-end">
                    <button className="flex items-center text-sm font-bold tracking-wider py-2 px-4 rounded-full bg-white text-gray-900 shadow-md hover:bg-green-700 hover:text-white transition duration-500">
                        Shop Now
                        {/* Arrow Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/*
        3. Background Decoration Overlay (Now z-10, above the scaling background)
        - This provides a dark layer over the image for text readability.
      */}
            <div className="absolute inset-0 z-10 opacity-50 bg-black/40"></div>
        </div>
    );
};

// Main App Component (renamed to BannerGrid as per your request)
const BannerGrid = () => {
    return (
        // Set Inter font and overall background
        <div className="font-sans min-h-screen p-4 sm:p-8 bg-gray-50">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Featured Collections
                </h1>
            </header>

            {/* Responsive Grid Container */}
            <div className="grid gap-6 lg:grid-cols-3">
                {cardData.map((card) => (
                    <FeatureCard
                        key={card.id}
                        category={card.category}
                        title={card.title}
                        image={card.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerGrid;
