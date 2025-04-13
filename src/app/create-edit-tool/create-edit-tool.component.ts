import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolService } from '../shared/services/tool.service';
import { FeatureService } from '../shared/services/feature.service';
import { Tool } from '../shared/interfaces/get-all-tools';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DecisionPopupComponent } from '../decision-popup/decision-popup.component';
import { DecisionPopupType } from '../shared/enums/desicion-popup-type.enum';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-tool',
  templateUrl: './create-edit-tool.component.html',
  styleUrl: './create-edit-tool.component.scss'
})
export class CreateEditToolComponent implements OnInit {
  toolForm!: FormGroup;
  isEditMode = false;
  toolId!: string;
  featureGroups: any[] = [];
  featureItems: { [key: number]: any[] } = {}; // Store feature items by group ID
  selectedFile: File | null = null;
  imageRequiredError: boolean = false;
  dropdownStates: { [key: number]: boolean } = {}; // Store dropdown open/close state
  imageBase64: string | null = null; // Store Base64 image
  singleSelectionGroupIds: number[] = []; //Store One Value Filters

  toggleDropdown(groupId: number): void {
    this.dropdownStates[groupId] = !this.dropdownStates[groupId]; // Toggle state
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private toolService: ToolService,
    private featureService: FeatureService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadFeatureGroups();
    this.route.paramMap.subscribe(params => {
      this.toolId = params.get('id') || '';
      this.isEditMode = !!this.toolId;
      if (this.isEditMode) {
        this.loadToolData();
      }
    });
  }

  initForm(): void {
    this.toolForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      productLink: ['', Validators.required],
      imageUrl: ['', Validators.required],
      featureSelections: this.fb.group({})
    });
  }

  loadFeatureGroups(): void {
    this.featureService.getFeatureGroups().subscribe(groups => {
      this.featureGroups = groups;
      const featureSelectionsForm = this.toolForm.get('featureSelections') as FormGroup;

      let loaded = 0;
      const totalGroups = groups.length;

      this.featureGroups.forEach(group => {
        featureSelectionsForm.addControl(group.id.toString(), new FormControl([]));

        this.loadFeatureItems(group.id, () => {
          loaded++;
          if (loaded === totalGroups && this.isEditMode) {
            this.loadToolData();
          }
        });
      });
    });
  }


  loadFeatureItems(featureGroupId: number, callback?: () => void): void {
    this.featureService.getFeatureItemsByGroup(featureGroupId).subscribe((items: any) => {
      this.featureItems[featureGroupId] = items;
      // Detect if this group is Yes/No only
      const itemNames = items.map((item: any) => item.name.toLowerCase().trim());
      if (
        itemNames.length === 2 &&
        itemNames.includes('yes') &&
        itemNames.includes('no')
      ) {
        this.singleSelectionGroupIds.push(featureGroupId);
      }
      if (callback) callback();
    });
  }

  isSingleSelection(groupId: number): boolean {
    return this.singleSelectionGroupIds.includes(groupId);
  }


  loadToolData(): void {
    this.toolService.getToolById(this.toolId).subscribe(tool => {
      this.toolForm.patchValue({
        name: tool.name,
        description: tool.description,
        productLink: tool.productLink,
        imageUrl: 'http://localhost:8081' + tool.image
      });

      // Set the selected features
      const featureSelectionsForm = this.toolForm.get('featureSelections') as FormGroup;
      const groupedByFeatureGroup: { [groupId: number]: number[] } = {};

      for (const featureItemId of tool.featureItemIds) {
        for (const groupId in this.featureItems) {
          if (this.featureItems[groupId].some(item => item.featureItemId === featureItemId)) {
            if (!groupedByFeatureGroup[groupId]) groupedByFeatureGroup[groupId] = [];
            groupedByFeatureGroup[groupId].push(featureItemId);
          }
        }
      }

      for (const groupId in groupedByFeatureGroup) {
        featureSelectionsForm.patchValue({ [groupId]: groupedByFeatureGroup[groupId] });
      }
    });
  }

  //Function to check if a feature item is selected
  isFeatureSelected(groupId: number, featureItemId: number): boolean {
    const featureSelections = this.toolForm.get('featureSelections')?.value || {};
    return featureSelections[groupId] ? featureSelections[groupId].includes(featureItemId) : false;
  }

  onFeatureSelect(groupId: number, featureItemId: number, isChecked: boolean): void {
    const featureSelectionsForm = this.toolForm.get('featureSelections') as FormGroup;

    if (this.isSingleSelection(groupId)) {
      const selectedItems = isChecked ? [featureItemId] : [];
      featureSelectionsForm.patchValue({ [groupId]: selectedItems });
    } else {
      let selectedItems: number[] = featureSelectionsForm.get(groupId.toString())?.value || [];

      if (isChecked) {
        selectedItems.push(featureItemId);
      } else {
        selectedItems = selectedItems.filter(id => id !== featureItemId);
      }

      featureSelectionsForm.patchValue({ [groupId]: selectedItems });
    }
  }

  onSubmit(): void {
    if (this.toolForm.invalid) return;

    const toolData = {
      name: this.toolForm.value.name,
      description: this.toolForm.value.description,
      productLink: this.toolForm.value.productLink,
      featureItemIds: Object.values(this.toolForm.value.featureSelections).flat(),
      image: this.imageBase64 || this.toolForm.value.imageUrl // preserve original if unchanged
    };

    const request = this.isEditMode
      ? this.toolService.updateTool(this.toolId, toolData)
      : this.toolService.createTool(toolData);

    request.subscribe({
      next: (response) => {
        this.snackBar.open(`Το εργαλείο ${this.isEditMode ? 'ενημερώθηκε' : 'δημιουργήθηκε'} με επιτυχία!`, undefined, {
          duration: 3000, // hide after 3 seconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        if (!this.isEditMode) {
          this.router.navigate(['/tools', response.toolId, 'display']);
        }
      },
      error: (err) => {
        this.dialog.open(DecisionPopupComponent, {
          width: '600px',
          data: {
            type: DecisionPopupType.INFO,
            title: 'Σφάλμα',
            message: 'Σφάλμα κατά την αποθήκευση του εργαλείου!'
          },
          panelClass: 'custom-dialog-container',
          backdropClass: 'custom-dialog-backdrop',
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/search']);
  }

  // Handle Image Upload
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string; // Store Base64 data
        this.toolForm.patchValue({ imageUrl: this.imageBase64 });
        this.toolForm.get('imageUrl')?.updateValueAndValidity();
        this.imageRequiredError = false; // Hide error
      };
      reader.readAsDataURL(file); // Convert to Base64
    } else {
      this.toolForm.patchValue({ imageUrl: '' });
      this.imageRequiredError = true; // Show error
    }
  }

  getFeatureSelectionControl(groupId: number): FormControl {
    return this.toolForm.get('featureSelections')?.get(groupId.toString()) as FormControl;
  }

  handleFeatureSelect(event: Event, groupId: number, featureItemId: number): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.onFeatureSelect(groupId, featureItemId, isChecked);
  }

  getSelectedFeatureNames(groupId: number): string {
    const selectedIds: number[] = this.toolForm.value.featureSelections[groupId] || [];
    const selectedNames = this.featureItems[groupId]
      ?.filter(item => selectedIds.includes(item.featureItemId))
      .map(item => item.name);

    return selectedNames.length ? selectedNames.join(', ') : '';
  }

}