import multer from "multer";
import path from "path";
import fs from "fs";

const paymentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/PaymentImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const homePageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/HomePageImage')
    },
    filename: (req, file, cb) => {
        cb(null, "homepage_herosection" + Date.now() + path.extname(file.originalname))
    }
})


export const uploadPayment = multer({
    storage: paymentStorage
})

export const uploadHomePage = multer({
    storage: homePageStorage
})