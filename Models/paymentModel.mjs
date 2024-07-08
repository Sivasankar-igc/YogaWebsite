import mongoose from "mongoose"

const paymentTableSchema = new mongoose.Schema({
    username: String,
    userEmail: String,
    dateOfPayment: String,
    item: String,
    paymentImage: String
})

const paymentTableCol = new mongoose.model("paymentCollection", paymentTableSchema)
export default paymentTableCol;