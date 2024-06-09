import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: false,
        email: null,
        token: null,
        isAdmin: false,
        user_id: null,
    },
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isAdmin = action.payload.isAdmin;
            state.user_id = action.payload.user_id;
            // console.log("Received userData: ", state.userData);
        },
        logout: (state) => {
            state.status = false;
            state.email = null;
            state.isAdmin = false;
            state.user_id = null;
            state.token = null;
        }
    }
});

export const {login, logout} = authSlice.actions;

// exporting the reducer form from authSlice
export default authSlice.reducer;