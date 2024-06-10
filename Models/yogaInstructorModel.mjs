import mongoose from "mongoose";

const yogaInstructorSchema = mongoose.Schema({
    name: String,
    image: String,
    descripttion: String,
    socialMediaLinks: {
        twitter: String,
        facebook: String,
        instagram: String
    }
})

const yogaInstructorCol = new mongoose.model("yogaInstructorInfos", yogaInstructorSchema)
export default yogaInstructorCol