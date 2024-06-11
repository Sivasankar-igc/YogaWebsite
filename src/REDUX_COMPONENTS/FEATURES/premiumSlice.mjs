import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { statusCode } from "../../utils/statusFile.mjs"

const initialState = {
    data: [],
    status: statusCode.EMPTY
}

const premiumSlice = createSlice({
    name: "premium",
    initialState,
    reducers: {
        addPremium(state, action) {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPremiumData.fulfilled, (state, action) => {
                state.data = action.payload.message;
                state.status = action.payload.status ? statusCode.IDLE : statusCode.EMPTY;
            })
    }
})

export default premiumSlice.reducer;
export const { addPremium } = premiumSlice.actions;

export const getPremiumData = createAsyncThunk(
    "getPremium/get",
    async () => {
        try {
            const response = await axios.get("getPremiumDetails")
            return response.data;
        } catch (error) {
            console.error(`Clientside error : couldn't retrieve premium section data --> ${error}`)
        }
    }
)