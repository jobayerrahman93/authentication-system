import { body } from "express-validator";

class CommonInputValidation {
  //user register validator
  public sentOtpPhoneInputValidator() {
    return [
      body("otp_phone", "Please provide user phone number").exists().notEmpty(),
      body(
        "otp_type",
        "Please enter valid OTP type as login or register or forget-password or phone-verify"
      ).isIn(["login", "register", "phone-verify", "forget-password"]),
    ];
  }

  // match otp input validator
  public matchOtpInputValidator() {
    return [
      body(
        "otp_type",
        "Please enter valid OTP type as login or register or forget-password or phone-verify"
      ).isIn(["login", "register", "phone-verify", "forget-password"]),
      body("user_phone", "Enter phone number").exists().notEmpty(),
      body("otp", "Provide otp").exists(),
    ];
  }
}

export default CommonInputValidation;
