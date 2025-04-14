import { Component, OnInit } from '@angular/core';
import { PassCompareListService } from '../shared/services/pass-compare-list.service';
import { SearchItem } from '../shared/models/search-item.model';
import { ToolService } from '../shared/services/tool.service';
import { Tool } from '../shared/interfaces/get-all-tools';
import { Router } from '@angular/router';
import { DecisionPopupType } from '../shared/enums/desicion-popup-type.enum';
import { DecisionPopupComponent } from '../decision-popup/decision-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-compare-tools',
  templateUrl: './compare-tools.component.html',
  styleUrl: './compare-tools.component.scss'
})
export class CompareToolsComponent implements OnInit {
  compareList: SearchItem[] = [];
  loadedTools: boolean = false;
  compareListFinal: Tool[] = [];
  compareDetailListFinal: any[] = [];

  constructor(
    private passCompareListService: PassCompareListService,
    private toolService: ToolService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.passCompareListService.selectedCompareList$.subscribe((list) => {
      this.compareList = list.slice(0, 3);
      this.loadCompareData();
    });
  }

  loadCompareData() {
    if (this.compareList.length === 0) {
      this.compareListFinal = [];
      this.compareDetailListFinal = [];
      return;
    }

    const compareListIds = this.compareList.map(t => t.id);

    this.toolService.getToolsByIds(compareListIds).subscribe(response => {
      this.compareListFinal = response;
      this.loadedTools = true;

      this.toolService.getToolComparison(compareListIds).subscribe(response => {
        this.compareDetailListFinal = response.map((tool: any) => ({
          ...tool,
          formattedFeatures: this.formatFeatures(tool.features),
        }));
      });
    });
  }

  removeItem(item: SearchItem) {
    this.passCompareListService.setCompareList(
      this.compareList.filter((t) => t !== item)
    );

    if (this.compareList.length === 0) {
      this.router.navigate(['/search']);
    }
  }

  confirmDeleteComparison() {
    const dialogRef = this.dialog.open(DecisionPopupComponent, {
      width: '600px',
      data: {
        type: DecisionPopupType.DELETE,
        title: 'Επιβεβαίωση Διαγραφής Σύγκρισης',
        message: 'Είστε σίγουροι ότι θέλετε να αφαιρέσετε όλα τα εργαλεία από την σύγκριση;'
      },
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.clearComparison();
      }
    });
  }

  clearComparison() {
    this.compareList = [];
    this.passCompareListService.setCompareList([]);
    this.router.navigate(['/search']);
  }

  getTools() {
    let compareListIds = [];
    for (let i = 0; i < this.compareList.length; i++) {
      compareListIds.push(this.compareList[i].id);
    }
    this.toolService.getToolsByIds(compareListIds).subscribe(response => {
      if (response) {
        this.compareListFinal = response;
        this.loadedTools = true;
        this.getToolDetails(compareListIds);
      }
    });
  }

  getToolDetails(compareListIds: number[]) {
    this.toolService.getToolComparison(compareListIds).subscribe(response => {
      if (response) {

        this.compareDetailListFinal = response.map((tool: any) => ({
          ...tool,
          formattedFeatures: this.formatFeatures(tool.features), // 🛠 Format before passing
        }));

      }
    });
  }

  formatFeatures(features: any[]): any[] {
    if (!features || features.length === 0) return []; // Ensure it's always an array

    const groupedFeatures: { [key: string]: string[] } = {};

    features.forEach(featureItem => {
      if (!featureItem.group) return; // Ensure group exists
      if (!groupedFeatures[featureItem.group]) {
        groupedFeatures[featureItem.group] = [];
      }
      groupedFeatures[featureItem.group].push(featureItem.feature);
    });

    return Object.entries(groupedFeatures).map(([group, features]) => ({
      group,
      features: features.join(", "), // Combine as a comma-separated string
    }));
  }

  goToTool(item: SearchItem) {
    this.router.navigate(['/tools/' + item.id + '/display']);
  }

}
