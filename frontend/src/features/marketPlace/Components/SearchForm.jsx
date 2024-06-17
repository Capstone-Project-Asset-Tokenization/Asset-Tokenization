import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const categoryMapping = {
    RealEstate: 0,
    Artwork: 1,
    IntellectualProperty: 2,
    Other: 3,
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "category") {
  //     const categoryValue = categoryMapping[value] ?? categoryMapping["Other"];
  //     setFormData({ ...formData, [name]: categoryValue });
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div className="bg-[#2B2B2B] p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 justify-between"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Search your favourite assets"
          className="border border-[#353535] flex-grow outline-none focus:border-neutral-600 bg-transparent placeholder-[#858584] text-white p-3 w-1/3 rounded-lg"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-[#353535] flex-grow outline-none text-neutral-400 focus:border-neutral-600 bg-transparent p-2 rounded-lg"
          style={{ backgroundColor: "#2B2B2B" }}
        >
          <option className="text-neutral-500" value="">
            {" "}
            Select Category
          </option>
          <option value="RealEstate">Real Estate</option>
          <option value="Artwork">Artwork</option>
          <option value="IntellectualProperty">Intellectual Property</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          name="minPrice"
          value={formData.minPrice}
          onChange={handleChange}
          placeholder="Min Price (ETH)"
          className="border border-[#353535] flex-grow outline-none focus:border-neutral-600 bg-transparent placeholder-[#858584] text-white p-2 rounded-lg"
        />
        <input
          type="number"
          name="maxPrice"
          value={formData.maxPrice}
          onChange={handleChange}
          placeholder="Max Price (ETH)"
          className="border border-[#353535] flex-grow outline-none focus:border-neutral-600 bg-transparent placeholder-[#858584] text-white p-2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-primary-main px-16 hover:bg-primary-dark text-white p-3 rounded-lg"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
