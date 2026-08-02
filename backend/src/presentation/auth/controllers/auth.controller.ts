import { NextFunction, Request, Response } from "express";
import { SignupRequestDto } from "../../../application/auth/request-dtos/signup-request.dto";
import { HttpStatus } from "../../../shared/constants/http-status";
import { inject, injectable } from "tsyringe";
import { ISignUpUseCase } from "../../../application/auth/interfaces/signup-usecase.interface";
import { IVerifyOtpUseCase } from "../../../application/auth/interfaces/verify-otp-usecase.interface";
import { IResendOtpUseCase } from "../../../application/auth/interfaces/resend-otp-usescase.interface";

@injectable()
export class AuthController {
  constructor(
    @inject("ISignUpUseCase") private readonly _signupUseCase: ISignUpUseCase,
    @inject("IVerifyOtpUseCase")
    private readonly _verifyOtpUseCase: IVerifyOtpUseCase,
    @inject("IResendOtpUseCase")
    private readonly _resendOtpUseCase: IResendOtpUseCase,
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const signupDto: SignupRequestDto = req.body;

      const response = await this._signupUseCase.execute(signupDto);

      res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const response = await this._verifyOtpUseCase.execute(req.body);
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async resendOtp(req:Request,res:Response,next: NextFunction):Promise<void>{
    try {
      const response = await this._resendOtpUseCase.execute(req.body)
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}
