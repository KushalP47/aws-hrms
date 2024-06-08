import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: false,
        email: null,
        token: null,
        isAdmin: false,
    },
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isAdmin = action.payload.isAdmin;
            // console.log("Received userData: ", state.userData);
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.isAdmin = false;
        }
    }
});

export const {login, logout} = authSlice.actions;

// exporting the reducer form from authSlice
export default authSlice.reducer;