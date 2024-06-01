import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    adminId: { type: String, required: true, unique: true },
    adminPassword: { type: String, required: true }
})

const adminCol = new mongoose.model("adminCollection", adminSchema);

export default adminCol;