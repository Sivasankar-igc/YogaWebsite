import mongoose from "mongoose"

const footerSchema = new mongoose.Schema({
    footerLabel: String,
    footerLinks: [
        {
            name: String,
            url: String
        }
    ]
})

const footerCol = new mongoose.model("footercollection", footerSchema)

export default footerCol;