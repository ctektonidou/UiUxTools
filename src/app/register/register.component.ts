import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ToolService } from '../shared/services/tool.service';

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
    public dialog: MatDialog,
    private toolService: ToolService
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
      firstname: this.registerForm.get('firstName')?.value,
      lastname: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    };
    this.toolService.createUser(payload).subscribe(response => {
      if (response) {
        this.closeDialog();
      }
    });
  }

  openLoginDialog(event: Event): void {
    event.preventDefault(); //Stops any default navigation

    this.dialogRef.close();

    this.dialogRef.afterClosed().subscribe(() => {
      this.dialog.open(LoginComponent, {
        width: '450px',
        disableClose: true,
        panelClass: 'custom-dialog-container',
        backdropClass: 'custom-dialog-backdrop',
      });
    });
  }
}
