import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchItem } from '../../shared/models/search-item.model';
import { DecisionPopupComponent } from '../../decision-popup/decision-popup.component';
import { DecisionPopupType } from '../../shared/enums/desicion-popup-type.enum';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-compare-tool-item',
  templateUrl: './compare-tool-item.component.html',
  styleUrl: './compare-tool-item.component.scss'
})
export class CompareToolItemComponent {
  @Input() tool!: SearchItem;
  @Output() remove = new EventEmitter<SearchItem>();

  constructor(
    public dialog: MatDialog
  ) { }

  confirmDeleteTool(tool: SearchItem) {
    const dialogRef = this.dialog.open(DecisionPopupComponent, {
      width: '600px',
      data: {
        type: DecisionPopupType.DELETE,
        title: 'Επιβεβαίωση  Διαγραφής Εργαλείου',
        message: 'Είστε σίγουροι ότι θέλετε να διαγράψετε το ' + tool.name + ' από την σύγκριση;'
      },
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeItem(tool);
      }
    });
  }

  removeItem(tool: SearchItem) {
    this.remove.emit(tool);
  }

  goToTool(tool:SearchItem) {
    //go to tool
  }
}
