import { IUserRepository } from "../../../domain/user/repositories/user.repository";
import { User } from "../../../domain/user/entities/user.entity";
import UserModel from "../../database/models/user.model";


export class MongoUserRepository implements IUserRepository {

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async create(user: User): Promise<User> {
    return await UserModel.create(user);
  }

}