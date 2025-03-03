import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { LoginService } from '../shared/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenController } from '../shared/token/token_controller';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest } from '../shared/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends TokenController {
  email: string = "";
  password: string = "";
  passwordVisible: boolean = false;
  error: string = "";
  token?: string = "";
  userRole: string = '';
  userId!: number;
  tokenExpired: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    router: Router
  ) {
    super(router)

    const savedToken = localStorage.getItem("token");
    //if token is in local storage
    if (savedToken) {
      if (this.tokenIsValid(savedToken)) {
        //redirect to home page if it's valid
        this.getRouter().navigate(['/home']);
      }
      else {
        //remove it if it's invalid
        localStorage.setItem("token", "");
      }
    }

    //look for error message param in case of redirect
    this.route.queryParams.subscribe(params => {
      if (params["error"]) {
        this.error = params["error"]
      }
      if (params["tokenExpired"]) {
        this.tokenExpired = params["tokenExpired"]
        if (this.tokenExpired) {
          localStorage.clear();
        }
      }
    })
  }

  ngOnInit() {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  login() {
    const request: LoginRequest = {
      email: this.email,
      password: this.password
    };
    this.loginService.login(request).subscribe({
      next: data => {
        this.token = data.token;
        console.log('Received token:', this.token);
        if (this.token) {
          localStorage.setItem('token', this.token);
          this.userRole = this.decodeJwt(this.token);
          console.log('Role:', this.userRole);
          localStorage.setItem('userRole', this.userRole);
          localStorage.setItem('email', this.email);
          this.closeDialog();
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        const errorMessage =
          error.status === 401
            ? 'Invalid credentials. Please try again.'
            : 'Something went wrong. Please try later.';
        this.showAddedNotification(errorMessage);
      },
    });
  }

  showAddedNotification(text: string): void {
    this.snackBar.open(text, undefined, {
      duration: 3000, // hide after 3 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
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

  decodeJwt(token: string) {
    // Split the token into its three parts (header, payload, signature)
    const parts = token.split('.');

    // Decode the payload (the second part of the JWT)
    const payload = parts[1];

    // Base64Url decode the payload
    const decodedPayload = this.base64UrlDecode(payload);

    // Parse the JSON string into an object
    const parsedPayload = JSON.parse(decodedPayload);

    // Extract the role (assuming it's stored in the 'role' property)
    return parsedPayload.role;
  }

  base64UrlDecode(base64Url: string): string {
    // Replace non-base64 characters with base64 compatible ones
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Add padding if necessary
    const padding = '='.repeat((4 - base64.length % 4) % 4);
    const base64WithPadding = base64 + padding;

    // Decode the base64 string
    const decodedString = atob(base64WithPadding);

    return decodedString;
  }

}
