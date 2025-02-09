import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DecisionPopupData } from '../shared/models/decision-popup-data.model';

@Component({
  selector: 'app-decision-popup',
  templateUrl: './decision-popup.component.html',
  styleUrls: ['./decision-popup.component.scss']
})
export class DecisionPopupComponent {
  @Output() decision = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<DecisionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DecisionPopupData
  ) {}

  confirm(): void {
    this.decision.emit(true); // ✅ Emit confirm action
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.decision.emit(false); // ✅ Emit cancel action
    this.dialogRef.close(false);
  }
}
