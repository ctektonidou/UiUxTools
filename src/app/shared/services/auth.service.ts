import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://localhost:8081/api/auth'; // Backend API URL
  // private tokenKey = 'auth_token'; // Local storage key for token
  public userRole: string = 'admin';

  setRole(role: string): void {
    this.userRole = role;
  }

  getRole(): string {
    return this.userRole;
  }
}