import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statusCode } from "../../utils/statusFile.mjs";
import axios from "axios";

const initialState = {
    data: [],
    status: statusCode.EMPTY
}

const footerSlice = createSlice({
    name: "footer",
    initialState,
    reducers: {
        addFooter: (state, action) => {
            state.status = statusCode.IDLE
        },
        modifyFooter: (state, action) => {
           
        },
        removeFooter: (state, action) => {
            
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFooter.fulfilled, (state, action) => {
                const { status, message } = action.payload;
                state.data = message;
                state.status = status ? statusCode.IDLE : statusCode.EMPTY
            })
            .addCase(getFooter.pending, (state, action) => {
                state.status = statusCode.LOADING;
            })
            .addCase(getFooter.rejected, (state, action) => {
                state.status = statusCode.ERROR
            })
    }
})

export const { addFooter, modifyFooter, removeFooter } = footerSlice.actions;
export default footerSlice.reducer;

export const getFooter = createAsyncThunk(
    "getFooter/get",
    async () => {
        try {
            const response = await axios.get("admin/getFooter")
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)