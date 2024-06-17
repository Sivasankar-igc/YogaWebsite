import express from "express";
import { getUserDetails, login, logout, signin } from "../Controllers/UserControllers/signing_login.mjs";
import { updateDetails, updateFeedback, updatePassword } from "../Controllers/UserControllers/updateUserInfo.mjs";
import { addComment, addPremium, buyVideo, contactUs, disLikeVideo, likeVideo, payment, trackHasVideoWatched, trackTotalVideoWatched } from "../Controllers/UserControllers/trackUserActivity.mjs";
import { uploadPayment } from "../utils/uploadImage.mjs";
import { resetPassword, sendOTP } from "../Controllers/UserControllers/forgotPassword.mjs";

const router = express.Router();

router.get("/", getUserDetails); // middleware will be implemented
router.post("/signin", signin);
router.post("/userLogin", login);
router.put("/logout", logout);
router.get("/sendOTP", sendOTP);
router.post("/resetPassword", resetPassword);

router.put("/updateDetails/:mail", updateDetails);
router.put("/updatePassword/:mail", updatePassword);
router.put("/updateFeedback/:mail", updateFeedback);

router.route("/trackVideoWatching/:mail")
    .post(trackHasVideoWatched)
    .put(trackTotalVideoWatched)

router.post("/buyVideo", buyVideo);
router.post("/addPremium", addPremium);
router.put("/like/:contentId", likeVideo)
router.put("/dislike/:contentId", disLikeVideo)
router.post("/addComment", addComment)

router.post("/payment/:mailId", payment)
router.post("/contactUs", contactUs)
export { router }