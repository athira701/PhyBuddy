import { IBaseRepository } from "../../repositories/base.repository"
import { User } from "../entities/user.entity"

export interface IUserRepository extends IBaseRepository<User>{

    findByEmail(email:string): Promise <User| null>
    
}