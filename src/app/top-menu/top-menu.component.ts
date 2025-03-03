import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRole } from '../shared/enums/user-role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TopMenuComponent{

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {    
  }

  tokenInLocalStorage(): boolean {
    const isToken = localStorage.getItem('token');
    if (isToken) {
      return true;
    } return false;
  }

  isAdmin(): boolean {
    const userRole = localStorage.getItem('userRole');
    if (userRole === UserRole.ADMIN) {
      return true;
    } return false;
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
    this.router.navigate(['/user-profile']);    
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  goToToolManagement() {
    this.router.navigate(['/admin/tools']);
    
  }

  logout() {
    localStorage.clear();
    this.showAddedNotification('Επιτυχώς αποσυνδεθήκατε');
    this.router.navigate(['/search']);
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