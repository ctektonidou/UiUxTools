import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EvaluationsService } from '../shared/services/evaluations.service';
import { DecisionPopupComponent } from '../decision-popup/decision-popup.component';
import { DecisionPopupType } from '../shared/enums/desicion-popup-type.enum';
import { EvaluationComponent } from '../evaluation/evaluation.component';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.scss']
})
export class UserReviewsComponent {
  @Input() tool: any;
  @Input() reviews: any[] = [];
  @Input() currentUserId!: number;
  @Output() refreshReviews = new EventEmitter<void>();

  constructor(
    private evaluationsService: EvaluationsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  getStars(rating: number): string[] {
    let stars: string[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'star' : 'star_border'); // Filled or empty star
    }
    return stars;
  }

  editReview(review: any) {
    const dialogRef = this.dialog.open(EvaluationComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
      data: {
        tool: this.tool,
        review: review // pass review object for edit
      }
    });
  
    dialogRef.afterClosed().subscribe((wasReviewSubmitted: boolean) => {
      if (wasReviewSubmitted) {
        this.refreshReviews.emit(); // reload updated reviews
      }
    });
  }
  

  deleteReview(review: any) {
    const dialogRef = this.dialog.open(DecisionPopupComponent, {
      width: '500px',
      data: {
        type: DecisionPopupType.DELETE,
        title: 'Διαγραφή Αξιολόγησης',
        message: `Είστε σίγουροι ότι θέλετε να διαγράψετε την αξιολόγηση σας;`
      },
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.evaluationsService.deleteEvaluation(review.evaluationId).subscribe(() => {
          this.refreshReviews.emit();
        });
      }
    });
  }

  canEditOrDelete(review: any): boolean {
    return review.userId === this.currentUserId;
  }
}
