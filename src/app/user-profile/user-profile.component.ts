import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DecisionPopupComponent } from '../decision-popup/decision-popup.component';
import { DecisionPopupType } from '../shared/enums/desicion-popup-type.enum';
import { ToolService } from '../shared/services/tool.service';
import { UpdateUserRequest, User } from '../shared/interfaces/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileForm!: FormGroup;
  isEditing: boolean = false; // Controls form state
  profileImage: string = 'assets/profile-placeholder.png'; // Default profile image
  user?: User;
  userId: any;
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toolService: ToolService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('userId') !== null) {
      this.userId = Number(localStorage.getItem('userId'));
      this.getUserProfileDetails();
    };
  }

  getUserProfileDetails() {
    this.toolService.getUser(this.userId).subscribe(response => {
      if (response) {
        this.user = response;
        this.initUserProfileForm();
      }
    });
  }

  initUserProfileForm() {
    this.profileForm = this.fb.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }],
      password: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]]
    });
    this.fillUserForm();
  }

  fillUserForm() {
    this.profileForm.patchValue({
      firstName: this.user?.firstname,
      lastName: this.user?.lastname,
      email: this.user?.email,
      password: this.user?.password
    });
  }

  toggleEdit() {
    this.isEditing = true;
    this.profileForm.enable(); // Enable all fields
    this.profileForm.controls['email'].disable(); // Keep email disabled
  }

  submitProfile() {
    if (this.profileForm.valid) {
      console.log('Updated Profile:', this.profileForm.value);
      this.isEditing = false;
      this.profileForm.disable(); // Disable form after update
      this.updateUserDetails();
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click(); // Opens file browser
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result; // Display selected image
      };
      reader.readAsDataURL(file);
    }
  }

  confirmUpdate() {
    const dialogRef = this.dialog.open(DecisionPopupComponent, {
      width: '600px',
      data: {
        type: DecisionPopupType.APPROVE,
        title: 'Επιβεβαίωση Ενημέρωσης Στοιχείων',
        message: 'Είστε σίγουροι ότι θέλετε να ενημερώσετε τα στοιχεία χρήστη σας;'
      },
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitProfile();
      } else {
        console.log('Update cancelled.');
      }
    });
  }

  updateUserDetails() {
    const request: UpdateUserRequest = {
      password: this.profileForm.controls['password'].value,
      lastname: this.profileForm.controls['lastName'].value,
      firstname: this.profileForm.controls['firstName'].value
    }
    this.toolService.updateUser(this.userId, request).subscribe(response => {
      if (response) {
        window.location.reload();
      }
    });
  }

  cancel() {
    this.isEditing = false;
    this.profileForm.disable();
    this.fillUserForm();
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
