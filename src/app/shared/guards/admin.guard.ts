import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'ADMIN') return true;

    // Redirect or show message
    this.router.navigate(['/search']);
    return false;
  }
}