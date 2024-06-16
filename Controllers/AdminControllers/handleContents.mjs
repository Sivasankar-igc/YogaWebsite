import yogaCol from "../../Models/yogaContentModel.mjs";
import generateContentId from "../../utils/generateContentId.mjs";
import { generateDate } from "../../utils/generateDate.mjs";
import { generateTime } from "../../utils/generateTime.mjs";

export const addYogaContent = async (req, res) => {
    try {
        const { contentHeading, contentLink, description, indexImage } = req.body;
        const data = new yogaCol({
            contentId: generateContentId(),
            contentCreation: {
                date: generateDate(),
                time: generateTime()
            },
            contentLink: contentLink,
            contentHeading: contentHeading,
            description: description,
            indexImage: indexImage
        })
        const response = await data.save();
        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : adding yoga content --> ${error}`)
    }
}

export const modifyYogaContent = async (req, res) => {
    try {
        const id = req.params.id;
        const { contentHeading, contentLink, indexImage, description } = req.body;
        
        const response = await yogaCol.findByIdAndUpdate(id, {
            $set: {
                contentHeading: contentHeading,
                contentLink: contentLink,
                description: description,
                indexImage: indexImage
            }
        })
        response ? res.status(200).send(true) : res.status(200).send(true)

    } catch (error) {
        console.error(`Server Error : modifing yoga content --> ${error}`)
    }
}

export const deleteYogaContent = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await yogaCol.findByIdAndDelete(id)
        response ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Server Error : deleting yoga content --> ${error}`)
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { contentId, commentId } = req.body;
        const response = await yogaCol.updateOne({ contentId: contentId },
            {
                $pull: {
                    comments: { commentId: commentId }
                }
            }
        )

        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false);
    } catch (error) {
        console.error(`Server error : handling comment error --> ${error}`)
    }
}