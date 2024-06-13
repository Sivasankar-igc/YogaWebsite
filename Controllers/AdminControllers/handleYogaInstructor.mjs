import yogaInstructorCol from "../../Models/yogaInstructorModel.mjs";

export const addYogaInstructor = async (req, res) => {
    try {
        const { name, image, description, socialMediaLinks } = req.body;
        const data = new yogaInstructorCol({
            name: name,
            image: image,
            description: description,
            socialMediaLinks: socialMediaLinks
        })

        const response = await data.save();

        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : adding yoga instructor --> ${error}`)
    }
}

export const modifyYogaInstructor = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, image, description, socialMediaLinks } = req.body;
        const response = await yogaInstructorCol.findByIdAndUpdate(id, {
            name: name,
            image: image,
            description: description,
            socialMediaLinks: socialMediaLinks
        })

        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : modifing yoga instructor --> ${error}`)
    }
}
export const removeYogaInstructor = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await yogaInstructorCol.findByIdAndDelete(id)

        response ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Server error : removing yoga instructor --> ${error}`)
    }
}
export const getYogaInstructor = async (req, res) => {
    try {
        const response = await yogaInstructorCol.find();

        response.length > 0 ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: [] })
    } catch (error) {
        console.error(`Server error : modifing yoga instructor --> ${error}`)
    }
}