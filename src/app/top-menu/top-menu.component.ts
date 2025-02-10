import { Component, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TopMenuComponent {
  isLoggedIn = true;
  isAdmin = true;

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

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

  // openEvaluationDialog() {
  //   this.dialog.open(EvaluationComponent, {
  //     width: '500px',
  //     panelClass: 'custom-dialog-container',
  //     backdropClass: 'custom-dialog-backdrop'
  //   });
  // }

  goToUserProfile() {
    this.router.navigate(['/user-profile']); 
  }

  goToSearch() {
    this.router.navigate(['/search']); 
  }

  goToToolManagement() {
    this.router.navigate(['/admin/tools']); 
  }
}
