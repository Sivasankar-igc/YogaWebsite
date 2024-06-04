import adminCol from "../../Models/adminModel.mjs";

export const adminLogin = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const response = await adminCol.findOne({ adminId: emailId, adminPassword: password });
        response ? res.status(200).json({status:true, message:"success"}) : res.status(200).send({status:false, message:"failed"})
    } catch (error) {
        console.error(`Server Error : admin login error --> ${error}`)
    }
}