import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DecisionPopupComponent } from '../decision-popup/decision-popup.component';
import { DecisionPopupType } from '../shared/enums/desicion-popup-type.enum';

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

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initUserProfileForm();
  }

  initUserProfileForm() {
    this.profileForm = this.fb.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]]
    });
    this.fillUserForm();
  }

  fillUserForm() {
    //user data call
    this.profileForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '******'
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

  updateUserDetails() {

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
    //na dw pws 8a pairnw to emit gia to ti ekane

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUserDetails();
      } else {
        console.log('Update cancelled.');
      }
    });
  }
}
