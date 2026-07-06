import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { signupValidator } from "../validators/auth.validator";
import { authController } from "../../../config/auth.container";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateRequest(signupValidator),
  authController.signup.bind(authController),
);

export default authRouter;
