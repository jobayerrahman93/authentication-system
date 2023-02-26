import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { allStrings } from "../../../app/miscellaneous/constants";

class Lib {
  public static maxAge = 30 * 24 * 60 * 60;

  /**
   * make hashed password
   */
  public static async hashPass(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * verify password
   */
  public static async compare(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * create token
   */
  public static createToken(
    creds: object,
    secret: string,
    maxAge: number | string
  ) {
    return jwt.sign(creds, secret, { expiresIn: maxAge });
  }

  // verify token
  public static verifyToken(token: string, secret: string) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  /**
   * generate random Number
   */
  public static otpGenNumber(length: number) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let otp = "";

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 10);

      otp += numbers[randomNumber];
    }

    return otp;
  }

  /**
   * generate random Number and alphabet
   */
  public static otpGenNumberAndAlphabet(length: number) {
    let otp = "";

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 10);

      otp += allStrings[randomNumber];
    }

    return otp;
  }
}

export default Lib;
