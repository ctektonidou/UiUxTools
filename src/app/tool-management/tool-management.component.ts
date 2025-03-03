import { Component } from '@angular/core';
import { DecisionPopupComponent } from '../decision-popup/decision-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DecisionPopupType } from '../shared/enums/desicion-popup-type.enum';
import { Router } from '@angular/router';
import { GetAllToolsResponse, Tool } from '../shared/interfaces/get-all-tools';
import { ToolService } from '../shared/services/tool.service';

@Component({
  selector: 'app-tool-management',
  templateUrl: './tool-management.component.html',
  styleUrls: ['./tool-management.component.scss']
})
export class ToolManagementComponent {
  tools: GetAllToolsResponse[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private toolService: ToolService
  ) { }

  ngOnInit() {
    this.getTools();
  }

  getTools() {
    this.toolService.getAllTools().subscribe(response => {
      this.tools = response;
    });
  }

  confirmDeleteTool(tool: Tool) {
    const dialogRef = this.dialog.open(DecisionPopupComponent, {
      width: '600px',
      data: {
        type: DecisionPopupType.DELETE,
        title: 'Επιβεβαίωση  Διαγραφής Εργαλείου',
        message: 'Είστε σίγουροι ότι θέλετε να διαγράψετε το ' + tool.toolname + ' ;'
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

  deleteTool(tool: Tool) {
    console.log("delete");
    // this.toolService.deleteTool(tool.toolId).subscribe(response => {// TODO TEST
    //   if (response) {
    //     window.location.reload();
    //   }
    // });
  }

  editTool(tool: Tool) {
    this.router.navigate(['/tools/' + tool.toolId + '/edit']);
  }

  goToAddTool() {
    this.router.navigate(['/tools/create']);
  }
}
