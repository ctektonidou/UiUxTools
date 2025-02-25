import { Component } from '@angular/core';
import { DecisionPopupComponent } from '../decision-popup/decision-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DecisionPopupType } from '../shared/enums/desicion-popup-type.enum';
import { Router } from '@angular/router';

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
    public dialog: MatDialog,
    private router: Router
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
      }
    });
  }

  deleteTool(tool: any) {
    //delete call
  }

  editTool(tool: any) {
    this.router.navigate(['/tools/' + tool.id + '/edit']);
  }

  goToAddTool() {
    this.router.navigate(['/tools/create']);
  }
}
