import { comparePassword, hashPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";
import { AuthService } from "../auth/auth.service";
import { User } from "../users/user.model";

jest.mock("../users/user.model");
jest.mock("../../utils/hash");
jest.mock("../../utils/jwt");

describe("AuthService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should throw error if email already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ email: "test@test.com" });

      await expect(
        AuthService.register({
          name: "Test",
          email: "test@test.com",
          password: "123456",
        } as any),
      ).rejects.toEqual({
        statusCode: 400,
        message: "Email already exists",
      });
    });

    it("should create user successfully", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (hashPassword as jest.Mock).mockResolvedValue("hashed");
      (User.create as jest.Mock).mockResolvedValue({
        _id: "1",
        email: "test@test.com",
      });

      const result = await AuthService.register({
        name: "Test",
        email: "test@test.com",
        password: "123456",
      } as any);

      expect(User.create).toHaveBeenCalled();
      expect(result.email).toBe("test@test.com");
    });
  });

  describe("login", () => {
    it("should throw if user not found", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        AuthService.login({
          email: "test@test.com",
          password: "123456",
        } as any),
      ).rejects.toEqual({
        statusCode: 401,
        message: "invalid credential",
      });
    });

    it("should return token if login success", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: "1",
        role: "USER",
        password: "hashed",
      });

      (comparePassword as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue("token123");

      const result = await AuthService.login({
        email: "test@test.com",
        password: "123456",
      } as any);

      expect(result).toEqual({ token: "token123" });
    });
  });
});
