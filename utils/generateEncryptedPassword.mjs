import bcryptjs from "bcryptjs";

export const generateEncryptedPassword = async (password) => {
    const salt = await bcryptjs.genSalt(12);
    const encryptedPassword = await bcryptjs.hash(password, salt);
    return encryptedPassword;
}