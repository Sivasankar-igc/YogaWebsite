import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCode } from "../../utils/statusFile.mjs";
import axios from "axios";

const initialState = {
    data: [],
    status: statusCode.EMPTY
}

const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        addPage: (state, action) => {
            state.data.push(action.payload)
            state.status = statusCode.IDLE
        },
        modifyPage: (state, action) => {
            const { _id, pageName, pageTitle, pageImage, pageDescription } = action.payload;
            let temp = state.data.find(d => d._id === _id)
            if (temp) {
                temp.pageName = pageName;
                temp.pageImage = pageImage;
                temp.pageTitle = pageTitle;
                temp.pageDescription = pageDescription;
            }
        },
        removePage: (state, action) => {
            state.data = state.data.filter(d => d._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPages.fulfilled, (state, action) => {
                const { status, message } = action.payload;
                state.data = message;
                state.status = status ? statusCode.IDLE : statusCode.EMPTY
            })
            .addCase(getPages.pending, (state, action) => {
                state.status = statusCode.LOADING;
            })
            .addCase(getPages.rejected, (state, action) => {
                state.status = statusCode.ERROR
            })
    }
})

export const { addPage, modifyPage, removePage } = pageSlice.actions;
export default pageSlice.reducer;

export const getPages = createAsyncThunk(
    "getPages/get",
    async () => {
        try {
            const response = await axios.get("admin/getPage")
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)