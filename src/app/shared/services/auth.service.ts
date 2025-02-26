import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth'; // Backend API URL
  private tokenKey = 'auth_token'; // Local storage key for token

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // ✅ Expose as observable

  private userSubject = new BehaviorSubject<any>(null); // Stores user data
  public user$ = this.userSubject.asObservable(); // Observable for user data

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  /** ✅ Login and store token */
  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true // ✅ Important for CORS & Cookies
    }).pipe(
      map(response => {
        this.storeToken(response.token);
        this.isAuthenticatedSubject.next(true); // ✅ Update authentication state
        return true;
      }),
      catchError(() => {
        return new Observable<boolean>(observer => {
          observer.next(false);
          observer.complete();
        });
      })
    );
  }

  /** ✅ Logout and remove token */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false); // ✅ Update authentication state
    this.userSubject.next(null);
    this.router.navigate(['/login']); // Redirect to login page
  }

  /** ✅ Check if user is logged in */
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  /** ✅ Get JWT token from storage */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /** ✅ Store token and extract user data */
  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticatedSubject.next(true); // ✅ Ensure state is updated
    this.extractUserFromToken(token);
  }

  /** ✅ Extract user details from JWT token */
  private extractUserFromToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userSubject.next({ email: payload.sub, roles: payload.roles });
    } catch (error) {
      console.error('Invalid token');
      this.logout();
    }
  }

  /** ✅ Load user from token (if exists) */
  private loadUserFromStorage(): void {
    const token = this.getToken();
    if (token) {
      this.extractUserFromToken(token);
    }
  }

  /** ✅ Check if token exists */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}