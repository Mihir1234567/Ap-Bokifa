import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ALL_PRODUCTS from "../components/productsData";
import CustomCarousel from "../components/product/CustomCarousel";
import QuickViewDrawer from "../components/QuickViewDrawer";

const CartPage = () => {
  const navigate = useNavigate();

  // Mock Cart Data
  const [cartItems, setCartItems] = useState([
    {
      id: 20,
      title: "A Prayer For Owen Meany",
      author: "JOHN IRVING",
      format: "Hardcover",
      price: 29.95,
      quantity: 2,
      image: "/src/assets/ERASURE.webp",
    },
    {
      id: 4,
      title: "One Hundred Years Of Solitude",
      author: "GABRIEL GARCIA MARQUEZ",
      format: "Hardcover",
      price: 299.95,
      quantity: 1,
      image: "/src/assets/James.webp",
    },
  ]);

  const [note, setNote] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [shippingCountry, setShippingCountry] = useState("Ireland");
  const [shippingProvince, setShippingProvince] = useState("Carlow");
  const [shippingZip, setShippingZip] = useState("380005");
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Calculations
  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const freeShippingThreshold = 1000;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercentage = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  const handleQuantityChange = (id, delta) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );

  const handleRemove = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const handleViewProduct = (product) => navigate(`/product/${product.id}`);

  return (
    <>
      {/* MAIN CART CONTENT */}
      <div className="mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1300px] font-sans text-[#1D4A34] w-full">
        {/* PAGE TITLE */}
        <h1 className="text-3xl sm:text-5xl font-serif text-center mb-6">
          Your cart
        </h1>

        {/* FREE SHIPPING BAR */}
        <div className="max-w-xl mx-auto text-center mb-10 px-2">
          <p className="text-gray-500 mb-2 text-sm">
            {amountForFreeShipping > 0
              ? `Spend $${amountForFreeShipping.toFixed(
                  2
                )} more and get free shipping!`
              : "You've unlocked free shipping!"}
          </p>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* PRODUCT HEADER (desktop) */}
        <div className="hidden md:grid md:grid-cols-[1.5fr_1fr_1fr] border-b border-gray-200 pb-3 mb-8 text-xs font-semibold tracking-wider text-gray-500 uppercase">
          <span>Product</span>
          <span className="text-center">Quantity</span>
          <span className="text-right">Total</span>
        </div>

        {/* CART ITEMS */}
        <div className="space-y-10 border-b border-gray-200 pb-10 mb-10">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] items-center gap-6"
            >
              {/* PRODUCT INFO */}
              <div className="flex gap-4">
                <div className="w-24 h-32 sm:h-36 border rounded overflow-hidden bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-serif text-lg text-gray-900 leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">Format: {item.format}</p>

                  {/* REMOVE (desktop) */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="hidden md:block text-xs text-gray-400 underline mt-2 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* QUANTITY CONTROL */}
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center border rounded px-3 py-1 bg-white">
                  <button
                    className="px-2"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    className="px-2"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                {/* REMOVE (mobile) */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="md:hidden text-xs text-gray-400 underline mt-2"
                >
                  Remove
                </button>
              </div>

              {/* ITEM TOTAL */}
              <div className="text-right font-medium text-[#3AB757] text-lg">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* NOTE + SHIPPING */}
        <div className="mb-10">
          {/* NOTE */}
          <div className="mb-10">
            <label className="block text-xs font-bold text-gray-900 uppercase mb-3">
              Add Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add Note"
              className="w-full border rounded p-4 text-sm h-28 resize-none"
            />
          </div>

          {/* SHIPPING ESTIMATOR */}
          <div>
            <p className="text-sm text-gray-500 mb-4">Get shipping estimates</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Country
                </label>
                <select
                  value={shippingCountry}
                  onChange={(e) => setShippingCountry(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                >
                  <option>Ireland</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Province
                </label>
                <select
                  value={shippingProvince}
                  onChange={(e) => setShippingProvince(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                >
                  <option>Carlow</option>
                  <option>Dublin</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  value={shippingZip}
                  onChange={(e) => setShippingZip(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* ESTIMATE BUTTON */}
            <button className="bg-[#1D4A34] text-white text-sm font-bold py-2 px-6 rounded-full">
              Estimate
            </button>
          </div>
        </div>

        {/* CHECKOUT BOX — NOW UNDER ESTIMATE */}
        <div className="bg-gray-50 p-6 sm:p-8 rounded-lg w-full mb-16">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-serif">Subtotal</span>
            <span className="text-xl font-serif">
              ${subtotal.toFixed(2)} USD
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Taxes and shipping calculated at checkout
          </p>

          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4"
            />
            <label htmlFor="terms" className="ml-2 text-sm">
              I agree with the{" "}
              <a href="#" className="underline">
                terms and conditions
              </a>
            </label>
          </div>

          <button
            disabled={!termsAccepted}
            className={`w-full py-4 rounded-full font-bold text-white ${
              termsAccepted ? "bg-[#3AB757]" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Checkout
          </button>

          <div className="flex justify-center mt-6 opacity-75">
            <img
              src="/src/assets/pay.webp"
              className="h-6 w-auto"
              alt="Payment Methods"
            />
          </div>
        </div>

        <QuickViewDrawer
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          product={quickViewProduct}
        />
      </div>

      {/* FULL-WIDTH CAROUSEL */}
      <div className="w-full mt-16 bg-white">
        <CustomCarousel
          title="You may also like"
          products={ALL_PRODUCTS.slice(0, 8)}
          onViewProduct={handleViewProduct}
          showBrowseButton={false}
          titleCenter={true}
          onQuickView={(p) => setQuickViewProduct(p)}
        />
      </div>
    </>
  );
};

export default CartPage;
