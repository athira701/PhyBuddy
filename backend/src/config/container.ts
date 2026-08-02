import { container } from "tsyringe";

import { MongoUserRepository } from "../infrastructure/persistence/repositories/mongo-user.repository";
import { ArgonPasswordService } from "../infrastructure/security/argon-password.service";
import { SignupUseCase } from "../application/auth/usecases/signup.usecase";
import { OtpService } from "../infrastructure/security/otp.service";
import { MongoOtpRepository } from "../infrastructure/persistence/repositories/mongo-otp.repository";
import { NodeMailerEmailService } from "../infrastructure/mail/nodemailer-email.service";
import { VerifyOtpUseCase } from "../application/auth/usecases/verify-otp.usecase";
import { ResendOtpUseCase } from "../application/auth/usecases/resend-otp.usecase";

container.registerSingleton("IUserRepository", MongoUserRepository);

container.registerSingleton("IPasswordService", ArgonPasswordService);
container.registerSingleton("IOtpService",OtpService)

container.registerSingleton("IOtpRepository",MongoOtpRepository)
container.registerSingleton("IEmailService",NodeMailerEmailService)

container.registerSingleton("ISignUpUseCase", SignupUseCase);
container.registerSingleton("IVerifyOtpUseCase",VerifyOtpUseCase)
container.registerSingleton("IResendOtpUseCase",ResendOtpUseCase)

export { container };
