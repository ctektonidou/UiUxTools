import { Component, OnInit } from '@angular/core';
import { PassCompareListService } from '../shared/services/pass-compare-list.service';
import { SearchItem } from '../shared/models/search-item.model';
import { ToolService } from '../shared/services/tool.service';
import { Tool } from '../shared/interfaces/get-all-tools';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.passCompareListService.selectedCompareList$.subscribe((list) => {
      this.compareList = list.slice(0, 3);
    });
    if (this.compareList.length > 0) {
      this.getTools();
    }
  }

  removeItem(item: any) {
    this.compareList = this.compareList.filter((t) => t !== item);
    this.passCompareListService.setCompareList([...this.compareList]);
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
