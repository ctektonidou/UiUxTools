import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private dealershipUrl = 'http://localhost:8081/auth/login';
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  login(loginData: LoginRequest): Observable<any> {
    return this.http.post(
      this.dealershipUrl, loginData, { headers: { "Content-Type": "application/json" } }
    );
  }
}