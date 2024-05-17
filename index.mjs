import express from "express";
import cors from "cors";
import { userSchema } from "./database.mjs";

const web = express();
const PORT = process.env.PORT || 8000;
web.use(cors());
web.use(express.urlencoded({ extended: false }));
web.use(express.json());

web.listen(PORT, () => console.log(`Server listening at port number ${PORT}`))