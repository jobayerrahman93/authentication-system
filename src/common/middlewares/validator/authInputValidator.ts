import { body } from "express-validator";

class AuthInputValidation {
  //user register validator
  public userRegisterValidator() {
    return [
      body("user_name", "Please provide user name").isString().exists(),
      body("user_phone", "Please provide valid phone number!")
        .isLength({
          min: 11,
          max: 14,
        })
        .isString()
        .exists(),
      body("user_email", "Please provide a email").isString(),
      body(
        "user_password",
        "Please provide a password and password length will be atleast 12 "
      ).isLength({ min: 12 }),
    ];
  }
  //user login validator
  public userLoginValidator() {
    return [
      body("user_phone", "Please provide valid phone number!")
        .isLength({
          min: 11,
          max: 14,
        })
        .isString()
        .exists(),

      body(
        "user_password",
        "Please provide a password and password length will be atleast 12 "
      ).isLength({ min: 12 }),
    ];
  }
}

export default AuthInputValidation;
