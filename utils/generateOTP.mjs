import otpGenerator from "otp-generator";

export default () => {
    const OTP_LENGTH = 6;
    const OTP_CONFIG = {
        digits: true,      // Include digits
        alphabets: false,  // Do not include alphabets
        upperCase: false,  // Do not include uppercase letters
        specialChars: false // Do not include special characters
    };

    // Generate the OTP
    const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
    return OTP;
}

// export default generateOTP;