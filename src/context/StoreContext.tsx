"use client";

import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

interface Product {
  id: string;
  name: string;
  category: string;
  gender: string;
  price: number;
  sizes: string[];
  color: string;
}

interface Filters {
  category: string;
  gender: string;
  price: string;
  size: string;
  color: string;
}

interface StoreContextType {
  products: Product[];
  filteredProducts: Product[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    category: "All",
    gender: "",
    price: "",
    size: "",
    color: "",
  });

  useEffect(() => {
    // Fetch all products
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://nuke-c480e-default-rtdb.firebaseio.com/store.json"
        );
        const data = await res.json();
        // const firstKey = Object.keys(data)[0];
        // const products = data[firstKey] || [];

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...products];

    if (filters.category !== "All") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.gender) {
      filtered = filtered.filter((p) => p.gender === filters.gender);
    }
    if (filters.price) {
      filtered = filtered.filter((p) => {
        if (filters.price === "Under $50") return p.price < 50;
        if (filters.price === "$50 - $100")
          return p.price >= 50 && p.price <= 100;
        if (filters.price === "Over $100") return p.price > 100;
        return true;
      });
    }
    if (filters.size) {
      filtered = filtered.filter((p) => p.sizes.includes(filters.size));
    }
    if (filters.color) {
      filtered = filtered.filter((p) => p.color === filters.color);
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  return (
    <StoreContext.Provider
      value={{ products, filteredProducts, filters, setFilters }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
