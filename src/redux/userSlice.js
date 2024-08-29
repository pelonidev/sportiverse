import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn : false,
    token : undefined,
    role : undefined
};

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setLoggedIn : (state, data) => {
            state.isLoggedIn = true;
            state.token = data.payload.token;
            state.role = data.payload.role;
            state.username = data.payload.username;
        },
        setLoggedOut : (state) => {
            state.isLoggedIn = false;
            state.token = undefined;
        }
    }
})

export const { setLoggedIn, setLoggedOut } = userSlice.actions;
export default userSlice.reducer;