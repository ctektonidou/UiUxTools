import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  passwordVisible: boolean = false;
  errorMessage: string = "";

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.dialogRef.close();
      } else {
        this.errorMessage = "Λάθος στοιχεία σύνδεσης. Δοκιμάστε ξανά.";
      }
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  openRegisterDialog(event: Event): void {
    event.preventDefault(); //Stops any default navigation
    this.dialogRef.close();
  
    this.dialogRef.afterClosed().subscribe(() => {
      this.dialog.open(RegisterComponent, {
        width: '450px',
        disableClose: true,
        panelClass: 'custom-dialog-container',
        backdropClass: 'custom-dialog-backdrop',
      });
    });
  }  

}
