import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import { handleStreakUpdation } from "./Controllers/OtherControllers/handleStreakUpdation.mjs";
import { router as adminRouter } from "./Routes/adminRoutes.mjs";
import { router as userRouter } from "./Routes/userRoutes.mjs";
import { getAllYogaContents } from "./Controllers/OtherControllers/getAllYogaContents.mjs";
import { getPremiumDetails } from "./Controllers/OtherControllers/getPremiumDetails.mjs";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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

web.use("/api/user", userRouter)
web.use("/api/admin", adminRouter)
web.get("/api/", getAllYogaContents);
web.get("/api/getPremiumDetails", getPremiumDetails)

web.use(express.static(path.join(__dirname, "../Frontend/YogaWebsite/dist")))
web.get("*", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../Frontend/YogaWebsite/dist/index.html"))
    } catch (error) {
        console.error(`Server error : couldn't get clientside files --> ${error}`)
    }
})

web.listen(PORT, () => console.log(`Server listening at port number ${PORT}`))