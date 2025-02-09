import { Component, Input, Output } from '@angular/core';
import { SearchItem } from '../../shared/models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent {
  @Input() item!: SearchItem;
  // @Output() item!: SearchItem;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  goToTool(item: SearchItem) {
    //na mpei emit pou na pernaei to item ston mpampa search
  }
}
