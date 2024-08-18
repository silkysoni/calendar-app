import React from "react";
import "./CategoryFilter.css";

const CategoryFilter = ({ filterCategory, setFilterCategory }) => {
  return (
    <select
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
      className="category-filter-dropdown"
    >
      <option value="All">All Categories</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
    </select>
  );
};

export default CategoryFilter;
