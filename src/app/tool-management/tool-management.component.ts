import { Component } from '@angular/core';
import { DecisionPopupComponent } from '../decision-popup/decision-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DecisionPopupType } from '../shared/enums/desicion-popup-type.enum';

@Component({
  selector: 'app-tool-management',
  templateUrl: './tool-management.component.html',
  styleUrls: ['./tool-management.component.scss']
})
export class ToolManagementComponent {
  tools = [
    { id: 1, code: '12345677', name: 'Figma' },
    { id: 2, code: '12345677', name: 'Draw.io' },
    { id: 3, code: '12345677', name: 'Photo shop Adobe' },
  ];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getTools();
  }

  getTools() {
    //api call
  }

  confirmDeleteTool(tool: any) { //na mpei type
    const dialogRef = this.dialog.open(DecisionPopupComponent, {
      width: '600px',
      data: {
        type: DecisionPopupType.DELETE,
        title: 'Επιβεβαίωση  Διαγραφής Εργαλείου',
        message: 'Είστε σίγουροι ότι θέλετε να διαγράψετε το ' + tool.name + ' ;'
      },
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
    });
    //na dw pws 8a pairnw to emit gia to ti ekane

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTool(tool);
      } else {
        console.log('delete cancelled.');
      }
    });
  }

  deleteTool(tool: any) {
    //delete call
  }

  editTool(tool: any) {
    console.log('Editing:', tool);
    //router na mpei
  }

  goToAddTool() {

  }
}
