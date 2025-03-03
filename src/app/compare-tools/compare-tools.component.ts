import { Component, OnInit } from '@angular/core';
import { PassCompareListService } from '../shared/services/pass-compare-list.service';
import { SearchItem } from '../shared/models/search-item.model';
import { ToolService } from '../shared/services/tool.service';
import { Tool } from '../shared/interfaces/get-all-tools';

@Component({
  selector: 'app-compare-tools',
  templateUrl: './compare-tools.component.html',
  styleUrl: './compare-tools.component.scss'
})
export class CompareToolsComponent implements OnInit {
  compareList: SearchItem[] = [];
  loadedTools: boolean = false;
  compareListFinal: Tool[] = [];

  constructor(
    private passCompareListService: PassCompareListService,
    private toolService: ToolService
  ) { }

  ngOnInit(): void {
    this.passCompareListService.selectedCompareList$.subscribe((list) => {
      this.compareList = list.slice(0, 3);
    });
    if (this.compareList.length > 0) {
      this.getToolsDetails();
    }
  }

  removeItem(item: any) {
    this.compareList = this.compareList.filter((t) => t !== item);
    this.passCompareListService.setCompareList([...this.compareList]);
  }

  clearComparison() {
    this.compareList = [];
    this.passCompareListService.setCompareList([]);
  }

  getToolsDetails() {
    let compareListIds = [];
    for (let i = 0; i < this.compareList.length; i++) {
      compareListIds.push(this.compareList[i].id);
    }
    this.toolService.getToolsByIds(compareListIds).subscribe(response => {
      if (response) {
        this.loadedTools = true;
        this.compareListFinal = response;
      }
    });
  }
}
