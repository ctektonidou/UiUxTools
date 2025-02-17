import { Component, Input } from '@angular/core';
import { SearchItem } from '../../shared/models/search-item.model';

@Component({
  selector: 'app-compare-table',
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss']
})
export class CompareTableComponent {
  @Input() compareList: any[] = [];

  // Define static feature categories (Adjust as needed)
  featureList = [
    { name: 'Platform Support', key: 'platformSupport' },
    { name: 'Animation', key: 'animation' },
    { name: 'Free Trial', key: 'freeTrial' },
    { name: 'Price', key: 'price' }
  ];
}
