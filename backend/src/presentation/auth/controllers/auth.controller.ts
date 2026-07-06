import { Request, Response } from "express";
import { SignupRequestDto } from "../../../application/auth/request-dtos/signup-request.dto";
import { SignupUseCase } from "../../../application/auth/usecases/signup.usecase";
import { HttpStatus } from "../../../shared/constants/http-status";

export class AuthController {
  constructor(private readonly signupUseCase: SignupUseCase) {}

  async signup(req: Request, res: Response): Promise<void> {
    const signupDto: SignupRequestDto = req.body;

    const response = await this.signupUseCase.execute(signupDto);

    res.status(HttpStatus.CREATED).json(response)
  }
}
