import { inject, injectable } from "tsyringe";
import { User } from "../../../domain/user/entities/user.entity";
import { IUserRepository } from "../../../domain/user/repositories/user.repository";
import { IPasswordService } from "../../../domain/user/services/password-service.interface";
import { ErrorMessages } from "../../../shared/constants/error-messages";
import { HttpStatus } from "../../../shared/constants/http-status";
import { Messages } from "../../../shared/constants/messages";
import { UserRole } from "../../../shared/enums/user-role.enum";
import { UserStatus } from "../../../shared/enums/user-status.enum";
import { AppError } from "../../../shared/errors/app-error";
import { SignupRequestDto } from "../request-dtos/signup-request.dto";
import { SignupResponseDto } from "../response-dtos/signup-response.dto";
import { ISignUpUseCase } from "../interfaces/signup-usecase.interface";
import { SignupMapper } from "../mappers/signup.mapper";
import { IOtpRepository } from "../../../domain/user/repositories/otp.repository";
import { IOtpService } from "../../../domain/user/services/otp-service.interface";
import { IEmailService } from "../../../domain/user/services/email-service.interface";

@injectable()
export class SignupUseCase implements ISignUpUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("IPasswordService")
    private readonly _passwordService: IPasswordService,
    @inject("IOtpRepository")
    private readonly _otpRepository: IOtpRepository,
    @inject("IOtpService")
    private readonly _otpService: IOtpService,
    @inject("IEmailService")
    private readonly _emailService: IEmailService,
  ) {}

  async execute(signupDto: SignupRequestDto): Promise<SignupResponseDto> {
    const existingUser = await this._userRepository.findByEmail(
      signupDto.email,
    );

    if (existingUser) {
      throw new AppError(
        ErrorMessages.EMAIL_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await this._passwordService.hash(signupDto.password);

    const newUser = SignupMapper.toEntity(signupDto, hashedPassword);

    const createdUser = await this._userRepository.create(newUser);

    const otp = this._otpService.generateOtp();

    const expiry = this._otpService.generateExpiryTime();

    await this._otpRepository.deleteByUserId(createdUser._id!);

    await this._otpRepository.createOtp({
      userId: createdUser._id!,
      code: otp,
      expiresAt: expiry,
      isUsed: false,
    });

    await this._emailService.sendOtpEmail(createdUser.email, otp);

    return {
      success: true,
      message: Messages.REGISTRATION_SUCCESS,
    };
  }
}
