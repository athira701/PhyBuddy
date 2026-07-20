import { IUserRepository } from "../../../domain/user/repositories/user.repository";
import { User } from "../../../domain/user/entities/user.entity";
import UserModel from "../../database/models/user.model";
import { BaseRepository } from "./base.repository";
import { injectable } from "tsyringe";

@injectable()
export class MongoUserRepository extends BaseRepository<User> implements IUserRepository {

  constructor(){
    super(UserModel)
  }
  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email }).lean<User>();
  }


}