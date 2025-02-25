import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent {
  tool: any; // Store the passed tool data
  easeOfUseRating = 0; // Rating for "Εύκολο στη χρήση"
  trueFeaturesRating = 0; // Rating for "Αληθινά Χαρακτηριστικά"
  reviewText = ''; // User input for review

  constructor(
    public dialogRef: MatDialogRef<EvaluationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject the tool data
  ) {
    this.tool = data.tool; 
  }

  setRating(type: string, value: number) {
    if (type === 'easeOfUse') {
      this.easeOfUseRating = value;
    } else if (type === 'trueFeatures') {
      this.trueFeaturesRating = value;
    }
  }

  submitReview() {
    const reviewData = {
      toolId: this.tool.id,
      easeOfUse: this.easeOfUseRating,
      trueFeatures: this.trueFeaturesRating,
      reviewText: this.reviewText
    };
    console.log('Review Submitted:', reviewData);
    //evaluation call
    this.dialogRef.close(reviewData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
