import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: "",
        decoded: {
            firstName: "",
            email: "",
            id: "",
        },
    },

    reducers: {

        login: (state, action) => {
            return{
                ...state,
                ...action.payload,
            }
        },

        logout: (state, action) => {
            return {
                token: "",
                decoded: {
                    firstName: "",
                    email: "",
                    id: "",
                },
                
            }
        },
    }
})

export const {login,logout} = userSlice.actions

export const getUserData = (state) => state.user

export default userSlice.reducer