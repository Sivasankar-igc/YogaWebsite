import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../../utils/statusFile.mjs";
import axios from "axios";

const initialState = {
    data: [],
    status: statusCode.EMPTY
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        addBlog: (state, action) => {
            state.data.push(action.payload);
        },
        modifyBlog: (state, action) => {
            const { _id, author, authorImage, indexImage, title, description } = action.payload;
            let temp = state.data.find(d => d._id === _id);
            if (temp) {
                temp.author = author;
                temp.authorImage = authorImage;
                temp.indexImage = indexImage;
                temp.title = title;
                temp.description = description;
            }
        },
        removeBlog: (state, action) => {
            state.data = state.data.filter(d => d._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.fulfilled, (state, action) => {
                const { status, message } = action.payload;
                state.data = message;
                state.status = status ? statusCode.IDLE : statusCode.EMPTY
            })
            .addCase(getBlogs.pending, (state, action) => {
                state.status = statusCode.LOADING;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.status = statusCode.ERROR;
            })
    }
})

export const { addBlog, modifyBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const getBlogs = createAsyncThunk(
    "getBlogs/get",
    async () => {
        try {
            const response = await axios.get("getBlogContents")
            return response.data;
        } catch (error) {
            console.error(`Clientside error : couldn't retrieve blogs --> ${error}`)
        }
    }
)