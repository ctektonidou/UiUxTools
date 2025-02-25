import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PassCompareListService } from '../shared/services/pass-compare-list.service';
import { Router } from '@angular/router';
import { DecisionPopupComponent } from '../decision-popup/decision-popup.component';
import { DecisionPopupType } from '../shared/enums/desicion-popup-type.enum';
import { EvaluationComponent } from '../evaluation/evaluation.component';

@Component({
  selector: 'app-tool-display',
  templateUrl: './tool-display.component.html',
  styleUrls: ['./tool-display.component.scss']
})
export class ToolDisplayComponent implements OnInit {

  compareList: any[] = [];

  tool = {
    imageUrl: 'assets/drawio.png',
    name: 'Draw.io',
    description: 'Free online diagram software for making flowcharts...',
    link: 'https://app.diagrams.net/',
    targetAudience: 'Beginners',
    platformSupport: 'Windows, MacOS',
    pricingModel: 'Free (Limited Features)',
    useCases: 'UI Design',
    animation: false,
    reviewGrade: 3
  };

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private passCompareListService: PassCompareListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.passCompareListService.selectedCompareList$.subscribe(res => {
      this.compareList = Array.isArray(res) ? res : [];
    })
  }

  openEvaluationDialog(tool: any) {
    this.dialog.open(EvaluationComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
      data: { tool }
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
    const dialogRef = this.dialog.open(DecisionPopupComponent, {
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
    const dialogRef = this.dialog.open(DecisionPopupComponent, {
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
}
