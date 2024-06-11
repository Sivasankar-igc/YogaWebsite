import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { statusCode } from "../../utils/statusFile.mjs"
import axios from "axios"

const initialState = {
    data: {},
    status: statusCode.EMPTY
}

const aboutPageSlice = createSlice({
    name: "aboutpage",
    initialState,
    reducers: {
        modifyAboutPage: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAboutPageContents.fulfilled, (state, action) => {
                state.data = action.payload.message;
                state.status = action.payload.status ? statusCode.IDLE : statusCode.EMPTY
            })
            .addCase(getAboutPageContents.pending, (state, action) => {
                state.status = statusCode.LOADING;
            })
            .addCase(getAboutPageContents.rejected, (state, action) => {
                state.status = statusCode.ERROR;
            })
    }

})

export const { modifyAboutPage } = aboutPageSlice.actions;
export default aboutPageSlice.reducer;


export const getAboutPageContents = createAsyncThunk(
    "getAboutPageContents/get",
    async () => {
        try {
            const response = await axios.get("getAboutPageContents")
            return response.data
        } catch (error) {
            console.error(`Clientside error : couldn't retrieve contact page contents --> ${error}`)
        }
    }
)