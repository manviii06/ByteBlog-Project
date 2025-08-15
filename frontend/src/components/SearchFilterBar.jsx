import React, { useState, useEffect } from "react";
import { Search, Tag, SortDesc, Calendar as CalendarIcon, Eye, Heart } from "lucide-react";

const SearchFilterBar = ({ onFilterChange, categories }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minViews, setMinViews] = useState("");
  const [onlyMostLiked, setOnlyMostLiked] = useState(false);

  useEffect(() => {
    onFilterChange({ search, category, sortBy, startDate, endDate, minViews, onlyMostLiked });
  }, [search, category, sortBy, startDate, endDate, minViews, onlyMostLiked]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-wrap gap-4 items-center mb-8">
      <div>
      <h2 className="font-bold text-xl">Filter and Search Bar...</h2>

      </div>
      <div className="flex flex-wrap gap-4 items-center w-full">

      
      {/* Search Input */}
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/4">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none flex-1"
        />
      </div>

      {/* Category Filter */}
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
        <Tag className="w-5 h-5 text-gray-500 mr-2" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="outline-none bg-transparent"
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
        <SortDesc className="w-5 h-5 text-gray-500 mr-2" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="outline-none bg-transparent"
        >
          <option value="latest">Latest</option>
          <option value="views">Most Viewed</option>
          <option value="likes">Most Liked</option>
        </select>
      </div>

      

      {/* Min Views */}
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
        <Eye className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="number"
          placeholder="Min Views"
          value={minViews}
          onChange={(e) => setMinViews(e.target.value)}
          className="outline-none w-24"
        />
      </div>

      {/* Only Most Liked Toggle */}
      <div
        onClick={() => setOnlyMostLiked(!onlyMostLiked)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
          onlyMostLiked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
        }`}
      >
        <Heart className="w-5 h-5" />
        <span>Most Liked</span>
      </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
