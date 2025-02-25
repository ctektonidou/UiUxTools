import { Component } from '@angular/core';
import { SearchItem } from '../shared/models/search-item.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PassCompareListService } from '../shared/services/pass-compare-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchForm!: FormGroup;

  searchResults: SearchItem[] = [
    { id: 1, name: 'Figma', logo: 'assets/figma.png', rating: 4.7, reviews: 5 },
    { id: 2, name: 'Adobe Photoshop', logo: 'assets/photoshop.png', rating: 4.6, reviews: 5 },
    { id: 3, name: 'Draw.io', logo: 'assets/drawio.png', rating: 3.7, reviews: 15 },
    { id: 4, name: 'Draw.io', logo: 'assets/drawio.png', rating: 3.7, reviews: 15 },
    { id: 5, name: 'Draw.io', logo: 'assets/drawio.png', rating: 3.7, reviews: 15 }
  ];
  targetOptions = ['All', 'Beginners', 'Professionals', 'Enterprises'];
  platformOptions = ['All', 'Web', 'Mobile', 'Desktop'];
  pricingOptions = ['All', 'Free', 'Paid', 'Subscription'];

  searchQuery: string = "";

  filteredResults: SearchItem[] = [...this.searchResults];
  showCompare: boolean = false;

  constructor(
    private fb: FormBuilder,
    private passCompareListService: PassCompareListService,
        private router: Router
  ) { }

  ngOnInit() {
    this.passCompareListService.selectedCompareList$.subscribe(list => {
      this.showCompare = list.length > 0;
    });
  }

  initForm() {
    this.searchForm = this.fb.group({
      searchQuery: [''],
      selectedTarget: ['All'],
      selectedPlatform: ['All'],
      selectedPricing: ['All'],
      useCaseAnimation: [false],
      useCaseWireframing: [false]
    });
  }

  getFilterLists() {

  }

  search() {

  }

  goToToolDisplay() {

  }

  // Method to filter results based on search query
  filterResults() {
    this.filteredResults = this.searchResults.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  //example using decision popup
  confirmDelete() {
    // const dialogRef = this.dialog.open(DecisionPopupComponent, {
    //   width: '400px',
    //   data: {
    //     type: DecisionPopupType.DELETE,
    //     title: 'Επιβεβαίωση Διαγραφής Εργαλείου',
    //     message: 'Είστε σίγουροι ότι θέλετε να διαγράψετε το εργαλείο;'
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Tool deleted!');
    //   } else {
    //     console.log('Deletion cancelled.');
    //   }
    // });
  }

  showCompareButton(data: any) {
    if (data) {
      this.showCompare = true;
    } else {
      this.showCompare = false;
    }
  }

  goToCompare() {
    this.router.navigate(['/compare']);
  }

}