import { User } from "../../../domain/user/entities/user.entity";
import { UserRole } from "../../../shared/enums/user-role.enum";
import { UserStatus } from "../../../shared/enums/user-status.enum";
import { SignupRequestDto } from "../request-dtos/signup-request.dto";

export class SignupMapper {
  static toEntity(signupDto: SignupRequestDto, hashedPassword: string): User {
    return {
      name: signupDto.name,
      email: signupDto.email,
      password: hashedPassword,
      role: signupDto.role,
      status:
        signupDto.role === UserRole.STUDENT
          ? UserStatus.ACTIVE
          : UserStatus.PENDING,
      isVerified: false,
    };
  }
}
