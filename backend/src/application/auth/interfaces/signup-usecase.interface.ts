import { SignupRequestDto } from "../request-dtos/signup-request.dto";
import { SignupResponseDto } from "../response-dtos/signup-response.dto";

export interface ISignUpUseCase {

    execute(
        dto: SignupRequestDto
    ): Promise<SignupResponseDto>;

}