import React from "react";
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import ProductCard from "../components/product/ProductCard";

const Compare = () => {
  const { compareList } = useCompare();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Compare</span>
      </nav>

      <h1 className="text-3xl font-serif mb-8 text-center">Compare Products</h1>

      {compareList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your compare list is empty.</p>
          <Link
            to="/"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {compareList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Compare;
