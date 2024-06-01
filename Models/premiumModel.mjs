import mongoose from "mongoose";

const premiumSectionSchema = new mongoose.Schema({
    premiumName: { type: String, unique: true },
    premiumPeriod: {
        numericValue: Number,
        alphabetValue: String
    },
    discount: Number,
    premiumPrice: Number,
    totalUser: { type: Number, default: 0 },
    backgroundImage: String,
    premiumFeatures: []
})

const premiumCol = new mongoose.model("premiumCollection", premiumSectionSchema);

export default premiumCol;