import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  passwordVisible: boolean = false;
  registerForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  submitRegisterForm() {
    const payload = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    };
    //register call
  }

  openLoginDialog(): void {
    this.dialogRef.close(); 

    setTimeout(() => {
      this.dialog.open(LoginComponent, {
        width: '450px',
        disableClose: true,
        panelClass: 'custom-dialog-container',
        backdropClass: 'custom-dialog-backdrop',
      });
    }, 100);
  }
}
