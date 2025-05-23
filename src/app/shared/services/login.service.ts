import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private authUrl = 'http://localhost:8081/auth/login';
  // private authUrl = 'http://192.168.196.128:8080/thesis-1.0-SNAPSHOT/auth/login';
  private authUrl = 'http://38.242.217.176:8080/auth/login';

  constructor(private http: HttpClient) { }

  login(loginData: LoginRequest): Observable<any> {
    return this.http.post(
      this.authUrl, loginData, { headers: { "Content-Type": "application/json" } }
    );
  }
}