import { body } from "express-validator";

class CommonInputValidation {
  //user register validator
  public sentOtpPhoneInputValidator() {
    return [
      body("user_phone", "Please provide user phone number")
        .exists()
        .notEmpty(),
    ];
  }
}

export default CommonInputValidation;
