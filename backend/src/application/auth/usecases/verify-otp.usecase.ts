import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../domain/user/repositories/user.repository";
import { IOtpRepository } from "../../../domain/user/repositories/otp.repository";
import { IVerifyOtpUseCase } from "../interfaces/verify-otp-usecase.interface";
import { VerifyOtpRequestDto } from "../request-dtos/verify-otp-request.dto";
import { VerifyOtpResponseDto } from "../response-dtos/verify-otp-response.dto";
import { AppError } from "../../../shared/errors/app-error";
import { ErrorMessages } from "../../../shared/constants/error-messages";
import { HttpStatus } from "../../../shared/constants/http-status";
import { Messages } from "../../../shared/constants/messages";

@injectable()
export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("IOtpRepository")
    private readonly _otpRepository: IOtpRepository,
  ) {}

  async execute(
    verifyOtpDto: VerifyOtpRequestDto,
  ): Promise<VerifyOtpResponseDto> {
    const user = await this._userRepository.findByEmail(verifyOtpDto.email);
    if (!user) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if(user.isVerified){
        throw new AppError(ErrorMessages.EMAIL_ALREADY_VERIFIED, HttpStatus.BAD_REQUEST)
    }

    const otp = await this._otpRepository.findValidOtp(
      user._id!,
      verifyOtpDto.otp,
    );
    if (!otp) {
      throw new AppError(ErrorMessages.INVALID_OTP, HttpStatus.BAD_REQUEST);
    }

    if (otp.expiresAt < new Date()) {
      throw new AppError(ErrorMessages.OTP_EXPIRED, HttpStatus.BAD_REQUEST);
    }

    await this._otpRepository.markAsUsed(otp._id!);
    await this._userRepository.update(
      {
        isVerified: true,
      },
      user._id!,
    );

    return { success: true, message: Messages.OTP_VERIFIED_SUCCESS };
  }
}
