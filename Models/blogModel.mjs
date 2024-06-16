import mongoose from "mongoose"

const blogSchema = mongoose.Schema({
    author: String,
    postedAt: {
        time: String,
        date: String
    },
    authorImage: String,
    indexImage: String,
    title: String,
    description: String
})

const blogCol = new mongoose.model("blogCollection", blogSchema)

export default blogCol