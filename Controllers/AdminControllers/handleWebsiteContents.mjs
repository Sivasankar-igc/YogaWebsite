import { homePageCol, aboutPageCol, contactPageCol } from "../../Models/websiteContent.mjs";
import fs from "fs";

export const modifyHomePage = async (req, res) => {
    try {
        const { _id, heroSection, yogaTypeShowCase, yogaStudioShowCase, yogaInstructorShowCase, pricingShowCase } = req.body.contentData;
        // const images = [heroSection.image, yogaStudioShowCase.image]

        const response = await homePageCol.findByIdAndUpdate(_id, {
            heroSection: heroSection,
            yogaTypeShowCase: yogaTypeShowCase,
            yogaStudioShowCase: yogaStudioShowCase,
            yogaInstructorShowCase: yogaInstructorShowCase,
            pricingShowCase: pricingShowCase
        })

        // fs.readdir("../server/HomePageImage", (error, files) => {
        //     // fs.readdir("../HomePageImage", (error, files) => {
        //     for (const file of files) {
        //         if (!images.includes(file)) {
        //             fs.unlink(`../server/HomePageImage/${file}`, (err) => {
        //                 if (err) console.error(`Error --> ${err}`)
        //             })
        //         }
        //     }
        // })
        
        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : homepage modification error --> ${error}`)
        res.status(400).send(false)
    }
}
export const modifyAboutPage = async (req, res) => {
    try {
        const id = req.params.id;
        const { _id, heading, subHeading, description, image } = req.body.contentData;
        const response = await aboutPageCol.findByIdAndUpdate(id, {
            heading: heading,
            subHeading: subHeading,
            description: description,
            image: image
        })

        // fs.readdir("../server/AboutPageImage", (error, files) => {
        //     // fs.readdir("../server/AboutPageImage", (error, files) => {
        //     for (const file of files) {
        //         if (file !== image) {
        //             fs.unlink(`../server/AboutPageImage/${file}`, (err) => {
        //                 if (err) console.error(`Error --> ${err}`)
        //             })
        //         }
        //     }
        // })

        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : aboutpage modification error --> ${error}`)
    }
}

export const modifyContactPage = async (req, res) => {
    try {
        const id = req.params.id;
        const { _id, heading, description, email, phno, location } = req.body.contentData;
        const response = await contactPageCol.findByIdAndUpdate(id, {
            heading: heading,
            description: description,
            email: email,
            phno: phno,
            location: location
        })

        response ? res.status(200).json({ status: true, message: response }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : contactpage modification error --> ${error}`)
    }
}