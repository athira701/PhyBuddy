import { injectable } from "tsyringe";
import { IOtpService } from "../../domain/user/services/otp-service.interface";
import { OTP_EXPIRY_SECONDS } from "../../shared/constants/auth.constants";


@injectable()
export class OtpService implements IOtpService{
    generateOtp(): string {
        return Math.floor(1000+Math.random()*9000).toString()
    }
    generateExpiryTime(): Date {
        return new Date(Date.now()+OTP_EXPIRY_SECONDS*1000)
    }
}