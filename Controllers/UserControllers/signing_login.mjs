import jwt from "jsonwebtoken";
import userCol from "../../Models/userModel.mjs";
import bcryptjs from "bcryptjs";
import { generateDate } from "../../utils/generateDate.mjs";
import { generateEncryptedPassword } from "../../utils/generateEncryptedPassword.mjs";
import { generateReferralCode } from "../../utils/generateRefferalCode.mjs";
import { generateTime } from "../../utils/generateTime.mjs";
import dotenv from "dotenv";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET_KEY;


export const signin = async (req, res) => {
    try {
        const { firstName, lastName, emailId, phno, gender, day, month, year, password } = req.body;

        if (!firstName || !lastName || !emailId || !phno || !gender || !day || !month || !year || !password)
            res.status(200).json({ status: false, message: "All fields must be filled" })
        else {
            const isUserExist = await userCol.findOne({
                $or: [
                    { "userDetails.emailId": emailId },
                    { "userDetails.phno": phno }
                ]
            })

            if (!isUserExist) {
                if (!new RegExp("^[a-zA-Z][a-zA-Z.\\s]+[a-zA-Z]+$").test(firstName.trim()))
                    res.status(200).json({ status: false, message: "Invalid First Name" })
                else if (!new RegExp("^[a-zA-Z][a-zA-Z.\\s]+[a-zA-Z]+$").test(lastName.trim()))
                    res.status(200).json({ status: false, message: "Invalid Last Name" })
                else if (!new RegExp("^[\\w]+([\.-]?[\\w]+)*@[\\w]+([\.-]?[\\w]+)*(\.[\\w]{2,3})+$").test(emailId.trim()))
                    res.status(200).json({ status: false, message: "Invalid Email Id" })
                else if (!new RegExp("^[\+0-9][0-9]{4,11}$").test(phno.trim()))
                    res.status(200).json({ status: false, message: "Invalid Mobile No" })
                else if (gender === "")
                    res.status(200).json({ status: false, message: "Invalid Gender" })
                else {
                    const data = new userCol({
                        userDetails: {
                            firstName: firstName.trim(),
                            lastName: lastName.trim(),
                            emailId: emailId.trim(),
                            phno: phno.trim(),
                            gender: gender,
                            dob: `${day} ${month} ${year}`,
                            password: await generateEncryptedPassword(password),
                            referralCode: generateReferralCode(firstName)
                        },
                        joiningDetails: {
                            date: generateDate(),
                            time: generateTime()
                        }
                    })
                    const response = await data.save();

                    if (response) {
                        const token = jwt.sign({ tokenId: response._id }, JWT_SECRET);

                        res.cookie("benifitsofyogawithmanoj", token, {
                            httpOnly: true,
                            expiresIn: Date.now() + (30 * 24 * 60 * 60 * 1000)
                        })

                        res.status(200).json({ status: true, message: response })
                    }
                    else res.status(200).json({ status: false, message: null })
                }
            } else {
                res.status(200).json({ status: false, message: "User already exists. Try to login." })
            }
        }
    } catch (error) {
        console.error(`Server error : signin error --> ${error}`)
        res.status(400).send(error)
    }
}

export const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password)
            res.status(200).json({ status: false, message: "All fields must be filled" });

        const user = await userCol.findOne({ "userDetails.emailId": emailId })

        if (user) {
            const isPasswordCorrect = bcryptjs.compareSync(password, user.userDetails.password);
            if (isPasswordCorrect) {
                const token = jwt.sign({ tokenId: user._id }, JWT_SECRET)
                res.cookie("benifitsofyogawithmanoj", token, {
                    httpOnly: true,
                    expiresIn: Date.now() + (30 * 24 * 60 * 60 * 1000)
                })

                res.status(200).json({ status: true, message: user })
            } else res.status(200).json({ status: false, message: "Wrong Login Credential" })
        } else {
            res.status(200).json({ status: false, message: "User doesn't exist." })
        }
    } catch (error) {
        console.error(`Server error : login error --> ${error}`)
        // res.status(400).send(error)
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("benifitsofyogawithmanoj");
        res.status(200).send(true)
    } catch (error) {
        console.error(`Server error : logout error --> ${error}`)
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const token = req.cookies.benifitsofyogawithmanoj;
        if (!token) {
            const verifiedToken = jwt.verify(token, JWT_SECRET);
            const user = await userCollections.findOne({ _id: verifiedToken.tokenId });
            user ? res.status(200).send(user) : res.status(200).send(false)
        } else {
            res.status(200).send(false)
        }
    } catch (error) {
        console.error(`Server error : couldn't retrieve user details --> ${error}`)
    }
}