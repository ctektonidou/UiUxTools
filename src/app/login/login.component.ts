import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  passwordVisible: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  closeDialog(): void {
    this.dialogRef.close(); // Closes the modal when clicking the close button
  }

  login() {
    const payload = {
      username: this.username,
      password: this.password
    };
    //login call
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
