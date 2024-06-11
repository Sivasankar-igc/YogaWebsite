import { createSlice } from "@reduxjs/toolkit";

const initialVideos = [
  {
    id: 1,
    image: "/cart (2).jpeg",
    heading: "Gentle Morning Yoga",
    description:
      "Start your day with this calming and energizing yoga practice.",
    videoLink: "https://www.youtube.com/watch?v=9ZRvdbG54H4",
    completed: true,
  },
  {
    id: 2,
    image: "/cart (3).jpeg",
    heading: "Yoga For Beginners - The Basics",
    description:
      "Learn basic poses and principles of yoga in this beginner-friendly video.",
    videoLink: "https://www.youtube.com/watch?v=pWobp3phsEU",
    completed: false,
  },
  {
    id: 3,
    image: "/cart (1).jpeg",
    heading: "Vigorous Vinyasa Flow Yoga",
    description:
      "A dynamic 30-minute vinyasa flow class for intermediate to advanced practitioners.",
    videoLink: "https://www.youtube.com/watch?v=SZU7Sbgu57o",
    completed: false,
  },
];

const videosSlice = createSlice({
  name: "videos",
  initialState: initialVideos,
  reducers: {
    addVideo: (state, action) => {
      state.push(action.payload);
    },
    updateVideo: (state, action) => {
      const { id, heading, description, image, videoLink, completed } =
        action.payload;
      const video = state.find((video) => video.id === id);
      if (video) {
        video.heading = heading;
        video.description = description;
        video.image = image;
        video.videoLink = videoLink;
        video.completed = completed;
      }
    },
    deleteVideo: (state, action) => {
      const { id } = action.payload;
      return state.filter((video) => video.id !== id);
    },
  },
});

export const { addVideo, updateVideo, deleteVideo } = videosSlice.actions;
export default videosSlice.reducer;
