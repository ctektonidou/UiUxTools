import { Component, OnInit } from '@angular/core';
import { EvaluationsService } from '../shared/services/evaluations.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit {
  allReviews: any[] = [];
  searchText: string = '';
  sortOption: string = 'name';

  constructor(
    private evaluationsService: EvaluationsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId() || 0;
    this.evaluationsService.getReviewsByUserId(userId).subscribe(res => {
      this.allReviews = res;
    });
  }

  filteredReviews(): any[] {
    let filtered = this.allReviews.filter(r =>
      r.toolName.toLowerCase().includes(this.searchText.toLowerCase())
    );

    switch (this.sortOption) {
      case 'rating-high':
        return filtered.sort((a, b) => b.totalRating - a.totalRating);
      case 'rating-low':
        return filtered.sort((a, b) => a.totalRating - b.totalRating);
      default:
        return filtered.sort((a, b) => a.toolName.localeCompare(b.toolName));
    }
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < rating ? 'star' : 'star_border');
  }

  goToTool(toolId: number) {
    this.router.navigate(['/tools', toolId, 'display']);
  }
}
