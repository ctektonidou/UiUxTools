import { Component, OnInit } from '@angular/core';
import { PassCompareListService } from '../shared/services/pass-compare-list.service';
import { SearchItem } from '../shared/models/search-item.model';

@Component({
  selector: 'app-compare-tools',
  templateUrl: './compare-tools.component.html',
  styleUrl: './compare-tools.component.scss'
})
export class CompareToolsComponent implements OnInit {
  compareList: SearchItem[] = [];

  constructor(private passCompareListService: PassCompareListService) {}

  ngOnInit(): void {
    this.passCompareListService.selectedCompareList$.subscribe((list) => {
      this.compareList = list.slice(0, 3);
    });
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
    //call for tool details -> input ston pinaka
  }
}
