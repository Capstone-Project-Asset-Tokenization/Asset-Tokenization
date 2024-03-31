
import { createSlice } from '@reduxjs/toolkit';

// creat redux slice for authentication
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        walletAddress: null,
        token: null,
        roles: []
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setWalletAddress: (state, action) => {
            state.walletAddress = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.walletAddress = null;
            state.token = null;
            state.roles = [];
        },
        setRoles: (state, action) => {
            state.roles = action.payload;
        }

    }
});

export const { setUser, setToken, setWalletAddress, logout } = authSlice.actions;

export default authSlice.reducer;