import contactCol from "../../Models/contactUs.mjs";
import premiumCol from "../../Models/premiumModel.mjs";
import userCol from "../../Models/userModel.mjs";
import yogaCol from "../../Models/yogaContentModel.mjs";
import generateCommentId from "../../utils/generateCommentId.mjs";
import { generateDate } from "../../utils/generateDate.mjs";
import { sendMail } from "../../utils/generateMail.mjs";
import { generateTime } from "../../utils/generateTime.mjs";

export const trackTotalVideoWatched = async (req, res) => {
    try {
        const emailId = req.params.mail;
        const { contentId } = req.body;

        await yogaCol.updateOne({ contentId: contentId }, { $inc: { "rating.views": 1 } })
        const response = await userCol.updateOne({ "userDetails.emailId": emailId }, {
            $push: { videoList: contentId }
        })

        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false)

    } catch (error) {
        console.error(`Server error : video watched tracking error --> ${error}`)
        res.status(404).send(false)
    }
}

export const trackHasVideoWatched = async (req, res) => {
    try {
        // on clientside if user.streakDetails.dailyStreak + 1 > streakDetails.highestStreak ? user.streakDetails.dailyStreak + 1 : user.streakDetails.highestStreak
        const emailId = req.params.mail;
        const { highestStreak, contentId } = req.body;

        await yogaCol.updateOne({ contentId: contentId }, { $inc: { "rating.views": 1 } })
        const response = await userCol.updateOne({ "userDetails.emailId": emailId }, {
            $set: { "streakDetails.hasVideoWatched": true, "streakDetails.highestStreak": highestStreak },
            $inc: { "streakDetails.dailyStreak": 1 },
            $push: { videoList: contentId }
        })

        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Server error : tracking error --> ${error}`)
        res.status(404).send(false)
    }
}

export const addPremium = async (req, res) => {
    try {
        const { emailId, premiumName, premiumType, startingDate, endingDate, period } = req.body;
        const response = await userCol.updateOne({ "userDetails.emailId": emailId }, {
            $set: {
                premiumUser: {
                    isPremiumUser: true,
                    premiumType: premiumType,
                    premiumStartingDate: startingDate,
                    premiumEndingDate: endingDate,
                    period: period
                }
            }
        })
        if (response.modifiedCount > 0) {
            await premiumCol.updateOne({ premiumName: premiumName }, { $inc: { totalUser: 1 } })
            res.status(200).send(true)
        } else res.status(200).send(false)
    } catch (error) {
        console.error(`Server error : adding premium error --> ${error}`)
        res.status(404).send(false)
    }
}

export const buyVideo = async (req, res) => {
    try {
        const { emailId, contentId } = req.body;
        const response = await userCol.updateOne({ "userDetails.emailId": emailId }, {
            $push: { premiumVideoList: contentId }
        })

        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Server error : buying video error --> ${error}`)
        res.status(404).send(false)
    }
}

export const likeVideo = async (req, res) => {
    try {
        const contentId = req.params.contentId;
        const response = await yogaCol.updateOne({ contentId: contentId }, { $inc: { "rating.likes": 1 } })
        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Server error : like video error --> ${error}`)
        res.status(404).send(false)
    }
}

export const disLikeVideo = async (req, res) => {
    try {
        const contentId = req.params.contentId;
        const response = await yogaCol.updateOne({ contentId: contentId }, { $inc: { "rating.dislikes": 1 } })
        response.modifiedCount > 0 ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Server error : dislike video error --> ${error}`)
        res.status(404).send(false)
    }
}

export const addComment = async (req, res) => {
    try {
        const { contentId, username, comment } = req.body;
        const tempObj = {
            commentId: generateCommentId(),
            username: username,
            comment: comment,
            time: generateTime(),
            date: generateDate()
        }
        const response = await yogaCol.updateOne({ contentId: contentId }, {
            $push: { comments: tempObj }
        })

        response.modifiedCount > 0 ? res.status(200).json({ status: true, message: tempObj }) : res.status(200).json({ status: false, message: null })
    } catch (error) {
        console.error(`Server error : comment video error --> ${error}`)
        res.status(404).send(false)
    }
}

export const payment = async (req, res) => {
    try {
        sendMail(req.params.mailId, req.file)
    } catch (error) {
        console.error(`Payment Error : ${error}`)
    }
}

export const contactUs = async (req, res) => {
    try {
        const { firstName, email, phno, message } = req.body;
        const data = new contactCol({
            firstName, email, phno, message
        })

        const response = await data.save()
        !response ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Contact Us error --> ${error}`)
    }
}