import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchCriteria, filterAssets } from '../assetsSlice'
const SearchForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchCriteria({
      name: formData.name,
      category: formData.category,
      minPrice: formData.minPrice,
      maxPrice: formData.maxPrice,
    }));
    // Optionally, dispatch another action to filter properties based on new criteria
    dispatch(filterAssets());
  };
  

  return (
    <div className="bg-[#2B2B2B] p-6">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Search your favourite assets"
          className="border border-[#858584] bg-transparent placeholder-[#858584] text-white p-3 w-1/3 rounded-lg"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="border border-[#858584] bg-transparent placeholder-[#858584] text-white p-2 rounded-lg"
        />
        <input
          type="number"
          name="minPrice"
          value={formData.minPrice}
          onChange={handleChange}
          placeholder="Min Price (ETH)"
          className="border border-[#858584] bg-transparent placeholder-[#858584] text-white p-2 rounded-lg"
        />
        <input
          type="number"
          name="maxPrice"
          value={formData.maxPrice}
          onChange={handleChange}
          placeholder="Max Price (ETH)"
          className="border border-[#858584] bg-transparent placeholder-[#858584] text-white p-2 rounded-lg"
        />
        <button type="submit" className="bg-[#A259FF] hover:bg-[#b06af9] text-white p-3 rounded-lg">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
