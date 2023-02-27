import { body } from "express-validator";

class CommonInputValidation {
  //user register validator
  public sentOtpPhoneInputValidator() {
    return [
      body("otp_phone", "Please provide user phone number").exists().notEmpty(),
      body("otp_type", "Please provide otp type").exists().notEmpty(),
    ];
  }

  // match otp input validator
  public matchOtpInputValidator() {
    return [
      body("otp_type", "Please enter valid OTP type as login or register").isIn(
        ["login", "register", "phone-verify"]
      ),
      body("user_phone", "Enter phone number").exists().notEmpty(),
      body("otp", "Provide otp").exists(),
    ];
  }
}

export default CommonInputValidation;
