import mongoose from "mongoose";

const homePageSchema = mongoose.Schema({
    heroSection: {
        heading: String,
        description: String,
        image: String,
        subHeading: String
    },
    yogaTypeShowCase: {
        heading: String,
        subHeading: String
    },
    yogaStudioShowCase: {
        heading: String,
        description: String,
        image: String,
        address: String,
        mapAddress: String
    },
    popularClassess: {
        heading: String,
        subHeading: String
    },
    yogaInstructorShowCase: {
        heading: String,
        subHeading: String
    },
    pricingShowCase: {
        heading: String,
        subHeading: String
    }
})

const aboutPageSchema = mongoose.Schema({
    headImage: String,
    content: {
        heading: String,
        description: String
    },
    studioShowCase: {
        heading: String,
        subHeading: String,
        studioInsides: [
            {
                name: String,
                image: String
            }
        ]
    }
})

const contactPageSchema = mongoose.Schema({
    heading: String,
    description: String,
    email: String,
    phno: String,
    location: String
})



const homePageCol = new mongoose.model("homePageInfo", homePageSchema)
const aboutPageCol = new mongoose.model("aboutPageInfo", aboutPageSchema)
const contactPageCol = new mongoose.model("contactPageInfo", contactPageSchema)


export { homePageCol, aboutPageCol, contactPageCol };