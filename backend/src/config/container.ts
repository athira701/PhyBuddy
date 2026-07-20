// import { SignupUseCase } from "../application/auth/usecases/signup.usecase";
// import { MongoUserRepository } from "../infrastructure/persistence/repositories/mongo-user.repository";
// import { ArgonPasswordService } from "../infrastructure/security/argon-password.service";
// import { AuthController } from "../presentation/auth/controllers/auth.controller";

// const userRepository = new MongoUserRepository()

// const passwordService= new ArgonPasswordService()

// const signupUseCase= new SignupUseCase(userRepository,passwordService)

// const authController = new AuthController(signupUseCase)

// export {
//     authController,
// }

import { container } from "tsyringe";

import { MongoUserRepository } from "../infrastructure/persistence/repositories/mongo-user.repository";
import { ArgonPasswordService } from "../infrastructure/security/argon-password.service";
import { SignupUseCase } from "../application/auth/usecases/signup.usecase";

container.registerSingleton("IUserRepository", MongoUserRepository);

container.registerSingleton("IPasswordService", ArgonPasswordService);

container.registerSingleton("ISignUpUseCase", SignupUseCase);

export { container };
