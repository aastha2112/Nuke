import React from "react";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-20 w-64 p-4 bg-base-100 border-r h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Shoe Types */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Type of Shoes</h3>
        <ul className="space-y-2">
          {[
            { name: "Sneakers", count: 23 },
            { name: "Running Shoes", count: 15 },
            { name: "Walking Shoes", count: 8 },
            { name: "Formal Shoes", count: 12 },
            { name: "Boots", count: 5 },
          ].map((shoe) => (
            <li key={shoe.name} className="cursor-pointer hover:text-primary">
              {shoe.name} <span className="text-gray-500">({shoe.count})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Gender Filter */}
      <div className="collapse collapse-arrow bg-base-200 mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">Gender</div>
        <div className="collapse-content space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span>Female</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span>Unisex</span>
          </label>
        </div>
      </div>

      {/* Shop by Price */}
      <div className="collapse collapse-arrow bg-base-200 mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">Shop by Price</div>
        <div className="collapse-content space-y-2">
          <label className="flex items-center space-x-2">
            <input type="radio" name="price" className="radio radio-primary" />
            <span>Under $50</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="price" className="radio radio-primary" />
            <span>$50 - $100</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="price" className="radio radio-primary" />
            <span>Over $1300</span>
          </label>
        </div>
      </div>

      {/* Size Filter */}
      <div className="collapse collapse-arrow bg-base-200 mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">Size</div>
        <div className="collapse-content grid grid-cols-3 gap-2">
          {["5.5", "6", "6.5", "8", "9", "12"].map((size) => (
            <button key={size} className="btn btn-outline btn-sm">
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="collapse collapse-arrow bg-base-200 mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">Color</div>
        <div className="collapse-content flex flex-wrap gap-2">
          {[
            "red",
            "blue",
            "green",
            "yellow",
            "purple",
            "orange",
            "black",
            "white",
            "gray",
            "brown",
          ].map((color) => (
            <label key={color} className="flex items-center space-x-2">
              <input type="radio" name="color" className="hidden" />
              <div
                className="w-6 h-6 rounded-full border-2 cursor-pointer"
                style={{ backgroundColor: color }}
              ></div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
