// BookstorePage.jsx

import React, { useState, useMemo, useCallback } from "react";
import ProductCard from "../components/product/ProductCard";
import ProductCarousel from "../components/product/ProductCorousel";
import ALL_PRODUCTS from "../components/productsData";
import useRecentlyViewed from "../hooks/useRecentlyViwed";
import CategoryBanner from "../components/CategoryBanner";

// --- Product Grid Card Wrapper ---
const ProductGridCard = ({ product, onViewProduct }) => (
    <div className="w-full">
        <ProductCard product={product} onViewProduct={onViewProduct} />
    </div>
);

// --- Component for the top Category list (Functional Link Filter) ---
const CategoryLinkFilter = ({ title, filters, selected, onSelectCategory }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="py-4 border-b border-gray-200">
            <button
                className="flex justify-between items-center w-full text-left font-bold text-lg text-gray-900 hover:text-green-700 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span className="text-gray-500 text-2xl font-normal transition-transform duration-300 transform">
                    {isOpen ? "−" : "+"}
                </span>
            </button>
            {isOpen && (
                <ul className="mt-3 space-y-2 text-base">
                    {filters.map((filter) => {
                        const isSelected = selected.includes(filter.name);
                        return (
                            <li key={filter.name}>
                                <a
                                    href="#"
                                    className={`block transition-colors ${
                                        isSelected
                                            ? "font-extrabold text-green-700"
                                            : "text-gray-700 hover:text-black"
                                    }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onSelectCategory(filter.name);
                                    }}
                                >
                                    {filter.name}{" "}
                                    <span className="text-gray-400 font-normal">
                                        ({filter.count})
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

// --- Component for checkbox filters with selection logic ---
const CheckboxFilter = ({ title, filters, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(true);
    const filterKey = title.toLowerCase().replace(/\s/g, "-");

    return (
        <div className="py-4 border-b border-gray-200">
            <button
                className="flex justify-between items-center w-full text-left font-bold text-lg text-gray-900 hover:text-green-700 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span className="text-gray-500 text-2xl font-normal transition-transform duration-300 transform">
                    {isOpen ? "−" : "+"}
                </span>
            </button>
            {isOpen && (
                <div className="mt-3 space-y-2 text-base">
                    {filters.map((filter) => (
                        <div key={filter.name} className="flex items-center">
                            <input
                                id={`filter-${filterKey}-${filter.name
                                    .toLowerCase()
                                    .replace(/\s/g, "-")}`}
                                name={filterKey}
                                type="checkbox"
                                value={filter.name}
                                checked={selected.includes(filter.name)}
                                onChange={onChange}
                                className="h-5 w-5 text-green-700 border-gray-300 rounded focus:ring-green-700 focus:ring-2"
                            />
                            <label
                                htmlFor={`filter-${filterKey}-${filter.name
                                    .toLowerCase()
                                    .replace(/\s/g, "-")}`}
                                className="ml-3 text-gray-700"
                            >
                                {filter.name}{" "}
                                <span className="text-gray-400 font-normal">
                                    ({filter.count})
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Sort Options Definition ---
const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "best-selling", label: "Best selling" },
    { value: "title-asc", label: "Alphabetically, A-Z" },
    { value: "title-desc", label: "Alphabetically, Z-A" },
    { value: "price-asc", label: "Price, low to high" },
    { value: "price-desc", label: "Price, high to low" },
    { value: "date-asc", label: "Date, old to new" },
    { value: "date-desc", label: "Date, new to old" },
];

// --- Inline SortDropdown Component (Updated for Hover) ---
const SortDropdown = ({ selectedSort, onSortChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const activeOption =
        SORT_OPTIONS.find((opt) => opt.value === selectedSort) ||
        SORT_OPTIONS[0];

    const handleSelect = (value) => {
        onSortChange(value);
        setIsOpen(false);
    };

    // 🌟 New: Event handlers for hover
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div
            className="relative inline-block text-left z-20"
            onMouseEnter={handleMouseEnter} // Open on hover
            onMouseLeave={handleMouseLeave} // Close on mouse leave
        >
            <button
                type="button"
                // Retain onClick for touch devices/accessibility, ensuring it toggles
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex justify-center items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 rounded-md py-1 px-2"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span className="hidden sm:inline text-gray-500 mr-2">
                    Sort by
                </span>
                <span className="font-bold text-gray-900">
                    {activeOption.label}
                </span>
                <svg
                    className={`-mr-1 ml-2 h-5 w-5 text-gray-700 transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {SORT_OPTIONS.map((option) => (
                            <a
                                key={option.value}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelect(option.value);
                                }}
                                className={`
                                    flex items-center px-4 py-3 text-sm transition-colors duration-150
                                    ${
                                        option.value === selectedSort
                                            ? "bg-green-700 text-white font-bold"
                                            : "text-gray-800 hover:bg-gray-100"
                                    }
                                `}
                                role="menuitem"
                                tabIndex="-1"
                            >
                                {option.label}
                                {option.value === selectedSort && (
                                    <svg
                                        className="ml-auto h-5 w-5 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
// --- Main Page Component ---
const BookstorePage = () => {
    const { viewedItems, addRecentlyViewed } = useRecentlyViewed();
    const recentlyViewedIds = viewedItems.map((item) => item.id);

    // --- FILTER STATE MANAGEMENT ---
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);

    // 🌟 SORTING STATE MANAGEMENT
    const [selectedSort, setSelectedSort] = useState("title-asc");

    // --- PAGINATION STATE ---
    const PRODUCTS_PER_PAGE = 16;
    const [currentPage, setCurrentPage] = useState(1);

    // Function to calculate all filter options and COUNTS
    const getFilterData = useCallback((products, allProducts) => {
        // Calculate COUNTS based on the currently filtered products
        const counts = {
            category: {},
            format: {},
            availability: { "In stock": 0, "Out of stock": 0 },
            rating: {
                "4 Star & Up": 0,
                "3 Star & Up": 0,
                "2 Star & Up": 0,
                "1 Star & Up": 0,
            },
        };

        products.forEach((product) => {
            counts.category[product.category] =
                (counts.category[product.category] || 0) + 1;
            counts.format[product.format] =
                (counts.format[product.format] || 0) + 1;

            // Simplified availability logic
            const statusKey = product.isSoldOut ? "Out of stock" : "In stock";
            counts.availability[statusKey] =
                (counts.availability[statusKey] || 0) + 1;

            // Rating counts
            if (Math.floor(product.rating) >= 4)
                counts.rating["4 Star & Up"] += 1;
            if (Math.floor(product.rating) >= 3)
                counts.rating["3 Star & Up"] += 1;
            if (Math.floor(product.rating) >= 2)
                counts.rating["2 Star & Up"] += 1;
            if (Math.floor(product.rating) >= 1)
                counts.rating["1 Star & Up"] += 1;
        });

        // Generate FINAL FILTER LISTS: Options from ALL_PRODUCTS, Counts from filtered products

        const uniqueCategories = [
            ...new Set(allProducts.map((p) => p.category)),
        ].sort();
        const mainCategoryFilters = uniqueCategories.map((name) => ({
            name,
            count: counts.category[name] || 0,
        }));

        const uniqueFormats = [
            ...new Set(allProducts.map((p) => p.format)),
        ].sort();
        const formatFilters = uniqueFormats.map((name) => ({
            name,
            count: counts.format[name] || 0,
        }));

        // Use predefined keys for consistent filter order
        const availabilityFilters = [
            { name: "In stock", count: counts.availability["In stock"] || 0 },
            {
                name: "Out of stock",
                count: counts.availability["Out of stock"] || 0,
            },
        ];

        const ratingFilters = [
            { name: "4 Star & Up", count: counts.rating["4 Star & Up"] || 0 },
            { name: "3 Star & Up", count: counts.rating["3 Star & Up"] || 0 },
            { name: "2 Star & Up", count: counts.rating["2 Star & Up"] || 0 },
            { name: "1 Star & Up", count: counts.rating["1 Star & Up"] || 0 },
        ];

        return {
            mainCategoryFilters,
            formatFilters,
            availabilityFilters,
            ratingFilters,
        };
    }, []);

    // Combined Filtering and Sorting Logic
    const sortedAndFilteredProducts = useMemo(() => {
        setCurrentPage(1);

        // 1. Filtering
        let list = ALL_PRODUCTS.filter((product) => {
            // Category Filter
            if (
                selectedCategories.length > 0 &&
                !selectedCategories.includes(product.category)
            ) {
                return false;
            }

            // Format Filter
            if (
                selectedFormats.length > 0 &&
                !selectedFormats.includes(product.format)
            ) {
                return false;
            }

            // Availability Filter
            if (selectedAvailability.length > 0) {
                const inStockSelected =
                    selectedAvailability.includes("In stock");
                const outOfStockSelected =
                    selectedAvailability.includes("Out of stock");

                const isInStock = !product.isSoldOut;

                if (inStockSelected && !isInStock) return false;
                if (outOfStockSelected && isInStock) return false;
                if (!inStockSelected && !outOfStockSelected) {
                    // This handles the edge case where the filter is non-empty but conditions lead to no filter effect, but the filter should always take effect.
                    // For example, if only "Out of stock" is selected, and the product is "In stock," it should be filtered out (covered by the line above).
                }
            }

            // Rating Filter
            if (selectedRatings.length > 0) {
                const minRating = selectedRatings.reduce((min, current) => {
                    // Extracts the number from "X Star & Up"
                    const currentStar = parseInt(current.charAt(0));
                    return Math.max(min, currentStar);
                }, 0);

                if (Math.floor(product.rating) < minRating) {
                    return false;
                }
            }

            return true;
        });

        // 2. Sorting
        const sortedList = [...list];

        switch (selectedSort) {
            case "title-asc":
                sortedList.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "title-desc":
                sortedList.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "price-asc":
                sortedList.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                sortedList.sort((a, b) => b.price - a.price);
                break;
            case "date-asc":
                sortedList.sort(
                    (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)
                );
                break;
            case "date-desc":
                sortedList.sort(
                    (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
                );
                break;
            // 'featured' and 'best-selling' use default/original order unless specified
            default:
                break;
        }

        return sortedList;
    }, [
        selectedCategories,
        selectedFormats,
        selectedAvailability,
        selectedRatings,
        selectedSort,
    ]);

    // Dynamic Filter Options: Calculated based on the filtered list AND the full list
    const dynamicFilterOptions = useMemo(
        () => getFilterData(sortedAndFilteredProducts, ALL_PRODUCTS),
        [sortedAndFilteredProducts, getFilterData]
    );

    // Handler for the top single-select category list
    const handleCategoryLinkSelect = (categoryName) => {
        setSelectedCategories((prev) => {
            // Toggles between single-selection and none
            if (prev.length === 1 && prev[0] === categoryName) {
                return [];
            }
            return [categoryName];
        });
    };

    // Generic change handler for all checkbox filters
    const handleFilterChange = (setter) => (event) => {
        const { value, checked } = event.target;
        setter((prev) =>
            checked ? [...prev, value] : prev.filter((v) => v !== value)
        );
    };

    // Dynamic Category Banner Title Logic
    const defaultCategoryTitle = "All Products"; // Changed default title for clarity
    const categoryDesc =
        "Discover your favorite book: you will find a wide range of selected books from bestseller to newcomer, children's book to crime novel or thriller to science fiction novel.";

    const activeCategoryTitle = useMemo(() => {
        if (selectedCategories.length === 1) {
            return selectedCategories[0];
        }
        return defaultCategoryTitle;
    }, [selectedCategories]);

    // --- PAGINATION LOGIC ---
    const totalProducts = sortedAndFilteredProducts.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    // 🌟 Fix: Use Math.min to ensure the displayed end index doesn't exceed total products
    const displayEndIndex = Math.min(
        startIndex + PRODUCTS_PER_PAGE,
        totalProducts
    );

    const pageProducts = sortedAndFilteredProducts.slice(
        startIndex,
        displayEndIndex
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null; // Don't show if only one page

        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxPagesToShow / 2)
        );
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        pages.push(
            <button
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-l-lg border-gray-300 transition-colors ${
                    currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-800 hover:bg-gray-100"
                }`}
            >
                Previous
            </button>
        );

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 border-t border-b border-gray-300 transition-colors ${
                        i === currentPage
                            ? "font-bold bg-green-700 text-white border-green-700 hover:bg-green-600"
                            : "bg-white hover:bg-gray-100 text-gray-800"
                    }`}
                >
                    {i}
                </button>
            );
        }

        pages.push(
            <button
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded-r-lg border-gray-300 transition-colors ${
                    currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-800 hover:bg-gray-100"
                }`}
            >
                Next
            </button>
        );

        return (
            <div className="flex rounded-lg overflow-hidden shadow-sm">
                {pages}
            </div>
        );
    };

    return (
        <>
            {/* Category Banner with fixed height and better padding */}
            <CategoryBanner
                categoryName={activeCategoryTitle}
                description={categoryDesc}
            />{" "}
            <div className="bg-white">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row">
                        {/* Filter Sidebar - Sticky on Desktop */}
                        <div className="w-full lg:w-1/4 lg:pr-8 py-8 border-r border-gray-100 lg:sticky lg:top-0 h-full">
                            <h2 className="text-2xl font-extrabold mb-6 text-gray-900">
                                Browse Categories
                            </h2>
                            {/* Main Categories (Functional Links) */}
                            <CategoryLinkFilter
                                title="Book Types"
                                filters={
                                    dynamicFilterOptions.mainCategoryFilters
                                }
                                selected={selectedCategories}
                                onSelectCategory={handleCategoryLinkSelect}
                            />

                            <h2 className="text-2xl font-extrabold mt-8 mb-4 text-gray-900">
                                Refine Results
                            </h2>
                            {/* Checkbox Filters */}
                            <CheckboxFilter
                                title="Availability"
                                filters={
                                    dynamicFilterOptions.availabilityFilters
                                }
                                selected={selectedAvailability}
                                onChange={handleFilterChange(
                                    setSelectedAvailability
                                )}
                            />
                            <CheckboxFilter
                                title="Format"
                                filters={dynamicFilterOptions.formatFilters}
                                selected={selectedFormats}
                                onChange={handleFilterChange(
                                    setSelectedFormats
                                )}
                            />
                            {/* Placeholder Brand Filter */}
                            <CheckboxFilter
                                title="Publisher"
                                filters={[
                                    {
                                        name: "Ap Bokifa Publishing",
                                        count: ALL_PRODUCTS.length,
                                    },
                                ]}
                                selected={[]}
                                onChange={() => {}}
                            />
                           
                            <CheckboxFilter
                                title="Customer Rating"
                                filters={dynamicFilterOptions.ratingFilters}
                                selected={selectedRatings}
                                onChange={handleFilterChange(
                                    setSelectedRatings
                                )}
                            />
                        </div>

                        {/* Product Grid */}
                        <main className="lg:w-3/4 py-8 lg:pl-8">
                            {/* Top bar containing result count and Sort Dropdown */}
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                                {/* Result Count (Fix implemented here) */}
                                <div className="text-lg text-gray-600 font-medium">
                                    Showing{" "}
                                    <span className="font-bold text-gray-900">
                                        {startIndex + 1}–{displayEndIndex}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-bold text-gray-900">
                                        {totalProducts}
                                    </span>{" "}
                                    results
                                </div>

                                {/* Sort Dropdown */}
                                <SortDropdown
                                    selectedSort={selectedSort}
                                    onSortChange={setSelectedSort}
                                />
                            </div>

                            {totalProducts > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-6 gap-y-10">
                                    {pageProducts.map((product) => (
                                        <ProductGridCard
                                            key={product.id}
                                            product={product}
                                            onViewProduct={addRecentlyViewed}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center py-20 bg-gray-50 rounded-xl shadow-inner">
                                    <p className="text-2xl font-semibold text-gray-500">
                                        No books found matching your current
                                        filters.
                                    </p>
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="flex justify-center mt-12">
                                {renderPagination()}
                            </div>
                        </main>
                    </div>
                </div>

                {/* Recently Viewed Products */}
                {recentlyViewedIds.length > 0 && (
                    <div className="border-t border-gray-200 mt-12 pt-8">
                        <ProductCarousel
                            title="Recently viewed products"
                            productIds={recentlyViewedIds}
                            onViewProduct={addRecentlyViewed}
                            slidesToShowCount={4}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default BookstorePage;
