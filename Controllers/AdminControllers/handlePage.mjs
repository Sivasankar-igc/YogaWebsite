import pageCol from "../../Models/otherPageModel.mjs"

export const getPages = async (req, res) => {
    try {
        const pages = await pageCol.find()

        res.status(200).json({
            status: pages.length > 0,
            message: pages
        })
    } catch (error) {
        console.error(`Server error : Getting pages error --> ${error}`)
    }
}

export const addPage = async (req, res) => {
    try {
        const { pageName, pageTitle, pageImage, pageDescription } = req.body;

        const page = new pageCol({
            pageName,
            pageTitle,
            pageImage,
            pageDescription
        })

        const response = await page.save();

        res.status(200).json({
            status: response !== null && response !== undefined,
            message: response
        })
    } catch (error) {
        console.error(`Server error : adding pages error --> ${error}`)
    }
}

export const modifyPage = async (req, res) => {
    try {
        const _id = req.params.id;

        const { pageName, pageTitle, pageImage, pageDescription } = req.body;

        const response = await pageCol.findByIdAndUpdate(_id, {
            $set: {
                pageName: pageName,
                pageTitle: pageTitle,
                pageImage: pageImage,
                pageDescription: pageDescription
            }
        }, { new: true })

        res.status(200).json({
            status: response !== null && response !== undefined,
            message: response
        })
    } catch (error) {
        console.error(`Server error : modifing pages error --> ${error}`)
    }
}

export const removePage = async (req, res) => {
    try {
        const _id = req.params.id;

        const response = await pageCol.findByIdAndDelete(_id)

        res.status(200).send(response !== null && response !== undefined)
    } catch (error) {
        console.error(`Server error : removing pages error --> ${error}`)
    }
}