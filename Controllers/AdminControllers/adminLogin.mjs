import adminCol from "../../Models/adminModel.mjs";

export const adminLogin = async (req, res) => {
    try {
        const { adminId, adminPassword } = req.body;
        const response = await adminCol.findOne({ adminId: adminId, adminPassword: adminPassword });
        response ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(`Server Error : admin login error --> ${error}`)
    }
}