import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignupRequest } from '../models/signup-request.model';
import { Observable } from 'rxjs';
import { SignupResponse } from '../models/signup-response.model';
import { VerifyOtpRequest } from '../models/verify-otp-request.model';
import { ResendOtpRequest } from '../models/resend-otp-request.model';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  signup(request: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${environment.apiUrl}/auth/signup`, request);
  }

  verifyOtp(request: VerifyOtpRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}/auth/verify-otp`, request);
  }

  resendOtp(request: ResendOtpRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}/auth/resend-otp`, request);
  }
}
