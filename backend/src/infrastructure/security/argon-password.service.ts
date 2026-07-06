import argon2 from "argon2";
import { IPasswordService } from "../../domain/user/services/password-service.interface";

export class ArgonPasswordService implements IPasswordService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verify(password: string, hashedPassword: string): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }
}
