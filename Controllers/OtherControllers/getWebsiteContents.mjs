import { aboutPageCol, contactPageCol, homePageCol } from "../../Models/websiteContent.mjs"

export const getHomePageContents = async (req, res) => {
    try {
        const response = await homePageCol.findOne();
        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : couldn't retrieve homepage contents --> ${error}`)
    }
}
export const getAboutPageContents = async (req, res) => {
    try {
        const response = await aboutPageCol.findOne();
        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : couldn't retrieve aboutpage contents --> ${error}`)
    }
}
export const getContactPageContents = async (req, res) => {
    try {
        const response = await contactPageCol.findOne();
        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : couldn't retrieve contactpage contents --> ${error}`)
    }
}