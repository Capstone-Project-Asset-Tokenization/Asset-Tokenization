import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchCriteria, filterAssets } from './assetsSlice'
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Asset Name"
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <input
        type="number"
        name="minPrice"
        value={formData.minPrice}
        onChange={handleChange}
        placeholder="Min Price (ETH)"
      />
      <input
        type="number"
        name="maxPrice"
        value={formData.maxPrice}
        onChange={handleChange}
        placeholder="Max Price (ETH)"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
