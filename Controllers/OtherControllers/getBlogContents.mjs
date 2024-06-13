import blogCol from "../../Models/blogModel.mjs"

export default async (req, res) => {
    try {
        const data = await blogCol.find()
        data.length > 0 ? res.status(200).json({ status: true, message: data }) : res.status(200).json({ status: false, message: [] })
    } catch (error) {
        console.error(`Server error : couldn't retrieve blog contents --> ${error}`)
    }
}