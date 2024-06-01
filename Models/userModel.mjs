import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userDetails: {
        firstName: String,
        lastName: String,
        emailId: { type: String, required: true, unique: true },
        phno: { type: String, required: true, unique: true },
        gender: String,
        dob: String,
        password: String,
        referralCode: { type: String, unique: false }
    },
    joiningDetails: {
        date: String,
        time: String,
    },
    streakDetails: {
        hasVideoWatched: { type: Boolean, default: false },
        dailyStreak: { type: Number, default: 0 },
        highestStreak: { type: Number, default: 0 }
    },
    feedback: {
        type: String,
        default: ""
    },
    videoList: [], // TO STORE THE VIDEO IDs
    premiumVideoList: [], // TO STORE THE PREMIUM VIDEO IDs
    totalSessionAttained: { type: Number, default: 0 }, // to be developed
    liveClassessBooked: { // to be devleoped
        totalLiveClassessBooked: { type: Number, default: 0 },
        liveClassessList: []
    },
    premiumUser: {
        isPremiumUser: { type: Boolean, default: false },
        premiumType: { type: String, default: "" },
        premiumStartingDate: { type: String },
        premiumEndingDate: { type: String },
        period: { type: Number, default: 0 }
    },
    banUser: {
        isBanned: { type: Boolean, default: false },
        banPeriod: {
            bannedPermanent: { type: Boolean, default: false },
            totalDay: { type: Number, default: 0 }
        }
    },

}, {
    timestamps: true
})

const userCol = new mongoose.model("userCollections", userSchema);

export default userCol;