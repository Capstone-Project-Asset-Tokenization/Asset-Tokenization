import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import fakeData from '../../../public/fakeData.json'; // Adjust the path as necessary

export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async () => {
    // Simulating an async call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return fakeData; // Directly return the imported data
  }
);


// // Async thunk for fetching assets
// export const fetchAssets = createAsyncThunk(
//   'assets/fetchAssets',
//   async () => {
//     // Replace this with your actual API call to the Ethereum endpoint
//     const response = await fetch('your-ethereum-api-endpoint');
//     const data = await response.json();
//     return data; // This will be the payload
//   }
// );

const assetsSlice = createSlice({
  name: 'assets',
  initialState: {
    assets: [],
    filteredAssets: [],
    searchCriteria: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },

    filterAssets: (state) => {
        if (state.searchCriteria) {
          let filtered = state.assets;
          const { name, category, minPrice, maxPrice } = state.searchCriteria;
  
          if (name) {
            filtered = filtered.filter(asset => asset.name.toLowerCase().includes(name.toLowerCase()));
          }
          if (category) {
            filtered = filtered.filter(asset => asset.category.toLowerCase() === category.toLowerCase());
          }
          if (minPrice) {
            filtered = filtered.filter(asset => asset.price >= minPrice);
          }
          if (maxPrice) {
            filtered = filtered.filter(asset => asset.price <= maxPrice);
          }
  
          state.filteredAssets = filtered;
        } else {
          // If no search criteria, reset to show all assets
          state.filteredAssets = state.assets;
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.assets = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchCriteria, filterAssets } = assetsSlice.actions;

export default assetsSlice.reducer;
