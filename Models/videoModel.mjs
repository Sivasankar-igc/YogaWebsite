import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    image: String,
    heading: String,
    description: String,
    videoLink: String,
    completed: Boolean
})

const vidoeCol = new mongoose.model("videoCollection", videoSchema)

export default vidoeCol