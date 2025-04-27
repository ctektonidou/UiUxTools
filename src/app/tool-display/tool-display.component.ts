import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PassCompareListService } from '../shared/services/pass-compare-list.service';
import { ToolService } from '../shared/services/tool.service';
import { DecisionPopupComponent } from '../decision-popup/decision-popup.component';
import { DecisionPopupType } from '../shared/enums/desicion-popup-type.enum';
import { EvaluationComponent } from '../evaluation/evaluation.component';
import { EvaluationsService } from '../shared/services/evaluations.service';
import { AuthService } from '../shared/services/auth.service';
import { FavoriteToolsService } from '../shared/services/favorite-tools.service';

@Component({
  selector: 'app-tool-display',
  templateUrl: './tool-display.component.html',
  styleUrls: ['./tool-display.component.scss']
})
export class ToolDisplayComponent implements OnInit {
  compareList: any[] = [];
  tool: any = {};
  featureGroups: string[] = [];
  featureMap: { [key: string]: string } = {}; // group -> comma-separated features
  reviews: any[] = [];
  toolLoaded: boolean = false;
  currentUserId: number = 0;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private toolService: ToolService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private passCompareListService: PassCompareListService,
    private evaluationsService: EvaluationsService,
    public authService: AuthService,
    private favoriteService: FavoriteToolsService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId() || 0;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadTool(id);
      this.loadReviews(id);
    }
  }

  loadTool(id: number): void {
    this.toolService.getToolWithDetails(id).subscribe(tool => {
      this.tool = {
        toolId: tool.toolId,
        name: tool.toolName,
        imageUrl: tool.image,
        description: tool.description,
        link: tool.link,
        reviewGrade: tool.finalRating.toFixed(1),
        reviewCount: tool.reviewCount
      };

      // Group and format features by group name
      const groupedFeatures: { [key: string]: string[] } = {};

      tool.features.forEach((feature: any) => {
        const group = feature.group;
        const value = feature.feature;

        if (!groupedFeatures[group]) {
          groupedFeatures[group] = [];
        }
        groupedFeatures[group].push(value);
      });

      this.featureMap = {};
      this.featureGroups = Object.keys(groupedFeatures);

      for (const group of this.featureGroups) {
        this.featureMap[group] = groupedFeatures[group].join(', ');
      }
      this.toolLoaded = true;
      this.favoriteService.isFavorite(this.currentUserId, this.tool.toolId).subscribe(res => this.isFavorite = res);
    });
  }

  loadReviews(id: number): void {
    this.evaluationsService.getReviewsByToolId(id).subscribe(res => {
      this.reviews = res;
    });
  }

  openEvaluationDialog(tool: any) {
    const dialogRef = this.dialog.open(EvaluationComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
      data: { tool }
    });

    dialogRef.afterClosed().subscribe((wasReviewSubmitted: boolean) => {
      if (wasReviewSubmitted) {
        this.loadReviews(tool.toolId);
        this.loadTool(tool.toolId);
      }
    });
  }

  addItemToCompareList(itemCode: any): void {
    if (this.compareList.includes(itemCode)) {
      this.showDuplicatePopup();
    } else if (this.compareList.length < 3) {
      this.compareList.push(itemCode);
      this.passCompareListService.setCompareList([...this.compareList]);
      this.showAddedNotification();
    } else {
      this.showLimitPopup();
    }
  }

  showLimitPopup() {
    this.dialog.open(DecisionPopupComponent, {
      width: '600px',
      data: {
        type: DecisionPopupType.INFO,
        title: 'Όριο Σύγκρισης Εργαλείων',
        message: 'Μπορείτε να συγκρίνετε έως 3 εργαλεία.'
      },
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
    });
  }

  showDuplicatePopup() {
    this.dialog.open(DecisionPopupComponent, {
      width: '600px',
      data: {
        type: DecisionPopupType.INFO,
        title: 'Το εργαλείο είναι ήδη στη λίστα',
        message: 'Αυτό το εργαλείο έχει ήδη προστεθεί στη λίστα σύγκρισης.'
      },
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
    });
  }

  showAddedNotification(): void {
    this.snackBar.open('Το εργαλείο προστέθηκε στη λίστα σύγκρισης!', undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.currentUserId, this.tool.toolId).subscribe(() => this.isFavorite = false);
    } else {
      this.favoriteService.addFavorite(this.currentUserId, this.tool.toolId).subscribe(() => this.isFavorite = true);
    }
  }
}
