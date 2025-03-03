import { Component, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenController } from '../shared/token/token_controller';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TopMenuComponent extends TokenController {
  isLoggedIn: boolean = false;

  isAdmin = true;

  constructor(
    public dialog: MatDialog,
    router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    super(router)
  }

  ngOnInit(): void {
  }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '450px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
    });
  }

  openRegisterDialog(): void {
    this.dialog.open(RegisterComponent, {
      width: '450px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
    });
  }

  goToUserProfile() {
    this.getRouter()?.navigate(['/user-profile']);
  }

  goToSearch() {
    this.getRouter()?.navigate(['/search']);
  }

  goToToolManagement() {
    this.getRouter()?.navigate(['/admin/tools']);
  }

  logout() {
    console.log('Logout successful:');
    localStorage.clear();
    this.showAddedNotification('Επιτυχώς αποσυνδεθήκατε');
    this.getRouter()?.navigate(['/login']);
  }

  showAddedNotification(text: string): void {
    this.snackBar.open(text, undefined, {
      duration: 3000, // hide after 3 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
}