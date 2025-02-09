import { Component } from '@angular/core';
import { SearchItem } from '../shared/models/search-item.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchResults: SearchItem[] = [
    { name: 'Figma', logo: 'assets/figma.png', rating: 4.7, reviews: 5 },
    { name: 'Adobe Photoshop', logo: 'assets/photoshop.png', rating: 4.6, reviews: 5 },
    { name: 'Draw.io', logo: 'assets/drawio.png', rating: 3.7, reviews: 15 },
    { name: 'Draw.io', logo: 'assets/drawio.png', rating: 3.7, reviews: 15 },
    { name: 'Draw.io', logo: 'assets/drawio.png', rating: 3.7, reviews: 15 }
  ];
  searchQuery: string = "";

  filteredResults: SearchItem[] = [...this.searchResults]; 

  ngOnInit() {

  }

  initForm() {

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

}