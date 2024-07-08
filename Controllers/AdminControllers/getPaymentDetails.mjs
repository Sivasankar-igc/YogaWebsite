import paymentTableCol from "../../Models/paymentModel.mjs"

export default async (req, res) => {
    const data = await paymentTableCol.find();
    res.status(200).json({
        status: data.length > 0,
        message: data
    });
}