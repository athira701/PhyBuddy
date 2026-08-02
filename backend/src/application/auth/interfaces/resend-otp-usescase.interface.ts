import { ResendOtpRequestDto } from "../request-dtos/resend-otp-request.dto";
import { ResendOtpResponseDto } from "../response-dtos/resend-otp-response.dto";

export interface IResendOtpUseCase {
  execute(resendOtpDto: ResendOtpRequestDto): Promise<ResendOtpResponseDto>;
}
