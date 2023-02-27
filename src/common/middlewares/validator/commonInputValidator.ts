import { body } from "express-validator";

class CommonInputValidation {
  //user register validator
  public sentOtpPhoneInputValidator() {
    return [
      body("otp_phone", "Please provide user phone number").exists().notEmpty(),
      body("otp_type", "Please provide otp type").exists().notEmpty(),
    ];
  }
}

export default CommonInputValidation;
