import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.scss']
})
export class UserReviewsComponent {
  @Input() tool: any;
  @Input() reviews: any[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  getStars(rating: number): string[] {
    let stars: string[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'star' : 'star_border'); // Filled or empty star
    }
    return stars;
  }
}
