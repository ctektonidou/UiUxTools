import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(public dialogRef: MatDialogRef<LoginComponent>) {}

  closeDialog(): void {
    this.dialogRef.close(); // Closes the modal when clicking the close button
  }

}
