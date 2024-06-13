import vidoeCol from "../../Models/videoModel.mjs"

export const getVideoContents = async (req, res) => {
    try {
        const data = await vidoeCol.find()
        data.length > 0 ? res.status(200).json({ status: true, message: data }) : res.status(200).json({ status: false, message: [] })
    } catch (error) {
        console.error(`Server error  : couldn't retrieve video contents --> ${error}`)
    }
}