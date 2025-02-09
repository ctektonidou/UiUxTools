import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  passwordVisible: boolean = false;
  
  constructor(public dialogRef: MatDialogRef<LoginComponent>) {}

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
    this.passwordVisible = !this.passwordVisible; // Toggle between true/false
  }

}
