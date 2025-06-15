import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-16 pb-0">
      <form
        className="flex items-center mb-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search stores..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-[9px] rounded-r hover:bg-blue-700 transition cursor-pointer"
          onClick={(e) => e.preventDefault()}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
