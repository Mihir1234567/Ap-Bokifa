import React from "react";

// Data for the slider items.
const sliderItems = [
    { number: "15,254", text: "total books" },
    { number: "1,258", text: "authors" },
    { number: "20,898", text: "books sold" },
    { number: "97%", text: "happy customer" },
    { number: "15,254", text: "total books" },
    { number: "1,258", text: "authors" },
    { number: "20,898", text: "books sold" },
    { number: "97%", text: "happy customer" },
];

/**
 * InfiniteSlider component
 * Creates a seamlessly looping horizontal slider.
 */
const InfiniteSlider = () => {
    // Duplicate the items array to allow the animation to loop seamlessly
    const extendedSliderItems = [...sliderItems, ...sliderItems];

    // Placeholder image URL for the gold sparkle icon.
    // It is colored gold (#C4A053) and uses the slider's background color (#EFEBE6)
    // to blend in seamlessly. The text is a simple star emoji.
    const SPARKLE_IMAGE_URL = "/src/assets/iconscroll.png";

    return (
        // INCREASED VERTICAL PADDING (py-12 instead of py-6) for more height
        <div className="relative w-full py-4 overflow-hidden bg-[#EFEBE6] border-y border-[#D6D0C5] shadow-inner">
            {/* Custom CSS for the Marquee animation */}
            <style>
                {`
                    @keyframes marquee {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        /* INCREASED SPEED: 20 seconds for a full loop (was 30s) */
                        animation: marquee 20s linear infinite; 
                        /* Ensures the animation pauses on hover */
                        animation-play-state: running; 
                    }
                    .animate-marquee:hover {
                        animation-play-state: paused;
                    }
                `}
            </style>

            <div className="flex">
                {/* The main scrolling container */}
                <div className="flex animate-marquee">
                    {extendedSliderItems.map((item, index) => (
                        <div
                            // Unique key is important, especially when duplicating list items
                            key={index}
                            className="flex items-center flex-shrink-0"
                        >
                            {/* Text Item: REDUCED HORIZONTAL PADDING (px-4 sm:px-8) */}
                            <p className="text-xl md:text-1xl font-medium whitespace-nowrap tracking-tight px-4 sm:px-8">
                                <span className="font-bold text-[#027a36]">
                                    {item.number}
                                </span>
                                <span className="text-[#000] ml-2">
                                    {item.text}
                                </span>
                            </p>

                            {/* Decorative Image (Replaces SparkleIcon) */}
                            <img
                                src={SPARKLE_IMAGE_URL}
                                alt="Decorative Star Separator"
                                // REDUCED HORIZONTAL MARGINS (mx-8 instead of mx-12)
                                className="mx-8 h-5 w-5 flex-shrink-0 hidden sm:block"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/**
 * Main App component
 * Sets the main background color and typography.
 */
export default function App() {
    return (
        <div className=" bg-[#F8F5F1] flex items-center justify-center ">
            {/* The slider is full-width for the continuous effect */}
            <div className="w-full">
                <InfiniteSlider />
            </div>
        </div>
    );
}
