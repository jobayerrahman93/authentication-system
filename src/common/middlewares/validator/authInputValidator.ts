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
  //user login validator
  public verifyPhoneValidator() {
    return [
      body("user_phone", "Please provide valid phone number!")
        .isLength({
          min: 11,
          max: 14,
        })
        .isString()
        .exists(),

      body("otp_type", "Please provide otp type").exists(),
      body("token", "Please provide token").exists(),
    ];
  }

  // change password after login validator
  public changePasswordValidator() {
    return [
      body("user_id", "Please provide user id").exists(),
      body(
        "old_password",
        "Please provide a password and password length will be atleast 12 "
      ).isLength({ min: 12 }),
      body(
        "new_password",
        "Please provide a new password and password length will be atleast 12 "
      ).isLength({ min: 12 }),
    ];
  }
  // change password after login validator

  public forgetPasswordValidator() {
    return [
      body("token", "Please provide token").exists(),

      body(
        "new_password",
        "Please provide a new password and password length will be atleast 12 "
      ).isLength({ min: 12 }),
    ];
  }
}

export default AuthInputValidation;
