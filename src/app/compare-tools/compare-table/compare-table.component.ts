import { Component, Input } from '@angular/core';
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

  ngOnInit() {
    this.prepareComparisonData();
  }

  prepareComparisonData() {
    if (!this.compareList || this.compareList.length === 0) return;

    // Extract all unique feature groups
    const allGroups = new Set<string>();
    this.compareList.forEach(tool => {
      tool.formattedFeatures.forEach((feature: any) => allGroups.add(feature.group));
    });

    this.featureGroups = Array.from(allGroups);

    // Create a lookup table
    this.formattedCompareList = this.compareList.map(tool => {
      const featureMap: { [key: string]: string } = {};
      tool.formattedFeatures.forEach((feature: any) => {
        featureMap[feature.group] = feature.features;
      });

      return { ...tool, featureMap };
    });
  }

}