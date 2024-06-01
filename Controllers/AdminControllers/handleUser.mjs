import premiumCol from "../../Models/premiumModel.mjs";
import userCol from "../../Models/userModel.mjs";

export const getAllUser = async (req, res) => {
    try {
        const data = await userCol.find();
        data.length > 0 ? res.status(200).send(data) : res.status(200).send([])
    } catch (error) {
        console.error(`Server Error : admin error --> ${error}`)
    }
}

export const banUserTemporary = async (req, res) => {
    try {
        const emailId = req.params.emailId;
        const { banPeriod } = req.body;
        const response = await userCol.updateOne({ "userDetails.emailId": emailId },
            {
                $set: { "banUser.isBanned": true, "banUser.banPeriod.totalDay": banPeriod }
            }
        )

        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Server Error : ban user error --> ${error}`)
    }
}

export const banUserPermanent = async (req, res) => {
    try {
        const emailId = req.params.emailId;
        const response = await userCol.updateOne({ "userDetails.emailId": emailId },
            {
                $set: { "banUser.banPeriod.bannedPermanent": true }
            }
        )

        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(true)
    } catch (error) {
        console.error(`Server Error : permanent ban user error --> ${error}`)
    }
}