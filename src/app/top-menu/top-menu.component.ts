import { Component, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
  encapsulation: ViewEncapsulation.None, // ✅ Ensure global styles are applied
})
export class TopMenuComponent {
  isLoggedIn = false;
  isAdmin = true;

  constructor(public dialog: MatDialog) { }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
      position: { top: '50%', left: '50%' }
    });
  }
}
