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

  constructor(
    public dialogRef: MatDialogRef<EvaluationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private evaluationsService: EvaluationsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.tool = data.tool;
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
    this.evaluationsService.submitReview(this.submitReviewReq()).subscribe({
      next: (res) => {
        this.snackBar.open('Η αξιολόγηση υποβλήθηκε με επιτυχία!', undefined, {
          duration: 3000, // hide after 3 seconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.dialog.open(DecisionPopupComponent, {
          width: '600px',
          data: {
            type: DecisionPopupType.INFO,
            title: 'Σφάλμα',
            message: 'Σφάλμα κατά την υποβολή αξιολόγησης'
          },
          panelClass: 'custom-dialog-container',
          backdropClass: 'custom-dialog-backdrop',
        });
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}