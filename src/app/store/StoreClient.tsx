"use client";

import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import Sidebar from "@/components/layout/Sidebar";

export default function StoreClient({ products }) {
  const [filters, setFilters] = useState({
    category: "All",
    gender: "All",
    price: "All",
    size: "All",
    color: "All",
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  // Filter logic
  const filteredProducts = products.filter((product) => {
    return (
      (filters.category === "All" || product.category === filters.category) &&
      (filters.gender === "All" || product.gender === filters.gender) &&
      (filters.price === "All" ||
        (filters.price === "0-50" && product.price < 50) ||
        (filters.price === "50-100" &&
          product.price >= 50 &&
          product.price <= 100) ||
        (filters.price === "100+" && product.price > 100)) &&
      (filters.size === "All" || product.size?.includes(filters.size)) &&
      (filters.color === "All" || product.color === filters.color)
    );
  });

  return (
    <div className="flex">
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />

      <div className="container mx-auto p-4 w-3/4">
        <h1 className="text-3xl font-semibold text-center mb-6">Store</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((shoe) => (
              <ProductCard shoe={shoe} key={shoe.id} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products match the selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
