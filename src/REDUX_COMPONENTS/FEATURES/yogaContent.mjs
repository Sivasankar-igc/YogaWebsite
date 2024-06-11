import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { statusCode } from "../../utils/statusFile.mjs"
import axios from "axios";

const initialState = {
    data: [],
    status: statusCode.LOADING,
    adminCredential: false // WHEN THE ADMIN LOGS INTO HIS/HER ACCCOUNT, THIS CREDENTIAL WILL BE TRUE
}

const yogaContentSlice = createSlice({
    name: "yogacontent",
    initialState,
    reducers: {
        setAdminCredential(state, action) {
            state.adminCredential = action.payload; // WHEN THE ADMIN LOGS INTO THE ACCOUNT, THIS WILL BE CALLED WITH TRUE VALUE AND AFTER LOGOUT, WILL BE CALLED WITH FALSE VALUE
        },
        addYogaContent(state, action) {
            state.data.push(action.payload)
        },
        modifyYogaContent(state, action) {
            
            let { contentId, contentLink, indexImage, description } = action.payload; // FROM ADMIN SIDE THE MODIFIED CONTENT'S contentId, contentLink, indexImage and description of the content will be provided
            let tempData = state.data.find(content => content.contentId === contentId)
            if (tempData) {
                tempData.contentLink = contentLink;
                tempData.indexImage = indexImage;
                tempData.description = description;
            }
        },
        removeYogaContent(state, action) {
            state.data = state.data.filter(d => d._id !== action.payload)
        },
        removeComment(state, action) {
            let { contentId, commentId } = action.payload;
            let tempData = state.data.find(content => content.contentId === contentId);
            tempData.comments = tempData.comments.filter(comment => comment.commentId !== commentId);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getYogaContents.fulfilled, (state, action) => {
                state.data = action.payload.message;
                state.status = action.payload.status ? statusCode.IDLE : statusCode.EMPTY
            })
            .addCase(getYogaContents.pending, (state, action) => {
                state.status = statusCode.LOADING;
            })
            .addCase(getYogaContents.rejected, (state, action) => {
                state.status = statusCode.ERROR;
            })
    }
})

export const { addYogaContent, modifyYogaContent, removeYogaContent, setAdminCredential, removeComment } = yogaContentSlice.actions;
export default yogaContentSlice.reducer;

export const getYogaContents = createAsyncThunk(
    "getYogaContent/get",
    async () => {
        try {
            const response = await axios.get()
            return response.data;
        } catch (error) {
            console.error(`Clientside error: couldn't get the yoga contents-->${error}`)
            window.alert("Network connection error")
        }
    }
)