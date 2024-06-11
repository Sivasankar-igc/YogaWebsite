import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { statusCode } from "../../utils/statusFile.mjs"
import axios from "axios"

const initialState = {
    data: {},
    status: statusCode.EMPTY
}

const contactPageSlice = createSlice({
    name: "contactpage",
    initialState,
    reducers: {
        modifyContactPage: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContactPageContents.fulfilled, (state, action) => {
                state.data = action.payload.message;
                state.status = action.payload.status ? statusCode.IDLE : statusCode.EMPTY
            })
            .addCase(getContactPageContents.pending, (state, action) => {
                state.status = statusCode.LOADING
            })
            .addCase(getContactPageContents.rejected, (state, action) => {
                state.status = statusCode.ERROR
            })
    }

})

export const { modifyContactPage } = contactPageSlice.actions;
export default contactPageSlice.reducer;


export const getContactPageContents = createAsyncThunk(
    "getContactPageContents/get",
    async () => {
        try {
            const response = await axios.get("getContactPageContents")
            return response.data
        } catch (error) {
            console.error(`Clientside error : couldn't retrieve contact page contents --> ${error}`)
        }
    }
)