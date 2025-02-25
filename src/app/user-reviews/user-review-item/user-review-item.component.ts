import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-review-item',
  templateUrl: './user-review-item.component.html',
  styleUrls: ['./user-review-item.component.scss']
})
export class UserReviewItemComponent {
  @Input() review: any; // Individual review object passed from parent

  getStars(rating: number): string[] {
    let stars: string[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'star' : 'star_border'); // Filled or empty star
    }
    return stars;
  }
}
