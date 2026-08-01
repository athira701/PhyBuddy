import { injectable } from "tsyringe";
import { IOtpRepository } from "../../../domain/user/repositories/otp.repository";
import { Otp } from "../../../domain/user/entities/otp.entity";
import OtpModel from "../../database/models/otp.model";




@injectable()
export class MongoOtpRepository implements IOtpRepository{
    
    async createOtp(otp: Otp): Promise<void>{
        await OtpModel.create(otp)
    }
    async findValidOtp(userId: string, code: string): Promise<Otp | null>{
        return await OtpModel.findOne({userId,code,isUsed:false}).lean<Otp>()
    }
    async deleteByUserId(userId: string): Promise<void>{
        await OtpModel.deleteMany({userId})
    }

}