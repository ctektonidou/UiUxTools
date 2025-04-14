import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EvaluationsService } from '../shared/services/evaluations.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DecisionPopupType } from '../shared/enums/desicion-popup-type.enum';
import { DecisionPopupComponent } from '../decision-popup/decision-popup.component';
import { SubmitReviewRequest } from '../shared/interfaces/review';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent {
  tool: any;
  totalRating = 0;
  easeOfUseRating = 0;
  trueFeaturesRating = 0;
  reviewText = '';
  isEditMode = false;
  evaluationId?: number;

  constructor(
    public dialogRef: MatDialogRef<EvaluationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private evaluationsService: EvaluationsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.tool = data.tool;
    this.isEditMode = !!data.review;

  if (this.isEditMode && data.review) {
    const review = data.review;
    this.totalRating = review.totalRating;
    this.easeOfUseRating = review.easyToUse;
    this.trueFeaturesRating = review.trueToChars;
    this.reviewText = review.comment;
    this.evaluationId = review.evaluationId;
  }
  }

  setRating(type: string, value: number) {
    if (type === 'totalRating') {
      this.totalRating = value;
    } else if (type === 'easeOfUse') {
      this.easeOfUseRating = value;
    } else if (type === 'trueFeatures') {
      this.trueFeaturesRating = value;
    }
  }

  get isFormValid(): boolean {
    return (
      this.totalRating > 0 &&
      this.easeOfUseRating > 0 &&
      this.trueFeaturesRating > 0 &&
      this.reviewText.trim().length > 0
    );
  }  

  submitReviewReq(): SubmitReviewRequest {
    return {
      toolId: this.tool.toolId,
      totalRating: this.totalRating,
      easyToUse: this.easeOfUseRating,
      trueToChars: this.trueFeaturesRating,
      comment: this.reviewText,
      userId: this.authService.getUserId() || 1
    };
  }

  submitReview() {
    const userId = this.authService.getUserId();
    if (!userId) {
      alert('Πρέπει να είστε συνδεδεμένος για να αφήσετε αξιολόγηση.');
      return;
    }
  
    const request = this.submitReviewReq();
  
    if (this.isEditMode && this.evaluationId) {
      // Call update API
      this.evaluationsService.updateReview(this.evaluationId, request).subscribe({
        next: () => {
          this.snackBar.open('Η αξιολόγηση ενημερώθηκε με επιτυχία!', undefined, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: () => this.handleError()
      });
    } else {
      // Call create API
      this.evaluationsService.submitReview(request).subscribe({
        next: () => {
          this.snackBar.open('Η αξιολόγηση υποβλήθηκε με επιτυχία!', undefined, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: () => this.handleError()
      });
    }
  }
  
  handleError() {
    this.dialog.open(DecisionPopupComponent, {
      width: '600px',
      data: {
        type: DecisionPopupType.INFO,
        title: 'Σφάλμα',
        message: 'Σφάλμα κατά την αποθήκευση αξιολόγησης'
      },
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
    });
  }  

  closeDialog() {
    this.dialogRef.close();
  }
}