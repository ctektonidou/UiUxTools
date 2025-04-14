import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-review-item',
  templateUrl: './user-review-item.component.html',
  styleUrls: ['./user-review-item.component.scss']
})
export class UserReviewItemComponent {
  @Input() review: any;
  @Input() currentUserId!: number;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  ngOnInit(): void {
    console.log(this.review);
    console.log(this.currentUserId);
  }

  getStars(rating: number): string[] {
    let stars: string[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'star' : 'star_border'); // Filled or empty star
    }
    return stars;
  }

  onEdit(review: any) {
    this.edit.emit(review);
  }
  
  onDelete(review: any) {
    this.delete.emit(review);
  }
}
