import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.scss']
})
export class UserReviewsComponent {
  @Input() reviewGrade: number = 0;

  reviews = [
    {
      reviewGrade: 3,
      userImage: 'assets/user1.png',
      username: 'User1234',
      comment: 'Nice tool, useful, easy to use. Love it!',
      easeOfUse: 3,
      trueCharacteristics: 4
    },
    {
      reviewGrade: 4,
      userImage: 'assets/user2.png',
      username: 'User5678',
      comment: 'Good but could be improved in some areas.',
      easeOfUse: 3,
      trueCharacteristics: 2
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  getStars(rating: number): string[] {
    let stars: string[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'star' : 'star_border'); // Filled or empty star
    }
    return stars;
  }
}
