import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy) {
      searchParams.set('sortBy', sortBy);
    } else {
      searchParams.delete('sortBy'); // Remove if default
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 mb-4 flex justify-end">
      <div className="w-full max-w-[220px]">
        <label
          htmlFor="sort"
          className="text-sm sm:text-base text-gray-700 block mb-1 sm:hidden"
        >
          Sort by:
        </label>
        <select
          id="sort"
          value={searchParams.get('sortBy') || ''}
          onChange={handleSortChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    </div>
  );
};

export default SortOptions;
