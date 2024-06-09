import adminCol from "../../Models/adminModel.mjs";
import bcryptjs from "bcryptjs"

export const adminLogin = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const admin = await adminCol.findOne({ adminId: emailId });

        if (admin) {
            const isPasswordCorrect = bcryptjs.compareSync(password, admin.adminPassword)

            if (isPasswordCorrect) {
                res.status(200).json({ status: true, message: "success" })
            } else {
                res.status(200).send({ status: false, message: "Wrong Credentials" })
            }
        } else res.status(200).send({ status: false, message: "Wrong Credentials" })

    } catch (error) {
        console.error(`Server Error : admin login error --> ${error}`)
    }
}