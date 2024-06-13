import { configureStore } from "@reduxjs/toolkit"
import userSlice from "../FEATURES/userSlice.mjs"
import yogaContentSlice from "../FEATURES/yogaContent.mjs";
import premiumSlice from "../FEATURES/premiumSlice.mjs";
import adminSlice from "../FEATURES/adminSlice.mjs";
import homePageSlice from "../FEATURES/homePageSlice.mjs";
import contactPageSlice from "../FEATURES/contactPageSlice.mjs";
import aboutPageSlice from "../FEATURES/aboutPageSlice.mjs";
import yogaInstructorSlice from "../FEATURES/yogaInstructorSlice.mjs";
import videosSlice from "../FEATURES/videosSlice";
import blogSlice from "../FEATURES/blogSlice.mjs";

const store = configureStore({
    reducer: {
        user: userSlice,
        yogacontent: yogaContentSlice,
        premium: premiumSlice,
        admin: adminSlice,
        homepage: homePageSlice,
        contactpage: contactPageSlice,
        aboutpage: aboutPageSlice,
        yogainstructor: yogaInstructorSlice,
        videos:videosSlice,
        blog:blogSlice
    }
})

export default store;