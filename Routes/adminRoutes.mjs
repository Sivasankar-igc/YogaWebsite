import express from "express";
import { adminLogin } from "../Controllers/AdminControllers/adminLogin.mjs";
import { addYogaContent, deleteComment, deleteYogaContent, modifyYogaContent } from "../Controllers/AdminControllers/handleContents.mjs";
import { banUserPermanent, banUserTemporary, getAllUser } from "../Controllers/AdminControllers/handleUser.mjs";
import { addPremiumSection, managePremiumSection, removePremiumSection } from "../Controllers/AdminControllers/handlePremium.mjs";
import { modifyAboutPage, modifyContactPage, modifyHomePage } from "../Controllers/AdminControllers/handleWebsiteContents.mjs";
import { uploadHomePage } from "../utils/uploadImage.mjs";

const router = express.Router();

router.post("/adminLogin", adminLogin)


// HANDLE YOGA CONTENTS

router.post("/addContent", addYogaContent)
router.put("/modifyContent/:id", modifyYogaContent)
router.delete("/removeContent/:id", deleteYogaContent)
router.post("/removeComment", deleteComment);


// HANDLE USER INFO

router.get("/getUserInfo", getAllUser);
router.put("/banUserTemporary/:emailId", banUserTemporary);
router.put("/banUserPermanent/:emailId", banUserPermanent);


// HANDLE PREMIUM SECTION

router.post("/addPremium", addPremiumSection);
router.put("/modifyPremium", managePremiumSection);
router.delete("/removePremium/:premiumName", removePremiumSection);


// HANDLE WEBSITE CONTENT

router.put("/modifyHomePage/:id", modifyHomePage);
router.put("/modifyAboutPage/:id", modifyAboutPage);
router.put("/modifyContactPage/:id", modifyContactPage);
router.put("/uploadHomePageImage", uploadHomePage.single("file"), async (req, res) => {
    req.file ? res.status(200).json({ status: true, message: req.file.filename }) : res.status(200).json({ status: false, message: null })
})

export { router }