import userCol from "../../Models/userModel.mjs";
import { generateEncryptedPassword } from "../../utils/generateEncryptedPassword.mjs";

export const updateDetails = async (req, res) => {
    try {
        const emailId = req.params.mail;
        const { firstName, lastName } = req.body;
        const response = await userCol.updateOne({ "userDetails.emailId": emailId },
            {
                $set: {
                    "userDetails.firstName": firstName,
                    "userDetails.lastName": lastName,
                }
            }
        )
        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Server error : update error --> ${error}`)
        res.status(404).send(false);
    }
}

export const updatePassword = async (req, res) => {
    try {
        const emailId = req.params.mail;
        const { password } = req.body;
        const response = await userCol.updateOne({ "userDetails.emailId": emailId },
            {
                $set: {
                    "userDetails.password": await generateEncryptedPassword(password)
                }
            })
        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Server error : password updation error --> ${error}`)
        res.status(404).send(false);
    }
}

export const updateFeedback = async (req, res) => {
    try {
        const emailId = req.params.mail;
        const { feedback } = req.body;
        const response = await userCol.updateOne({ "userDetails.emailId": emailId },
            {
                $set: { feedback: feedback }
            }
        )
        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Server error: feedback updation error --> ${error}`)
        res.status(404).send(false);
    }
}