import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model";
import { LoginDto, RegisterDto } from "./auth.types";
import { env } from "../../configs/env";

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

    const hashedPassword = await bcrypt.hash(data.password, 10);

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

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw {
        statusCode: 401,
        message: "invalid credential",
      };
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    return {
      token,
    };
  }
}
