import mongoose from "mongoose";

const yogaContentSchema = new mongoose.Schema({
    contentId: { type: String, required: true, unique: true },
    contentCreation: {
        date: String,
        time: String
    },
    contentHeading: String,
    contentLink: { type: String },
    description: String,
    indexImage: { type: String },
    rating: {
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        views: { type: Number, default: 0 }
    },
    comments: [
        {
            commentId: String,
            username: String,
            comment: String,
            time: String,
            date: String
        }
    ]
})

const yogaCol = new mongoose.model("yogaContentCollection", yogaContentSchema);

export default yogaCol;