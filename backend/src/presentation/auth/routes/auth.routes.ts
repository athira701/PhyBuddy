import { Router } from "express";
import { container } from "tsyringe";
import { validateRequest } from "../middlewares/validate-request";
import {
  resendOtpValidator,
  signupValidator,
  verifyOtpValidator,
} from "../validators/auth.validator";
import { AuthController } from "../controllers/auth.controller";

const authRouter = Router();
const authController = container.resolve(AuthController);

authRouter.post(
  "/signup",
  validateRequest(signupValidator),
  authController.signup.bind(authController),
);

authRouter.post(
  "/verify-otp",
  validateRequest(verifyOtpValidator),
  authController.verifyOtp.bind(authController),
);

authRouter.post(
  "/resend-otp",
  validateRequest(resendOtpValidator),
  authController.resendOtp.bind(authController),
);
export default authRouter;
