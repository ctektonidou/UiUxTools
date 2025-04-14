import { Component, Input, SimpleChanges } from '@angular/core';
import { SearchItem } from '../../shared/models/search-item.model';

@Component({
  selector: 'app-compare-table',
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss']
})
export class CompareTableComponent {
  @Input() compareList: any[] = [];
  formattedCompareList: any[] = [];
  featureGroups: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['compareList']) {
      this.prepareComparisonData();
    }
  }

  prepareComparisonData() {
    if (!this.compareList || this.compareList.length === 0) {
      this.formattedCompareList = [];
      this.featureGroups = [];
      return;
    }

    const allGroups = new Set<string>();
    this.compareList.forEach(tool => {
      tool.formattedFeatures.forEach((feature: any) => allGroups.add(feature.group));
    });

    this.featureGroups = Array.from(allGroups);

    this.formattedCompareList = this.compareList.map(tool => {
      const featureMap: { [key: string]: string } = {};
      tool.formattedFeatures.forEach((feature: any) => {
        featureMap[feature.group] = feature.features;
      });

      return { ...tool, featureMap };
    });
  }

}