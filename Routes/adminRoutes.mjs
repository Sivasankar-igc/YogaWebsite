import express from "express";
import { adminLogin } from "../Controllers/AdminControllers/adminLogin.mjs";
import { addYogaContent, deleteComment, deleteYogaContent, modifyYogaContent } from "../Controllers/AdminControllers/handleContents.mjs";
import { banUserPermanent, banUserTemporary, getAllUser } from "../Controllers/AdminControllers/handleUser.mjs";
import { addPremiumSection, managePremiumSection, removePremiumSection } from "../Controllers/AdminControllers/handlePremium.mjs";

const router = express.Router();

router.post("/adminLogin", adminLogin)

router.post("/addContent", addYogaContent)
router.put("/modifyContent/:id", modifyYogaContent)
router.delete("/removeContent/:id", deleteYogaContent)
router.post("/removeComment", deleteComment);

router.get("/getUserInfo", getAllUser);
router.put("/banUserTemporary/:emailId", banUserTemporary);
router.put("/banUserPermanent/:emailId", banUserPermanent);

router.post("/addPremium", addPremiumSection);
router.put("/modifyPremium", managePremiumSection);
router.delete("/removePremium/:premiumName", removePremiumSection);

export { router }