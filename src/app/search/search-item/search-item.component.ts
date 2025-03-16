import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecisionPopupComponent } from '../../decision-popup/decision-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DecisionPopupType } from '../../shared/enums/desicion-popup-type.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PassCompareListService } from '../../shared/services/pass-compare-list.service';
import { Router } from '@angular/router';
import { Tool } from '../../shared/interfaces/get-all-tools';
import { SearchItem } from '../../shared/models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent {
  @Input() item!: SearchItem;
  @Output() hasCompareList = new EventEmitter<SearchItem[]>();
  compareList: SearchItem[] = [];

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

  goToTool(item: SearchItem) {
    this.router.navigate(['/tools/' + item.id + '/display']);
  }

  addItemToCompareList(itemCode: SearchItem): void {
    if (this.compareList.includes(itemCode)) {
      this.showDuplicatePopup();
    } else if (this.compareList.length < 3) {
      this.compareList.push(itemCode);
      this.passCompareListService.setCompareList([...this.compareList]);
      this.hasCompareList.emit(this.compareList);
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
      duration: 3000, // hide after 3 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

}
