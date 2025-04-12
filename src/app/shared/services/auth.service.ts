import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ROLE_KEY = 'userRole';
  private readonly USER_ID_KEY = 'userId';

  constructor() {}

  // Get user role from localStorage
  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  // Set user role in localStorage
  setRole(role: string): void {
    localStorage.setItem(this.ROLE_KEY, role);
  }

  // Get user ID from localStorage
  getUserId(): number | null {
    const id = localStorage.getItem(this.USER_ID_KEY);
    return id ? parseInt(id, 10) : null;
  }

  // Set user ID in localStorage
  setUserId(userId: number): void {
    localStorage.setItem(this.USER_ID_KEY, userId.toString());
  }

  // Clear auth data (optional for logout)
  clearAuthData(): void {
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
}