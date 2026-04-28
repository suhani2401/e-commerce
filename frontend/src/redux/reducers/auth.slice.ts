import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../types";


const initialState: AuthState = {
    loggedInUser: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload;
        },
        logout: (state) => {
            state.loggedInUser = null;

        },
    }
});

export const { logout, setLoggedInUser } = authSlice.actions;
export default authSlice.reducer;