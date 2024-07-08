import mongoose from "mongoose"

const pageSchema = new mongoose.Schema({
    pageName: { type: String, unique: true, required: true },
    pageTitle: String,
    pageImage: String,
    pageDescription: String
})

const pageCol = new mongoose.model("Pagecollection", pageSchema)

export default pageCol;