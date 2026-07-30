import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignupRequest } from '../models/signup-request.model';
import { Observable } from 'rxjs';
import { SignupResponse } from '../models/signup-reponse.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  signup(request: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${environment.apiUrl}/auth/signup`, request);
  }
}
