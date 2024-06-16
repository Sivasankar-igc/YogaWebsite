import vidoeCol from "../../Models/videoModel.mjs";

export const addVideo = async (req, res) => {
    try {
        const { heading, image, description, videoLink } = req.body;
        const data = new vidoeCol({
            heading,
            videoLink,
            image,
            description
        })
        const response = await data.save()

        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })

    } catch (error) {
        console.error(`Server error : adding video content --> ${error}`)
    }
}
export const modifyVideo = async (req, res) => {
    try {
        const id = req.params.id;
        const { heading, image, description, videoLink } = req.body;

        const response = await vidoeCol.findByIdAndUpdate(id, {
            $set: {
                heading: heading,
                image: image,
                description, description,
                videoLink: videoLink
            }
        })

        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : modifing video content --> ${error}`)
    }
}

export const removeVideo = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await vidoeCol.findByIdAndDelete(id)
        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : removing video content --> ${error}`)
    }
}