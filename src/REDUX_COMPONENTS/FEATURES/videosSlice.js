import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { statusCode } from "../../utils/statusFile.mjs";

const initialState = {
  data: [],
  status: statusCode.EMPTY
}

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.push(action.payload);
    },
    updateVideo: (state, action) => {
      const { _id, heading, description, image, videoLink, completed } =
        action.payload;
      const video = state.find((video) => video._id === _id);
      if (video) {
        video.heading = heading;
        video.description = description;
        video.image = image;
        video.videoLink = videoLink;
        video.completed = completed;
      }
    },
    deleteVideo: (state, action) => {
      const { _id } = action.payload;
      return state.filter((video) => video._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideoContents.fulfilled, (state, action) => {
        const { status, message } = action.payload;
        state.status = status ? statusCode.IDLE : statusCode.EMPTY
        state.data = message;
      })
      .addCase(getVideoContents.pending, (state, action) => {
        state.status = statusCode.LOADING;
      })
      .addCase(getVideoContents.rejected, (state, action) => {
        state.status = statusCode.ERROR
      })
  }
});

export const { addVideo, updateVideo, deleteVideo } = videosSlice.actions;
export default videosSlice.reducer;


export const getVideoContents = createAsyncThunk(
  "getVideoContents/get",
  async () => {
    try {
      const response = await axios.get("getVideoContents")
      return response.data
    } catch (error) {
      console.error(`Clientside error : couldn't retrieve video contents --> ${error}`)
    }
  }
)