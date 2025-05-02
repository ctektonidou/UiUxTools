import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeatureService } from '../shared/services/feature.service';
import { ToolService } from '../shared/services/tool.service';
import { SearchItem } from '../shared/models/search-item.model';
import { PassCompareListService } from '../shared/services/pass-compare-list.service';
import { Router } from '@angular/router';
import { FavoriteToolsService } from '../shared/services/favorite-tools.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  featureGroups: any[] = [];
  featureItems: { [key: number]: any[] } = {}; // Store feature items by group ID
  selectedFeatureItems: number[] = []; // Store selected feature item IDs

  searchResults: SearchItem[] = [];
  filteredResults: SearchItem[] = [];

  showCompare: boolean = false;
  loadedResults: boolean = false;
  favoriteToolIds: number[] = [];
  featuresLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private featureService: FeatureService,
    private toolService: ToolService,
    private passCompareListService: PassCompareListService,
    private router: Router,
    private favoriteService: FavoriteToolsService
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadFeatureGroups();
    this.search(); // Fetch all tools when the page loads
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.favoriteService.getFavoritesByUser(userId).subscribe(favorites => {
        this.favoriteToolIds = favorites.map(fav => fav.toolId);
      });
    }
    this.passCompareListService.selectedCompareList$.subscribe(list => {
      this.showCompare = list.length > 0;
    });
  }

  initForm() {
    this.searchForm = this.fb.group({
      searchQuery: [''],
      featureSelections: this.fb.group({})
    });
  }

  loadFeatureGroups(): void {
    this.featureService.getFeatureGroups().subscribe(groups => {
      this.featureGroups = groups;

      // Ensure featureSelections is a FormGroup
      const featureSelectionsForm = this.searchForm.get('featureSelections') as FormGroup;

      this.featureGroups.forEach(group => {
        // Add controls dynamically to the featureSelections form group
        featureSelectionsForm.addControl(group.id.toString(), this.fb.control(''));
        this.loadFeatureItems(group.id);
      });
    });
  }

  loadFeatureItems(featureGroupId: number): void {
    this.featureService.getFeatureItemsByGroup(featureGroupId).subscribe(items => {
      this.featureItems[featureGroupId] = items;
      this.featuresLoaded = true;
    });
  }

  onFeatureSelect(): void {
    const featureSelections = this.searchForm.get('featureSelections')?.value || {};

    this.selectedFeatureItems = Object.values(featureSelections)
      .filter(value => value && value !== '') // Remove empty values
      .map(value => Number(value)) // Convert valid selections to numbers
      .filter(value => !isNaN(value)); // Ensure only numbers are included
  }

  search(): void {
    this.loadedResults = false;
  
    // Send an empty list if no filters are selected to get all tools
    const featureIds = this.selectedFeatureItems.length > 0 ? this.selectedFeatureItems : [];
  
    this.toolService.getToolsByFeatureItems(featureIds).subscribe((tools: any) => {
      this.searchResults = tools.map((tool: any) => ({
        id: tool.toolId,
        name: tool.toolName,
        logo: tool.image,
        rating: tool.finalRating,
        reviews: tool.reviewCount
      }));
      this.filteredResults = this.searchResults;
      this.loadedResults = true;
    });
  }  

  filterResults() {
    const query = this.searchForm.value.searchQuery.toLowerCase();
    this.filteredResults = this.searchResults.filter(tool =>
      tool.name.toLowerCase().includes(query)
    );
  }

  resetFilters(): void {
    this.searchForm.reset();
    this.selectedFeatureItems = [];
    this.search(); // Calls search() with an empty filter to fetch all tools
  }  

  goToCompare() {
    this.router.navigate(['/compare']);
  }

  onCompareListChanged(updatedList: SearchItem[]) {
    this.showCompare = updatedList.length > 0;
  } 
  
}
