import { createSlice } from "@reduxjs/toolkit";

// Load cached authentication data from localStorage
const cachedAuthData = JSON.parse(localStorage.getItem("authData"));

// Create redux slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: cachedAuthData ? cachedAuthData.user : null,
    isAuthenticated: cachedAuthData ? cachedAuthData.isAuthenticated : false,
    walletAddress: cachedAuthData ? cachedAuthData.walletAddress : null,
    token: cachedAuthData ? cachedAuthData.token : null,
    roles: cachedAuthData ? cachedAuthData.roles : [],
  },
  reducers: {
    setUser: (state, action) => {
      const { token, wallet, user, roles } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.token = token;
      state.walletAddress = wallet;
      state.roles = roles;
      // Cache authentication data
      localStorage.setItem(
        "authData",
        JSON.stringify({
          ...state,
          user: action.payload.user,
          isAuthenticated: true,
          roles: action.payload.roles,
        })
      );
    },
    setToken: (state, action) => {
      state.token = action.payload;
      // Cache authentication data
      localStorage.setItem(
        "authData",
        JSON.stringify({
          ...state,
          token: action.payload,
        })
      );
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
      // Cache authentication data
      localStorage.setItem(
        "authData",
        JSON.stringify({
          ...state,
          walletAddress: action.payload,
        })
      );
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.walletAddress = null;
      state.token = null;
      state.roles = [];
      localStorage.removeItem("authData");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("walletAddress");
    },
    // setRoles: (state, action) => {
    //   state.roles = action.payload;
    // },
  },
});

export const { setUser, setToken, setWalletAddress, logout } =
  authSlice.actions;

export default authSlice.reducer;
