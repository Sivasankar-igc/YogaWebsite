import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    fullName: String,
    email: String,
    phno: String,
    message: String
})

const contactCol = new mongoose.model("contactCollection", contactSchema)
export default contactCol;