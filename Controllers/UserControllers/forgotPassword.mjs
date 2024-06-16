import userCol from "../../Models/userModel.mjs";
import { generateEncryptedPassword } from "../../utils/generateEncryptedPassword.mjs";
import { sendOTP_to_mail } from "../../utils/generateMail.mjs";
import generateOTP from "../../utils/generateOTP.mjs";

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await userCol.updateOne({ "userDetails.emailId": email }, { $set: { "userDetails.password": await generateEncryptedPassword(password) } });

        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false);
    } catch (error) {
        console.error(`Server Error : couldn't reset password --> ${error}`)
    }
}

export const sendOTP = async (req, res) => {
    try {
        const mailId = req.query.mailId;
        const OTP = generateOTP();

        if (OTP.length > 0) {
            sendOTP_to_mail(mailId, OTP);
            OTP !== "" ? res.status(200).send(OTP) : res.status(200).send("")
        }
    } catch (error) {
        console.error(`Server Error : OTP sending error --> ${error}`)
    }
}