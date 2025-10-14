// productsData.js

const ALL_PRODUCTS = [
    {
        id: 1,
        title: "The Wedding People",
        author: "ALICE HOFFMAN",
        price: 299.95,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/the_wedding.webp",
        currentBestselling: false,
        isHighlight: true,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 2,
        title: "Redemption Echo",
        author: "CATHY MCINTOSH",
        price: 249.95,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/RedemptionEcho.webp",
        currentBestselling: false,
        isHighlight: true,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 3,
        title: "The Mighty Red",
        author: "LOUISE ERDRICH",
        price: 279.95,
        rating: 1,
        reviewCount: 1,
        discount: 15,
        imageUrl: "/src/assets/TheMightyRed.webp",
        currentBestselling: false,
        isHighlight: true,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 4,
        title: "James by Percival Everett",
        author: "PERCIVAL EVERETT",
        price: 299.95,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/James.webp",
        currentBestselling: false,
        isHighlight: true,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 5,
        title: "A Sorceress Comes to Call",
        author: "T. KINGFISHER",
        price: 319.95,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/ASorcerresComesToCall.webp",
        currentBestselling: false,
        isHighlight: true,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 6,
        title: "The Last Thing He Told Me",
        author: "Laura Dave",
        price: 35.24, // $29.95 displayed
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/TheLastThingHeToldME.webp",
        currentBestselling: false,
        isHighlight: true,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 7,
        title: "Another Great Book",
        author: "Ap Bokifa",
        price: 199.99,
        rating: 4,
        reviewCount: 120,
        discount: 15,
        imageUrl: "/src/assets/AnotherGreatBook.webp",
        currentBestselling: false,
        isHighlight: false,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    // --- Current Bestselling Products (Retained/Standardized) ---
    {
        id: 8,
        title: "THE HOUSEMAID",
        author: "FREIDA MCFADDEN",
        price: 35.24,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/HouseMaid.webp",
        currentBestselling: true,
        isHighlight: false,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 9,
        title: "THE ILIAD",
        author: "HOMER (Translated by Emily Wilson)",
        price: 35.24,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/Iliad.webp",
        currentBestselling: true,
        isHighlight: false,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 10,
        title: "ENTITLEMENT",
        author: "RUMAAN ALAM",
        price: 35.24,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/ENTITLEMENT.webp",
        currentBestselling: true,
        isHighlight: false,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 11,
        title: "MOUNT SWEET HOME",
        author: "SARAH PINSKER",
        price: 35.24,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/MOUNT_SWEET_HOME.webp",
        currentBestselling: true,
        isHighlight: false,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 12,
        title: "ABSOLUTION",
        author: "JEFF VANDERMEER",
        price: 319.95,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/ABSOLUTION.webp",
        currentBestselling: true,
        isHighlight: false,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 13,
        title: "YELLOWFACE",
        author: "R. F. KUANG",
        price: 35.24,
        rating: 1,
        reviewCount: 1,
        discount: 15,
        imageUrl: "/src/assets/YELLOWFACE.webp",
        currentBestselling: true,
        isHighlight: false,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 14,
        title: "THE WOMEN",
        author: "KRISTIN HANNAH",
        price: 35.24, // $29.95 displayed
        rating: 0, // Updated from image_fde0ff
        reviewCount: 0, // Updated from image_fde0ff
        discount: 15,
        imageUrl: "/src/assets/THE_WOMEN.webp",
        currentBestselling: true,
        isHighlight: false,
        isHalfPrice: true, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 15,
        title: "SO THIRSTY",
        author: "RACHEL HARRISON",
        price: 35.24,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/SO_THIRSTY.webp",
        currentBestselling: true,
        isHighlight: true,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    {
        id: 16,
        title: "Playground",
        author: "RICHARD POWERS",
        price: 35.24, // $29.95 displayed
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/Playground.webp",
        currentBestselling: true,
        isHighlight: false,
        isHalfPrice: true, // New label from image_fde11c
        isSoldOut: false, // Standardized label
    },
    {
        id: 17,
        title: "THE SAINT OF BRIGHT DOORS",
        author: "VAJRA CHANDRASEKERA",
        price: 35.24,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/THE_SAINT_OF_BRIGHT_DOORS.webp",
        currentBestselling: true,
        isHighlight: false,
        isHalfPrice: false, // Standardized label
        isSoldOut: false, // Standardized label
    },
    // --- New Products Added (from Half price books and others) ---
    {
        id: 18,
        title: "BLACK SHEEP",
        author: "RACHEL HARRISON",
        price: 349.95,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/BLACK_SHEEP.webp",
        currentBestselling: false,
        isHighlight: false,
        isHalfPrice: true, // New label from image_fde11c
        isSoldOut: false,
    },
    {
        id: 19,
        title: "THE BOOK SWAP",
        author: "TESSA DİCKERS",
        price: 359.95,
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/THE_BOOK_SWAP.webp",
        currentBestselling: false,
        isHighlight: false,
        isHalfPrice: true, // New label from image_fde11c
        isSoldOut: false,
    },
    {
        id: 20,
        title: "ERASURE",
        author: "PERCIVAL EVERETT",
        price: 35.24, // $29.95 displayed
        rating: 0,
        reviewCount: 0,
        discount: 15,
        imageUrl: "/src/assets/ERASURE.webp",
        currentBestselling: false,
        isHighlight: false,
        isHalfPrice: true, // New label from image_fde11c
        isSoldOut: false,
    },
    {
        id: 21,
        title: "BY ANY OTHER NAME",
        author: "JODI PICOULT",
        price: 239.95,
        rating: 0,
        reviewCount: 0,
        discount: 0, // No discount tag visible
        imageUrl: "/src/assets/BY_ANY_OTHER_NAME.webp",
        currentBestselling: false,
        isHighlight: false,
        isHalfPrice: true, // New label from image_fde11c
        isSoldOut: true, // New label from image_fde11c
    },
    {
        id: 22,
        title: "LOST AND LASSOED",
        author: "LYNNE GRAHAM",
        price: 259.95,
        rating: 5,
        reviewCount: 1,
        discount: 0, // No discount tag visible
        imageUrl: "/src/assets/LOST_AND_LASSOED.webp",
        currentBestselling: false,
        isHighlight: false,
        isHalfPrice: true, // New label from image_fde11c
        isSoldOut: false,
    },
];

// Export the full list as the default export
export default ALL_PRODUCTS;
