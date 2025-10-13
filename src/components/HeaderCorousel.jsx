import React, { useState, useEffect } from "react"; // ⬅️ KEY CHANGE 1: Imported useEffect
// Assuming you will need to import the badge images as well
import discountBadgeOrange from "../assets/corouselshape1.avif";
import discountBadgeRed from "../assets/corouselshape3.avif";

import corouselImg1 from "../assets/corouselImg1.webp";
import corouselImg2 from "../assets/corouselImg2.webp";
import corouselImg3 from "../assets/corouselImg3.webp";

export const HeaderCorousel = () => {
    // 1. STATE: Use state to track the currently active slide for indicator styling
    const [activeSlide, setActiveSlide] = useState("item1");

    // State for drag/swipe functionality
    const [startX, setStartX] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const slides = [
        {
            id: "item1",
            imgSrc: corouselImg1,
            tagline: "A brand new series.",
            title: "THE WORLD OF YOUNG ADULT BOOKS",
            subtitle: "Save up to 15% on new releases.",
            buttonText: "Discover Now >",
            badgeSrc: discountBadgeOrange,
            badgeAlt: "15% OFF Orange Badge",
            // Increased size from w-40 h-40 to w-52 h-52
            badgeClass:
                "top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/2 w-52 h-52",
            badgeText: (
                <>
                    15%
                    <br />
                    OFF
                </>
            ),
        },
        {
            id: "item2",
            imgSrc: corouselImg2,
            tagline: "Fiction addiction.",
            title: "YOUR ULTIMATE PAGE-TO-SCREEN READING LIST",
            subtitle:
                "Save over $24 with the Booker prize shortlist collection.",
            buttonText: "Discover Now >",
            badgeSrc: null,
        },
        {
            id: "item3",
            imgSrc: corouselImg3,
            tagline: "In store and online.",
            title: "MORE HORROR NOVELS FROM STAR AUTHORS",
            subtitle: "Stay up-to-date with the most exciting new books.",
            buttonText: "Discover Now >",
            badgeSrc: discountBadgeRed,
            badgeAlt: "15% OFF Red Badge",
            // Increased size from w-40 h-40 to w-52 h-52
            badgeClass:
                "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52",
            badgeText: (
                <>
                    15%
                    <br />
                    OFF
                </>
            ),
        },
    ];

    // Determine the current index for navigation logic
    const slideIds = slides.map((slide) => slide.id);
    const currentIndex = slideIds.indexOf(activeSlide);

    // Navigation function that handles loop-around
    const navigateTo = (newIndex) => {
        if (newIndex < 0) {
            newIndex = slideIds.length - 1; // Loop to last slide
        } else if (newIndex >= slideIds.length) {
            newIndex = 0; // Loop to first slide
        }
        const newSlideId = slideIds[newIndex];
        setActiveSlide(newSlideId);
    };

    // Helper function to change slide via indicator click
    const handleIndicatorClick = (id) => {
        setActiveSlide(id);
    };

    // ⬅️ KEY CHANGE 2: Added useEffect for auto-sliding
    useEffect(() => {
        const slideInterval = setInterval(() => {
            // Calculate the next slide index, wrapping around to the start (0)
            const nextIndex = (currentIndex + 1) % slides.length;
            navigateTo(nextIndex);
        }, 5000); // 5000 milliseconds = 5 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(slideInterval);
    }, [currentIndex]); // Dependency array: Re-run effect when currentIndex changes

    // --- Drag/Swipe Handlers ---
    const SWIPE_THRESHOLD = 70; // Minimum pixel distance for a valid swipe

    // 1. Start drag/swipe (onMouseDown or onTouchStart)
    const handleStart = (clientX) => {
        setIsDragging(true);
        setStartX(clientX);
    };

    // 2. End drag/swipe (onMouseUp or onTouchEnd)
    const handleEnd = (endX) => {
        if (!isDragging || startX === null) return;

        setIsDragging(false);
        const diff = endX - startX;

        if (Math.abs(diff) > SWIPE_THRESHOLD) {
            if (diff > 0) {
                // Swiped Right: Go to Previous Slide
                navigateTo(currentIndex - 1);
            } else {
                // Swiped Left: Go to Next Slide
                navigateTo(currentIndex + 1);
            }
        }
        setStartX(null);
    };

    // Mouse Events
    const onMouseDown = (e) => {
        // Prevent default browser drag only if the target is NOT a link/button
        if (e.target.closest("a, button") === null) {
            e.preventDefault();
            handleStart(e.clientX);
        }
    };
    const onMouseUp = (e) => handleEnd(e.clientX);

    // Touch Events
    const onTouchStart = (e) => handleStart(e.touches[0].clientX);
    const onTouchEnd = (e) => handleEnd(e.changedTouches[0].clientX);

    // Helper function to get the tagline color based on index
    const getTaglineColor = (index) => {
        switch (index) {
            case 0: // item1
                return "#5f9f9f";
            case 1: // item2
                return "#ea1755";
            case 2: // item3
                return "#bc2802";
            default:
                return "#6b7280"; // Fallback color (text-gray-600)
        }
    };

    return (
        // Adjusted overall height for responsiveness (less than 750px is between sm and md)
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] xl:h-[670px] overflow-hidden">
            {/* Attach swipe handlers to the container holding all slides */}
            <div
                className="w-full h-full relative"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        id={slide.id}
                        className={`carousel-item w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
                            slide.id === activeSlide
                                ? "opacity-100 pointer-events-auto z-10"
                                : "opacity-0 pointer-events-none"
                        }`}
                    >
                        {/* Background Image */}
                        <img
                            src={slide.imgSrc}
                            className="w-full h-full object-cover"
                            alt={`Carousel Slide ${index + 1}`}
                        />

                        {/* Content Overlay */}
                        <div
                            // Adjusted padding for smaller screens
                            className={`absolute inset-0 flex items-center p-4 sm:p-8 md:p-12 xl:p-20 cursor ${
                                index === 0
                                    ? "justify-start"
                                    : index === 1
                                    ? "justify-center"
                                    : "justify-end"
                            }`}
                        >
                            <div
                                className={`max-w-lg ${
                                    index === 1 ? "text-center" : "text-left"
                                } ${index === 2 ? "md:ml-20" : ""}`}
                            >
                                {/* Tagline */}
                                <p
                                    className={`text-base font-sans mb-1`}
                                    style={{ color: getTaglineColor(index) }}
                                >
                                    {slide.tagline}
                                </p>

                                {/* Title */}
                                <h2 className="text-3xl sm:text-[40px] md:text-[50px] xl:text-[55px] font-serif leading-tight mb-4 text-gray-900">
                                    {slide.title}
                                </h2>

                                {/* Subtitle */}
                                <p className="text-sm sm:text-base md:text-lg font-sans mb-4 sm:mb-8 text-gray-700">
                                    {slide.subtitle}
                                </p>

                                {/* Button */}
                                <a
                                    href="#"
                                    // Adjusted button padding for smaller screens
                                    className={`inline-flex items-center justify-center text-sm font-medium py-2.5 px-5 rounded-full shadow-lg transition duration-500
                                    ${
                                        // Conditional hover class
                                        index === 0
                                            ? "hover:bg-[#0a4253]" // New hover color for slide 1
                                            : "hover:bg-[#027a36]" // Original hover color for slides 2 and 3
                                    } ${
                                        // Conditional classes for button background and text color (current background color)
                                        index === 0
                                            ? "bg-[#0a4253] text-white"
                                            : "bg-white text-gray-800"
                                    }`}
                                >
                                    {slide.buttonText}
                                </a>
                            </div>
                        </div>

                        {/* DISCOUNT BADGE CONTAINER */}
                        {slide.badgeSrc && (
                            <div
                                className={`absolute ${slide.badgeClass} flex items-center justify-center`}
                            >
                                {/* 1. Rotating Image - Now hidden below XL breakpoint */}
                                <img
                                    src={slide.badgeSrc}
                                    alt={slide.badgeAlt}
                                    className="hidden xl:block w-full h-full object-contain rotate-badge absolute"
                                />
                                {/* 2. Static Text Layer - Now hidden below XL breakpoint */}
                                <div className="hidden xl:block z-10 text-white text-3xl font-bold text-center leading-none pointer-events-none">
                                    {slide.badgeText}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Slide Indicators (Pagination) */}
            <div className="flex justify-center w-full py-2 gap-2 absolute bottom-4 z-10">
                {slides.map((slide) => {
                    const isActive = slide.id === activeSlide;
                    return (
                        <button
                            key={`indicator-${slide.id}`}
                            onClick={() => handleIndicatorClick(slide.id)}
                            className={`
                                h-3 rounded-full transition-all duration-300
                                ${
                                    isActive
                                        ? "w-6 bg-green-600"
                                        : "w-3 bg-white opacity-50"
                                } 
                            `}
                            aria-label={`Go to slide ${slide.id}`}
                        ></button>
                    );
                })}
            </div>

            {/* CSS for Fade Effect, Rotation Animation */}
            <style jsx global>{`
                /* Rotation Animation CSS */
                @keyframes rotate360 {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .rotate-badge {
                    animation: rotate360 10s linear infinite;
                }
            `}</style>
        </div>
    );
};
