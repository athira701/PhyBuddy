import { Request, Response } from "express";
import { SignupRequestDto } from "../../../application/auth/request-dtos/signup-request.dto";
import { HttpStatus } from "../../../shared/constants/http-status";
import { inject, injectable } from "tsyringe";
import { ISignUpUseCase } from "../../../application/auth/interfaces/signup-usecase.interface";

@injectable()
export class AuthController {
  constructor(@inject("ISignUpUseCase") private readonly _signupUseCase: ISignUpUseCase) {}

  async signup(req: Request, res: Response): Promise<void> {
    const signupDto: SignupRequestDto = req.body;

    const response = await this._signupUseCase.execute(signupDto);

    res.status(HttpStatus.CREATED).json(response)
  }
}
