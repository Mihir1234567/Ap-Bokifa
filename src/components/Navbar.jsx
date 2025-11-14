// components/Navbar.jsx

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
// IMPORTANT: You must install and wrap your App in a <BrowserRouter>
import { Link } from "react-router-dom";

// --- Custom Hook to detect screen size ---
const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280); // 1280px is Tailwind's xl breakpoint

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1280);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isDesktop;
};

// --- Icon Components ---
const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

const UserIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className || "h-6 w-6"}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
    </svg>
);

const HeartIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
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
);

const CartIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
    </svg>
);

// UPDATED: Replaced chevron with a text character for smaller size
const ChevronDownIcon = () => <span className="ml-1 text-xs">▼</span>;

// --- Dropdown (Click-based) ---
const Dropdown = ({ selected, items, onSelect, buttonClass, menuClass }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative" ref={ref}>
            <button
                className={`flex items-center hover:text-[#1D4A34] ${buttonClass}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected} <ChevronDownIcon />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute top-full   bg-white shadow-lg rounded-md py-2 z-50 overflow-y-auto max-h-[360px] ${menuClass}`}
                    >
                        {items.map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    onSelect(item);
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                {item}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- NavDropdown (Hover-based) ---
// components/Navbar.jsx

// --- NavDropdown (Hover-based) ---
const NavDropdown = ({ title, items, menuClass, buttonClass = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isDesktop = useIsDesktop();
    const isMegaMenu = !Array.isArray(items);

    // --- START: Fix for sticky/fixed gap (v2) ---
    const navDropdownRef = useRef(null); // Ref for the parent wrapper
    const buttonRef = useRef(null); // <-- NEW: Ref for the button itself
    const [dropdownTop, setDropdownTop] = useState(0); // State to hold the top position

    const handleMouseEnter = () => {
        // <-- MODIFIED: Measure the button, not the wrapper
        if (isMegaMenu && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect(); // <-- Measure the button
            setDropdownTop(rect.bottom);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };
    // --- END: Fix for sticky/fixed gap ---

    const renderMenuContent = () => {
        // ... (This entire function remains unchanged) ...
        if (isMegaMenu) {
            if (title === "Home" && items.layouts) {
                return (
                    <div className="py-8 px-8 max-w-screen-2xl mx-auto">
                        <div className="flex justify-between space-x-4">
                            {items.layouts.map((layout, index) => (
                                <Link // Use Link
                                    key={index}
                                    to={layout.path || "#"} // Use 'to' and 'path'
                                    className="flex flex-col items-center group w-1/5 min-w-0"
                                >
                                    <div className="relative overflow-hidden rounded-md shadow-lg transition duration-300 group-hover:shadow-xl group-hover:scale-[1.01]">
                                        <img
                                            src={layout.imageSrc}
                                            alt={layout.title}
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                    <p className="mt-4 font-medium text-black decoration-2 underline hover:text-[#3AB757] transition-all duration-300 ease-in-out text-center text-sm tracking-normal hover:tracking-widest">
                                        {layout.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            }

            const columnKeys = Object.keys(items).filter(
                (key) => key !== "promo"
            );

            return (
                <div className="flex justify-start py-6 px-8 gap-16 max-w-screen-2xl mx-auto">
                    <div className="flex gap-16">
                        {columnKeys.map((columnTitle) => (
                            <div key={columnTitle} className="min-w-[150px]">
                                <h4 className="font-bold text-sm text-[#1D4A34] mb-3 uppercase tracking-wider">
                                    {columnTitle}
                                </h4>
                                {items[columnTitle].map((item) => {
                                    if (item.onClick) {
                                        return (
                                            <button
                                                key={item.title}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    item.onClick(e);
                                                }}
                                                className="block text-sm text-gray-700 py-1.5 hover:text-[#3AB757] text-left w-full"
                                            >
                                                {item.title}
                                            </button>
                                        );
                                    }
                                    return (
                                        <Link // Use Link
                                            key={item.title} // Use object title
                                            to={item.path || "#"} // Use object path
                                            className="block text-sm text-gray-700 py-1.5 hover:text-[#3AB757]"
                                        >
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="ml-auto w-[550px] h-[300px] flex-shrink-0">
                        <div className="bg-gradient-to-r from-[#1D4A34] to-[#3AB757] p-8 rounded-lg text-white h-full flex relative overflow-hidden bg-[url('/src/assets/WomenInTheWater.webp')] bg-cover bg-center">
                            <div className="w-1/3 flex items-center justify-start py-4 pr-4"></div>

                            <div className="w-3/5 flex flex-col justify-center text-right pl-4">
                                <p className="text-md mb-2 text-white/80">
                                    Five day sale!
                                </p>
                                <h1 className="text-6xl font-extrabold mb-4 text-white">
                                    Save 50%
                                </h1>
                                <p className="text-base mb-6 text-white/90">
                                    Use code BIGSALE50 at checkout
                                </p>
                                <button className="bg-white text-[#1D4A34] font-semibold py-2 px-4 rounded-full self-end w-3/4 hover:bg-green-100 transition duration-150">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (Array.isArray(items)) {
            return (
                <>
                    {items.map((item, index) => (
                        <Link // Use Link
                            key={item.title} // Use object title
                            to={item.path || "#"} // Use object path
                            className={`block px-4 py-3 text-gray-800 hover:text-[#3AB757] hover:bg-gray-100 ${
                                index < items.length - 1
                                    ? "border-b border-gray-200"
                                    : ""
                            }`}
                        >
                            {item.title}
                        </Link>
                    ))}
                </>
            );
        }
        return null;
    };

    const dropdownClasses = isMegaMenu
        ? `fixed left-0 right-0 w-full border-b border-gray-200`
        : `absolute top-full left-0 w-48 border-b border-gray-200`;

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter} // Use the new handler
            onMouseLeave={handleMouseLeave} // Use the new handler
            ref={navDropdownRef} // This ref is for the parent div
        >
            <button
                ref={buttonRef} // <-- NEW: Add the buttonRef here
                className={`flex items-center py-4 text-gray-800 font-medium hover:text-[#3AB757] ${buttonClass}`}
            >
                {title} <ChevronDownIcon />
            </button>

            {isDesktop && (
                <motion.div
                    // FIX: Use visibility: 'hidden' for performance on hover
                    initial={{ opacity: 0, y: -10, visibility: "hidden" }}
                    animate={{
                        opacity: isOpen ? 1 : 0,
                        y: isOpen ? 0 : -10,
                        visibility: isOpen ? "visible" : "hidden",
                    }}
                    // Apply the calculated top position using an inline style
                    style={isMegaMenu ? { top: `${dropdownTop}px` } : {}}
                    transition={{ duration: 0.2 }}
                    className={`mt-0 bg-white shadow-xl z-10 
                                overflow-y-auto max-h-[70vh] 
                                ${dropdownClasses} ${menuClass}`}
                >
                    {/* UNIFIED GREEN BORDER: Apply green border for all dropdowns here */}
                    <div className="h-0.5 bg-[#3AB757] w-full"></div>
                    {renderMenuContent()}
                </motion.div>
            )}
        </div>
    );
};
// --- END NavDropdown FIX ---

// --- NEW COMPONENT: UserDropdown (Hover-based for User Icon) ---
const UserDropdown = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className="relative flex items-center h-6 w-6" // Hides the default UserIcon padding
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="text-gray-600 hover:text-[#1D4A34]">
                <UserIcon />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute top-full right-0 mt-4 
                                    bg-white shadow-lg rounded-md py-2 z-50 w-40`}
                    >
                        {items.map((item) => (
                            <Link // Use Link
                                key={item.title}
                                to={item.path || "#"} // Use 'to' and 'path'
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm whitespace-nowrap"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
// --- END NEW COMPONENT ---

// --- MobileNestedDropdown (from previous request) ---
const MobileNestedDropdown = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="pl-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-2 text-gray-800 font-semibold hover:text-[#3AB757] text-sm"
            >
                {title}
                <motion.span
                    className="text-lg font-light"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    +
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        {items.map((item) => {
                            if (item.onClick) {
                                return (
                                    <button
                                        key={item.title}
                                        onClick={(e) => item.onClick(e)}
                                        className={`block pl-4 pr-4 py-1.5 text-gray-600 hover:text-[#3AB757] hover:bg-gray-100 text-sm text-left w-full`}
                                    >
                                        {item.title}
                                    </button>
                                );
                            }
                            return (
                                <Link // Use Link
                                    key={item.title}
                                    to={item.path || "#"} // Use 'to' and 'path'
                                    className={`block pl-4 pr-4 py-1.5 text-gray-600 hover:text-[#3AB757] hover:bg-gray-100 text-sm`}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
// --- END MobileNestedDropdown ---

// --- MobileNavItem (Updated from previous request to use MobileNestedDropdown) ---
const MobileNavItem = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const isShopLayout =
        !Array.isArray(items) &&
        items &&
        Object.keys(items).filter((key) => key !== "promo").length > 0;
    const isHomeLayout = !Array.isArray(items) && items && items.layouts;

    const isSimpleLink = !items || (Array.isArray(items) && items.length === 0);

    if (isSimpleLink) {
        return (
            <Link // Use Link for simple navigation items like "Contact"
                to={title === "Contact" ? "/contact" : "/"} // Example path for Contact
                className="block py-4 text-gray-800 font-medium hover:text-[#3AB757] border-b border-gray-200"
            >
                {title}
            </Link>
        );
    }

    const renderSubLinks = () => {
        // Case 1: Complex Shop Layout -> Render MobileNestedDropdowns
        if (isShopLayout) {
            const columnKeys = Object.keys(items).filter(
                (key) => key !== "promo"
            );
            return (
                <div className="py-2">
                    {columnKeys.map((columnTitle) => (
                        <MobileNestedDropdown
                            key={columnTitle}
                            title={columnTitle}
                            items={items[columnTitle]}
                        />
                    ))}
                </div>
            );
        }

        // Case 2: Simple array or Home Layout (flattens to links)
        let subLinks = [];

        if (Array.isArray(items)) {
            subLinks = items; // Items are already objects {title, path}
        } else if (isHomeLayout) {
            items.layouts.forEach(
                (layout) =>
                    subLinks.push({ title: layout.title, path: layout.path }) // Ensure path is included
            );
        }

        return subLinks.map((item, index) => {
            const itemTitle = item.title;
            const itemPath = item.path || "#";

            return (
                <Link // Use Link
                    key={itemTitle + index}
                    to={itemPath}
                    className={`block px-4 py-2 text-gray-600 hover:text-[#3AB757] hover:bg-gray-100`}
                >
                    {itemTitle}
                </Link>
            );
        });
    };

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-4 text-gray-800 font-medium hover:text-[#3AB757]"
            >
                {title}
                <motion.span
                    className="text-xl font-light"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    +
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        {renderSubLinks()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
// --- END MobileNavItem UPDATE ---

// --- SearchDrawer Component - FIXED ---
const SearchDrawer = ({ onClose }) => {
    const isDesktop = useIsDesktop();

    return (
        <>
            <motion.div
                initial={{ x: isDesktop ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: isDesktop ? "-100%" : "100%" }}
                // ANIMATION FIX: Uses fast tween
                transition={{ type: "tween", duration: 0.25 }}
                // Z-INDEX FIX: Changed z-[10000] to z-50
                className="fixed top-0 h-full bg-white shadow-lg z-50 w-96 max-w-full p-6 flex flex-col right-0 xl:left-0"
            >
                <div className="flex justify-between items-center pb-4 border-b">
                    <div className="relative flex-grow">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            placeholder="Search our store..."
                            autoFocus
                            className="w-full pl-10 pr-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#3AB757]"
                        />
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 text-gray-500 hover:text-gray-800"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="mt-6 flex flex-col gap-6">
                    <div>
                        <h3 className="font-bold text-sm text-gray-500 mb-3 uppercase tracking-wider">
                            Popular
                        </h3>
                        <div className="flex flex-col gap-2">
                            <Link // Use Link
                                to="/collection"
                                className="text-gray-700 hover:text-[#3AB757]"
                            >
                                All Collection
                            </Link>
                            <Link // Use Link
                                to="/products"
                                className="text-gray-700 hover:text-[#3AB757]"
                            >
                                All Product
                            </Link>
                            <Link // Use Link
                                to="/contact"
                                className="text-gray-700 hover:text-[#3AB757]"
                            >
                                Contact
                            </Link>
                            <Link // Use Link
                                to="/blog"
                                className="text-gray-700 hover:text-[#3AB757]"
                            >
                                Blog
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-gray-500 mb-3 uppercase tracking-wider">
                            Information
                        </h3>
                        <div className="flex flex-col gap-2">
                            <Link // Use Link
                                to="/contact"
                                className="text-gray-700 hover:text-[#3AB757]"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* Z-INDEX FIX: Changed z-[90] to z-40 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 backdrop-filter bg-black/75 z-40 transform"
                onClick={onClose}
            />
        </>
    );
};

import { useCurrency } from "../context/CurrencyContext";

// --- Navbar (Main Component) ---
// 1. Accept the `onUpsellClick` prop
const Navbar = ({ onUpsellClick, onCrossSellClick, onCouponClick }) => {
    // --- State and Handlers ---
    const quotes = [
        "All books at least 50% off list prices every day",
        "All books at least 50% off list prices every day ",
        "All books at least 50% off list prices every day  ",
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isBannerOpen, setIsBannerOpen] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const nextQuote = () =>
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
    const prevQuote = () =>
        setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
    const currentQuote = quotes[currentIndex];

    const { currency, changeCurrency } = useCurrency();
    const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");

    const currencies = [
        "USD $",
        "EUR €",
        "GBP £",
        "CAD C$",
        "AUD A$",
        "JPY ¥",
        "CNY ¥",
        "INR ₹",
        "BRL R$",
        "MXN $",
    ];
    const languages = [
        "English",
        "Spanish",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Dutch",
        "Russian",
        "Chinese",
        "Japanese",
    ];

    // --- Data (UPDATED for React Router: path instead of href) ---
    const homeMegaMenu = {
        layouts: [
            {
                title: "Home One",
                path: "/",
                imageSrc: "/src/assets/Home1.avif",
            },
            {
                title: "Home Two",
                path: "/",
                imageSrc: "/src/assets/Home2.avif",
            },
            {
                title: "Home Three",
                path: "/",
                imageSrc: "/src/assets/Home3.avif",
            },
            {
                title: "Home Four",
                path: "/",
                imageSrc: "/src/assets/Home4.avif",
            },
            {
                title: "Home Five",
                path: "/",
                imageSrc: "/src/assets/Home5.avif",
            },
        ],
    };
    // Use the mega menu layouts for the mobile simple links
    const homeItems = homeMegaMenu.layouts.map((item) => ({
        title: item.title,
        path: item.path,
    }));

    const shopItems = {
        "Shop Layout": [
            { title: "Shop Left Sidebar", path: "/leftSidebar" },
            { title: "Collection Top", path: "/collections/books" },
            { title: "List Collection", path: "/collections/categories" },
            { title: "Coupon", onClick: (e) => onCouponClick(e) },
        ],
        "Product Layout": [
            { title: "Classic", path: "/productPageClassic" },
            { title: "Scroll Fixes", path: "/productPageScrollFixed" },
            { title: "Left Thumbnail", path: "/productPageLeftThumbs" },
            { title: "Right Thumbnail", path: "/productPageRightThumbs" },
            { title: "Without Thumbnail", path: "/productPageWithoutThumbs" },
        ],

        "Product Type": [
            { title: "With Video", path: "/typeWithVideo" },
            {
                title: "Upssell",
                path: "/product/variable",
                onClick: (e) => onUpsellClick(e),
            },
            {
                title: "Crosssel",
                path: "/product/external",
                onClick: (e) => onCrossSellClick(e),
            },
            { title: "Soldout - In Coming", path: "/product/21" },
            { title: "Product Countdown", path: "/product/1" },
        ],
    };

    const blogItems = [
        { title: "Blog - Standard", path: "/blog/standard" },
        { title: "Blog - Grid", path: "/blog/grid" },
        { title: "Single Post", path: "/blog/post" },
    ];
    const pagesItems = [
        { title: "About Us", path: "/about" },
        { title: "Contact", path: "/contact" },
        { title: "Our Team", path: "/team" },
        { title: "FAQs", path: "/faqs" },
        { title: "LookBook", path: "/lookbook" },
    ];

    const userMenuItems = [
        { title: "Login", path: "/login" },
        { title: "Sign Up", path: "/register" },
        { title: "Check out", path: "/checkout" },
        { title: "Wishlist (0)", path: "/wishlist" },
        { title: "Compare (1)", path: "/compare" },
    ];

    // Reusable Logo Component
    const Logo = () => (
        <Link // Use Link
            to="/"
            className="text-2xl font-bold text-[#1D4A34] flex items-center"
        >
            <img src="/src/assets/logo_full.webp" alt="Logo" />
        </Link>
    );

    return (
        <>
            {/* Top Banner (kept outside the sticky header so it scrolls away) */}
            {isBannerOpen && (
                // MODIFIED: bg-[#1D4A34] changed to bg-[#09331a]
                <div className="relative bg-[#09331a] text-white text-center py-2 px-4 md:px-8 h-8 flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-full max-w-lg mx-auto px-8 py-4">
                        <button
                            className="absolute left-0 top-1/2 -translate-y-1/2 hover:opacity-75 md:-left-8  xl:block"
                            onClick={prevQuote}
                        >
                            <ChevronLeftIcon className="w-6 h-6 text-white" />
                        </button>

                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentQuote}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-white font-medium text-center"
                            >
                                {currentQuote}
                            </motion.span>
                        </AnimatePresence>
                        <button
                            className="absolute right-0 top-1/2 -translate-y-1/2 hover:opacity-75 md:-right-8"
                            onClick={nextQuote}
                        >
                            <ChevronRightIcon className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
            )}

            {/* Z-INDEX FIX: Changed z-50 to z-30 */}
            <header className="sticky top-0 z-30 bg-white bg-black/75 shadow-sm">
                {/* Main Navigation */}
                <div className="py-6">
                    <div className="flex justify-between items-center gap-4 px-4">
                        {/* LEFT COLUMN: Mobile icons OR Desktop Logo */}
                        <div className="flex items-center gap-4">
                            {/* Mobile Icons (Hamburger + Search) */}
                            <div className="flex items-center gap-4 xl:hidden">
                                <button
                                    className="text-gray-600 hover:text-[#1D4A34]"
                                    onClick={() => setIsMenuOpen(true)}
                                >
                                    <Bars3Icon className="h-6 w-6" />
                                </button>
                                <button // Changed <a> to <button> for non-navigation action
                                    className="text-gray-600 hover:text-[#1D4A34]"
                                    onClick={() => setIsSearchOpen(true)}
                                >
                                    <SearchIcon />
                                </button>
                            </div>
                            {/* Desktop Logo */}
                            <div className="hidden xl:block flex-shrink-0">
                                <Logo />
                            </div>
                        </div>
                        {/* CENTER COLUMN: Mobile Logo OR Desktop Search Bar */}
                        <div className="xl:flex-grow xl:max-w-3xl">
                            {/* Mobile Logo */}
                            <div className="xl:hidden flex-shrink-0">
                                <Logo />
                            </div>
                            {/* Desktop Search Bar - MODIFIED SECTION */}
                            <div className="hidden xl:flex w-full  rounded-full  overflow-hidden  shadow-md ">
                                <input
                                    type="text"
                                    placeholder="Search our store..."
                                    // MODIFIED: Added padding, removed borders, adjusted background, and made it fully rounded-left
                                    className="w-full  px-6 py-3  text-gray-700  bg-white   border-0   rounded-l-full   focus:outline-none  cursor-pointer"
                                    onFocus={() => setIsSearchOpen(true)}
                                    readOnly
                                />
                                <button className=" px-8   py-3  text-white bg-[#027a36]  rounded-full  hover:bg-[#1D4A34] flex items-center gap-2">
                                    <SearchIcon />
                                    Search
                                </button>
                            </div>
                        </div>
                        {/* RIGHT COLUMN: Dropdowns and Icons */}
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            {/* Currency/Language */}
                            <div className="flex items-center space-x-2 sm:space-x-4 text-sm text-gray-600">
                                <Dropdown
                                    selected={currency}
                                    items={currencies}
                                    onSelect={changeCurrency}
                                    buttonClass="text-sm"
                                    menuClass="mt-2 w-32"
                                />
                                <Dropdown
                                    selected={selectedLanguage}
                                    items={languages}
                                    onSelect={setSelectedLanguage}
                                    buttonClass="text-sm"
                                    menuClass="mt-2 w-32"
                                />
                            </div>
                            {/* Action Icons */}
                            <UserDropdown items={userMenuItems} />
                            <Link // Use Link
                                to="/wishlist"
                                className="relative text-gray-600 hover:text-[#1D4A34]"
                            >
                                <HeartIcon />
                                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs text-white bg-[#3AB757] rounded-full">
                                    0
                                </span>
                            </Link>
                            <Link // Use Link
                                to="/cart"
                                className="relative text-gray-600 hover:text-[#1D4A34]"
                            >
                                <CartIcon />
                                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs text-white bg-[#3AB757] rounded-full">
                                    0
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation Links (Desktop) */}
                <div className="border-t border-gray-200">
                    <div className="max-w-screen-2xl mx-auto px-8 flex justify-between items-center">
                        <nav className="hidden xl:flex space-x-8">
                            {/* MODIFIED: Added buttonClass="!text-[#3AB757]" */}
                            <NavDropdown
                                title="Home"
                                items={homeMegaMenu}
                                buttonClass="!text-[#3AB757]"
                            />

                            <NavDropdown title="Shop" items={shopItems} />
                            <NavDropdown title="Blogs" items={blogItems} />
                            <NavDropdown title="Pages" items={pagesItems} />
                            <Link // Use Link
                                to="/contact"
                                className="flex items-center py-4 text-gray-800 font-medium hover:text-[#3AB757]"
                            >
                                Contact
                            </Link>

                            {/* --- 2. NEW LINK (DESKTOP) --- */}

                            {/* --- END NEW LINK --- */}
                        </nav>
                        <div className="hidden xl:block text-gray-800">
                            <span>Need help? Call Us: </span>
                            <a
                                href="tel:+84250088833"
                                className="font-semibold text-[#1D4A34]"
                            >
                                +84 2500 888 33
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu (Side Drawer) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            // ANIMATION FIX: Uses fast tween
                            transition={{
                                type: "tween",
                                duration: 0.25,
                            }}
                            // Z-INDEX FIX: Changed z-[100] to z-50
                            className="fixed top-0 left-0 w-80 max-w-full h-full bg-white shadow-lg z-50 flex flex-col"
                        >
                            <div className="p-4 flex justify-end items-center border-b border-gray-200">
                                <button onClick={() => setIsMenuOpen(false)}>
                                    <XMarkIcon className="h-6 w-6 text-gray-600" />
                                </button>
                            </div>
                            <div className="p-4 flex-grow overflow-y-auto">
                                <MobileNavItem title="Home" items={homeItems} />
                                <MobileNavItem title="Shop" items={shopItems} />
                                <MobileNavItem
                                    title="Blogs"
                                    items={blogItems}
                                />
                                <MobileNavItem
                                    title="Pages"
                                    items={pagesItems}
                                />
                                {/* MobileNavItem handles the link internally */}
                                <MobileNavItem title="Contact" items={[]} />

                                {/* --- 3. NEW LINK (MOBILE) --- */}

                                {/* --- END NEW LINK (MOBILE) --- */}

                                <div className="pt-6 flex space-x-4 text-sm text-gray-600 border-t border-gray-200 mt-4">
                                    <Dropdown
                                        selected={currency}
                                        items={currencies}
                                        onSelect={changeCurrency}
                                        buttonClass="text-sm px-0"
                                        menuClass="w-32"
                                    />
                                    <Dropdown
                                        selected={selectedLanguage}
                                        items={languages}
                                        onSelect={setSelectedLanguage}
                                        buttonClass="text-sm px-0"
                                        menuClass="w-32"
                                    />
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-200">
                                <Link // Use Link
                                    to="/account"
                                    className="flex items-center space-x-3 text-gray-800 hover:text-[#1D4A34] font-medium"
                                >
                                    <UserIcon className="h-5 w-5" />
                                    <span>Account</span>
                                </Link>
                            </div>
                        </motion.div>
                        {/* Z-INDEX FIX: Changed z-[900] to z-40 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 backdrop-filter bg-black/75 z-40 transform"
                            onClick={() => setIsMenuOpen(false)}
                        />
                    </>
                )}
            </AnimatePresence>

            {/* Search Drawer */}
            <AnimatePresence>
                {isSearchOpen && (
                    <SearchDrawer onClose={() => setIsSearchOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
