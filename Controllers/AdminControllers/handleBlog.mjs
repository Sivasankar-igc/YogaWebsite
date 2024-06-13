import blogCol from "../../Models/blogModel.mjs";
import { generateDate } from "../../utils/generateDate.mjs";
import { generateTime } from "../../utils/generateTime.mjs";

export const addBlog = async (req, res) => {
    try {
        const { author, authorImage, indexImage, title, description } = req.body;
        const data = new blogCol({
            author,
            postedAt: {
                time: generateTime(),
                date: generateDate()
            },
            authorImage,
            indexImage,
            title,
            description
        })

        const response = await data.save()
        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : adding blog --> ${error}`)
        res.status(400).send()
    }
}
export const modifyBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const { author, title, description, indexImage, authorImage } = req.body;
        const response = await blogCol.findByIdAndUpdate(id, {
            $set: {
                author: author,
                title: title,
                description: description,
                indexImage: indexImage,
                authorImage: authorImage
            }
        })

        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : modifing blog --> ${error}`)
        res.status(400).send()
    }
}
export const removeBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await blogCol.findByIdAndDelete(id);
        response ? res.status(200).send(true) : res.status(200).send(false);
    } catch (error) {
        console.error(`Server error : removing blog --> ${error}`)
        res.status(400).send()
    }
}