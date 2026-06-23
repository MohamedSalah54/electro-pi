import { User } from "../users/user.model";
import { LoginDto, RegisterDto } from "./auth.types";
import { generateToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/hash";

export class AuthService {
  static async register(data: RegisterDto) {
    const exists = await User.findOne({
      email: data.email,
    });

    if (exists) {
      throw {
        statusCode: 400,
        message: "Email already exists",
      };
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  static async login(data: LoginDto) {
    const user = await User.findOne({
      email: data.email,
    });

    if (!user) {
      throw {
        statusCode: 401,
        message: "invalid credential",
      };
    }

    const isMatch = await comparePassword(data.password, user.password);

    if (!isMatch) {
      throw {
        statusCode: 401,
        message: "invalid credential",
      };
    }

    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    return {
      token,
    };
  }
}
