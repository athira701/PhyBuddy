import { inject, injectable } from "tsyringe";
import { IResendOtpUseCase } from "../interfaces/resend-otp-usescase.interface";
import { IOtpRepository } from "../../../domain/user/repositories/otp.repository";
import { IEmailService } from "../../../domain/user/services/email-service.interface";
import { ResendOtpRequestDto } from "../request-dtos/resend-otp-request.dto";
import { ResendOtpResponseDto } from "../response-dtos/resend-otp-response.dto";
import { IUserRepository } from "../../../domain/user/repositories/user.repository";
import { IOtpService } from "../../../domain/user/services/otp-service.interface";
import { AppError } from "../../../shared/errors/app-error";
import { ErrorMessages } from "../../../shared/constants/error-messages";
import { HttpStatus } from "../../../shared/constants/http-status";
import { Messages } from "../../../shared/constants/messages";

@injectable()
export class ResendOtpUseCase implements IResendOtpUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("IOtpRepository") private readonly _otpRepository: IOtpRepository,
    @inject("IOtpService") private readonly _otpService: IOtpService,
    @inject("IEmailService") private readonly _emailService: IEmailService,
  ) {}

  async execute(
    resendOtpDto: ResendOtpRequestDto,
  ): Promise<ResendOtpResponseDto> {
    const user = await this._userRepository.findByEmail(resendOtpDto.email);
    if (!user) {
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND, 
        HttpStatus.NOT_FOUND
      );
    }
    if (user.isVerified) {
      throw new AppError(
        ErrorMessages.EMAIL_ALREADY_VERIFIED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this._otpRepository.deleteByUserId(user._id!);

    const otp = this._otpService.generateOtp();
    const expiry = this._otpService.generateExpiryTime();

    await this._otpRepository.createOtp({
      userId: user._id!,
      code: otp,
      expiresAt: expiry,
      isUsed: false,
    });

    await this._emailService.sendOtpEmail(user.email, otp);

    return {
      success: true,
      message: Messages.OTP_RESENT_SUCCESS,
    };
  }
}
