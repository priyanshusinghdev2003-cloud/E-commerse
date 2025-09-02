import React, { useState } from "react";

function Filter() {
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: "",
    maxPrice: "",
    priceRange: 1000,
    brands: [],
    colors: [],
    sortBy: "popularity",
  });

  const handleCategoryChange = (cat) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const handleBrandChange = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handleColorChange = (color) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleSortByChange = (sortBy) => {
    setFilters({ ...filters, sortBy });
  };
  const fetchProductsByFilter = () => {
    console.log(filters);
  };

  return (
    <div className="w-1/3 h-full flex flex-col gap-6 p-6 shadow-lg rounded-xl bg-white">
      {/* Category */}
      <div id="category" className="flex flex-col gap-3">
        <h1 className="text-lg font-semibold text-gray-800">Category</h1>
        <div className="flex flex-col gap-2 text-gray-700">
          {[
            "All",
            "Electronic",
            "Fashion",
            "Home & Kitchen",
            "Books",
            "Toys",
          ].map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 cursor-pointer hover:text-indigo-600"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="accent-indigo-500"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div id="price" className="flex flex-col gap-3">
        <h1 className="text-lg font-semibold text-gray-800">Price</h1>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center gap-2">
            <input
              type="number"
              name="min-price"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
              placeholder="Min"
              className="w-1/2 p-2 border rounded-md text-sm focus:ring focus:ring-indigo-300"
            />
            <input
              type="number"
              name="max-price"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              placeholder="Max"
              className="w-1/2 p-2 border rounded-md text-sm focus:ring focus:ring-indigo-300"
            />
          </div>
          <input
            type="range"
            min={50}
            max={5000}
            value={filters.priceRange}
            onChange={(e) =>
              setFilters({ ...filters, priceRange: e.target.value })
            }
            className="w-full accent-indigo-500"
          />
          <span className="text-sm text-gray-600">
            Selected: ₹{filters.priceRange}
          </span>
        </div>
      </div>

      {/* Brand */}
      <div id="brand" className="flex flex-col gap-3">
        <h1 className="text-lg font-semibold text-gray-800">Brand</h1>
        <div className="flex flex-col gap-2 text-gray-700">
          {["Apple", "Samsung", "Sony", "Nike", "Adidas"].map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer hover:text-indigo-600"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="accent-indigo-500"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color (instead of Rating) */}
      <div id="color" className="flex flex-col gap-3">
        <h1 className="text-lg font-semibold text-gray-800">Color</h1>
        <div className="flex flex-wrap gap-2 text-gray-700">
          {["Red", "Blue", "Green", "Black", "White"].map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`px-3 py-1 rounded-md border ${
                filters.colors.includes(color)
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 hover:bg-indigo-100"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div id="sort" className="flex flex-col gap-3">
        <h1 className="text-lg font-semibold text-gray-800">Sort By</h1>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          className="p-2 border rounded-md focus:ring focus:ring-indigo-300"
        >
          <option value="popularity">Popularity</option>
          <option value="latest">Latest</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>
      <button
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={fetchProductsByFilter}
      >
        Apply
      </button>
    </div>
  );
}

export default Filter;
