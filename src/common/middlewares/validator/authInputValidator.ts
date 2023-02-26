import { body } from "express-validator";

class AuthInputValidation {
  //user register validator
  public userRegisterValidation() {
    return [
      body("name", "Please provide user name").isString().exists(),
      body("phone", "Please provide valid phone number!")
        .isLength({
          min: 11,
          max: 14,
        })
        .isString()
        .exists(),
      body("email", "Please provide a email").isString(),
      body(
        "password",
        "Please provide a password and password length will be atleast 12 "
      ).isLength({ min: 12 }),
    ];
  }
}

export default AuthInputValidation;
