import React from "react";
import Slider from "react-slick";

// Component for the News & Events Carousel
export default function NewsAndEvents() {
    // Carousel settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false, // Set to true if you want navigation arrows
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576, // Mobile
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const posts = [
        {
            id: 1,
            category: "TIPS & TRICKS",
            date: "OCT 24, 2024",
            author: "HA EI",
            title: "5 Attractive Bookstore WordPress Themes",
            imageUrl: "/src/assets/News1.jpg",
        },
        {
            id: 2,
            category: "TIPS & TRICKS",
            date: "OCT 24, 2024",
            author: "HA EI",
            title: "Top 10 Books to Make It a Great Yeargh",
            imageUrl: "/src/assets/News2.jpg",
        },
        {
            id: 3,
            category: "TIPS & TRICKS",
            date: "OCT 24, 2024",
            author: "HA EI",
            title: "Author Special: A Q&A with Brené Brown",
            imageUrl: "/src/assets/News3.jpg",
        },
        {
            id: 4,
            category: "TIPS & TRICKS",
            date: "OCT 24, 2024",
            author: "HA EI",
            title: "Top 5 Tarot Decks for the Tarot World Summit",
            imageUrl: "/src/assets/News4.jpg",
        },
    ];

    return (
        // Added standard padding back to section and removed px-0
        <section className="w-full bg-white mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            {/* Removed redundant sm:px-6 lg:px-8 since it's on the parent section */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900">
                    News{" "}
                    <i className="font-serif font-light italic text-gray-700">
                        &
                    </i>{" "}
                    events
                </h2>
                <button className="text-sm font-medium text-gray-700 border border-gray-300 rounded-full px-5 py-2 hover:bg-black hover:text-white transition-colors duration-300">
                    Browse All &gt;
                </button>
            </div>

            {/* Carousel */}
            <Slider {...settings}>
                {posts.map((post) => (
                    <div key={post.id} className="px-3 py-3 group">
                        {/* The card content remains the same */}
                        <div className="rounded-lg transition-shadow duration-300 overflow-hidden">
                            {/* Image - CHANGED h-56 TO h-72 for a taller card */}
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-72 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Content Area */}
                            <div className="relative bg-white rounded-b-lg">
                                {/* Metadata Tab */}
                                <div className="absolute -top-4 left-5 z-10 bg-white group-hover:bg-green-800 transition-colors duration-300 rounded-full px-4 py-2 text-xs font-normal">
                                    <span className="text-gray-500 group-hover:text-white transition-colors duration-300 uppercase">
                                        IN
                                        <span className="text-green-600 group-hover:text-white transition-colors duration-300 uppercase">
                                            {" " + post.category}
                                        </span>
                                        {" / "}
                                        {post.date}
                                        {" / BY "}
                                        {post.author}
                                    </span>
                                </div>
                                {/* Title - CHANGED text-2xl TO text-3xl */}
                                <h3 className="text-3xl font-semibold font-serif text-gray-900 pt-10 pb-6 px-5 line-clamp-2">
                                    {post.title}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}
