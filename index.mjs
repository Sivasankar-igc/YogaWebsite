import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import { handleStreakUpdation } from "./Controllers/OtherControllers/handleStreakUpdation.mjs";
import { router as adminRouter } from "./Routes/adminRoutes.mjs";
import { router as userRouter } from "./Routes/userRoutes.mjs";
import { getAllYogaContents } from "./Controllers/OtherControllers/getAllYogaContents.mjs";
import { getPremiumDetails } from "./Controllers/OtherControllers/getPremiumDetails.mjs";
import { getHomePageContents, getAboutPageContents, getContactPageContents } from "./Controllers/OtherControllers/getWebsiteContents.mjs"
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getVideoContents } from "./Controllers/OtherControllers/getVideoContents.mjs";
import getBlogContents from "./Controllers/OtherControllers/getBlogContents.mjs";

const web = express();
const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


web.use(cors());
web.use(express.urlencoded({ extended: false }));
web.use(express.json());
web.use(cookieParser())
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then((res) => console.log("Yoga Database connected"))
    .catch(err => console.error(`Database error : ${err}`))

setInterval(handleStreakUpdation, 3600000); // ```To handle the streak updation of all user

web.use("/homePageImages", express.static("./HomePageImage"))
web.use("/aboutPageImages", express.static("./AboutPageImage"))
web.use("/yogaInstructorImages", express.static("./YogaInstructorImage"))

web.use("/api/user", userRouter);
web.use("/api/admin", adminRouter);
web.get("/api/", getAllYogaContents);
web.get("/api/getPremiumDetails", getPremiumDetails)
web.get("/api/getHomePageContents", getHomePageContents)
web.get("/api/getAboutPageContents", getAboutPageContents)
web.get("/api/getContactPageContents", getContactPageContents)
web.get("/api/getVideoContents", getVideoContents)
web.get("/api/getBlogContents", getBlogContents)


// web.use(express.static(path.join(__dirname, "./dist")))
// web.get("*", (req, res) => {
//     try {
//         res.sendFile(path.join(__dirname, "./dist/index.html"))
//     } catch (error) {
//         console.error(`Server error : couldn't get clientside files --> ${error}`)
//     }
// })


// const addAdmin = async (req, res) => {
//     try {
//         const pass = "admin@connect"
//         const salt = await bcryptjs.genSalt(10)
//         const hash = await bcryptjs.hash(pass, salt)
//         const data = new adminCol({
//             adminId: "yoga@admin",
//             adminPassword: hash
//         })

//         await data.save()
//     } catch (error) {
//         console.log(error)
//     }
// }

// addAdmin()



web.listen(PORT, () => console.log(`Server listening at port number ${PORT}`))