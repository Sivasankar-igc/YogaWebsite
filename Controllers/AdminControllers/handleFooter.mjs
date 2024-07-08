import footerCol from "../../Models/footerModle.mjs"

export const getFooter = async (req, res) => {
    try {
        const data = await footerCol.find()

        res.status(200).json({
            status: data.length > 0,
            message: data
        })
    } catch (error) {
        console.error(`Server error : getting footer --> ${error}`)
    }
}

export const addFooter = async (req, res) => {
    try {
        const { name, url } = req.body;

        const response = await footerCol.findOneAndUpdate({ footerLabel: "Explore" }, {
            $push: {
                footerLinks: {
                    name,
                    url
                }
            }
        }, { new: true })

        res.status(200).json({
            status: response !== null && response !== undefined,
            message: response
        })
    } catch (error) {
        console.error(`Server error : adding footer --> ${error}`)
    }
}

export const modifyFooter = async (req, res) => {
    try {
        const id = req.params.id;
        const { footerLabel, name, url } = req.body;

        const response = await footerCol.findOneAndUpdate({ footerLabel: footerLabel, "footerLinks._id": id }, {
            $set: {
                "footerLinks.$.name": name,
                "footerLinks.$.url": url
            }
        }, { new: true })

        res.status(200).json({
            status: response !== null && response !== undefined,
            message: response
        })
    } catch (error) {
        console.error(`Server error : modifing footer --> ${error}`)
    }
}

export const removeFooter = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await footerCol.findOneAndUpdate({ footerLabel: "Explore", "footerLinks._id": id }, {
            $pull: {
                footerLinks: { _id: id }
            }
        }, { new: true })

        res.status(200).send(response !== null && response !== undefined)
    } catch (error) {
        console.error(`Server error : removing footer --> ${error}`)
    }
}