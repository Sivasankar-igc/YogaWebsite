import userCol from "../../Models/userModel.mjs";

let hour = new Date().getHours();

export const handleStreakUpdation = async () => {
    try {
        if (hour === 0) {
            let response = await userCol.updateMany({ "streakDetails.hasVideoWatched": false }, {
                $set: { "streakDetails.dailyStreak": 0 }
            })

            if (response.acknowledged) {
                await userCol.updateMany({}, { $set: { "streakDetails.hasVideoWatched": false } })
            }
        }
    } catch (error) {
        console.error(`Server error : handling streak updation error --> ${error}`)
    }
}