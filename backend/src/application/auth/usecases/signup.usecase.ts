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

@injectable()
export class SignupUseCase implements ISignUpUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly _userRepository: IUserRepository,
    @inject("IPasswordService")
    private readonly _passwordService: IPasswordService,
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
    await this._userRepository.create(newUser);

    return {
      success: true,
      message: Messages.REGISTRATION_SUCCESS,
    };
  }
}
