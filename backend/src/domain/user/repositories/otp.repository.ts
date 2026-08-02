import { Otp } from "../entities/otp.entity";


export interface IOtpRepository {

    createOtp(otp: Otp): Promise<void>;
    findValidOtp(userId: string, code: string): Promise<Otp | null>;
    deleteByUserId(userId: string): Promise<void>;
    markAsUsed(id: string): Promise<void>;
}