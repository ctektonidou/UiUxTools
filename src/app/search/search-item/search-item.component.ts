import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchItem } from '../../shared/models/search-item.model';
import { DecisionPopupComponent } from '../../decision-popup/decision-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DecisionPopupType } from '../../shared/enums/desicion-popup-type.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PassCompareListService } from '../../shared/services/pass-compare-list.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent {
  @Input() item!: SearchItem;
  // @Output() item!: SearchItem;
  @Output() hasCompareList = new EventEmitter<SearchItem[]>();
  compareList: SearchItem[] = [];

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private passCompareListService: PassCompareListService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.passCompareListService.selectedCompareList$.subscribe(res => {
      this.compareList = Array.isArray(res) ? res : [];
    })
  }

  goToTool(item: SearchItem) {
    //na mpei emit pou na pernaei to item ston mpampa search
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
