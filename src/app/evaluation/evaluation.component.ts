import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any
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

  submitReview() {
    const reviewData = {
      toolId: this.tool.id,
      totalRating: this.totalRating,
      easeOfUse: this.easeOfUseRating,
      trueFeatures: this.trueFeaturesRating,
      reviewText: this.reviewText
    };
    this.dialogRef.close(reviewData);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}