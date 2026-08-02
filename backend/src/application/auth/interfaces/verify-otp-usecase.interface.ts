import { VerifyOtpRequestDto } from "../request-dtos/verify-otp-request.dto";
import { VerifyOtpResponseDto } from "../response-dtos/verify-otp-response.dto";

export interface IVerifyOtpUseCase {
  execute(
    verifyOtpDto: VerifyOtpRequestDto
  ): Promise<VerifyOtpResponseDto>;
}