import premiumCol from "../../Models/premiumModel.mjs";

export const getPremiumDetails = async (req, res) => {
    try {
        const data = await premiumCol.find()
        data.length > 0 ? res.status(200).json({ status: true, message: data }) : res.status(200).json({ status: false, message: [] })
    } catch (error) {
        console.error(`Server error : couldn't retrieve premium details --> ${error}`)
        res.status(400).json({ status: false, message: [] })
    }
}