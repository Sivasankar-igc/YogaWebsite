import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { statusCode } from "../../utils/statusFile.mjs"
import axios from "axios"

const initialState = {
    data: [],
    status: statusCode.EMPTY
}

const yogaInstructorSlice = createSlice({
    name: 'yogainstructor',
    initialState,
    reducers: {
        addYogaInstructor: (state, action) => {
            state.data.push(action.payload)
        },
        removeYogaInstructor: (state, action) => {
            state.data = state.data.filter(d => d._id !== action.payload);
        },
        modifyYogaInstructor: (state, action) => {
            const { _id, instructorDetails, socialMediaLinks } = action.payload;

            let tempData = state.data.find(d => d._id === _id)
            if (tempData) {
                tempData.name = instructorDetails.name
                tempData.image = instructorDetails.image;
                tempData.description = instructorDetails.description;
                tempData.socialMediaLinks = socialMediaLinks;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getYogaInstructorData.fulfilled, (state, action) => {
                state.data = action.payload.message;
                state.status = action.payload.status ? statusCode.IDLE : statusCode.EMPTY
            })
            .addCase(getYogaInstructorData.pending, (state, action) => {
                state.status = statusCode.LOADING;
            })
            .addCase(getYogaInstructorData.rejected, (state, action) => {
                state.status = statusCode.ERROR;
            })
    }
})

export const { addYogaInstructor, modifyYogaInstructor, removeYogaInstructor } = yogaInstructorSlice.actions;
export default yogaInstructorSlice.reducer;

export const getYogaInstructorData = createAsyncThunk(
    "getYogaInstructorInfo/get",
    async () => {
        try {
            const response = await axios.get("admin/getYogaInstructor");
            return response.data;
        } catch (error) {
            console.error(`Clientside error : couldn't retrieve yoga instructor data --> ${error}`)
        }
    }
)