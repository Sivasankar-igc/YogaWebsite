import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../../utils/statusFile.mjs";
import axios from "axios";

const initialState = {
    data: null,
    status: statusCode.EMPTY
}

const homePageSlice = createSlice({
    name: "homepage",
    initialState,
    reducers: {
        modifyHomePage: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomePageContents.fulfilled, (state, action) => {
                state.data = action.payload.message;
                state.status = action.payload.status ? statusCode.IDLE : statusCode.EMPTY;
            })
            .addCase(getHomePageContents.pending, (state, action) => {
                state.status = statusCode.LOADING
            })
            .addCase(getHomePageContents.rejected, (state, action) => {
                state.status = statusCode.ERROR
            })
    }
})

export default homePageSlice.reducer;
export const { modifyHomePage } = homePageSlice.actions

export const getHomePageContents = createAsyncThunk(
    "getHomePageContents/get",
    async () => {
        try {
            const response = await axios.get("getHomePageContents");
            return response.data;
        } catch (error) {
            console.error(`Clientside error : couldn't retrieve the homepage content --> ${error}`)
        }
    }
)