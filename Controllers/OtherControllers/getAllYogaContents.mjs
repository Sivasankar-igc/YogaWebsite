import yogaCol from "../../Models/yogaContentModel.mjs";

export const getAllYogaContents = async (req, res) => {
    try {
        const response = await yogaCol.find();
        response.length > 0 ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: [] })
    } catch (error) {
        console.error(`Server error : couldn't get yoga contents --> ${error}`)
    }
}