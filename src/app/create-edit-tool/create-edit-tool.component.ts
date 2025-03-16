import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolService } from '../shared/services/tool.service';
import { FeatureService } from '../shared/services/feature.service';

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
  featureItems: { [key: number]: any[] } = {}; // Stores feature items by group ID

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private toolService: ToolService,
    private featureService: FeatureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
      description: [''],
      productLink: ['', Validators.required],
      imageUrl: [''],
      featureSelections: this.fb.group({})
    });
  }

  loadFeatureGroups(): void {
    this.featureService.getFeatureGroups().subscribe(groups => {
      this.featureGroups = groups;
  
      // Ensure featureSelections is a FormGroup
      const featureSelectionsForm = this.toolForm.get('featureSelections') as FormGroup;
  
      this.featureGroups.forEach(group => {
        featureSelectionsForm.addControl(group.id, this.fb.control(''));
        this.loadFeatureItems(group.id);
      });
    });
  }

  loadFeatureItems(featureGroupId: number): void {
    this.featureService.getFeatureItemsByGroup(featureGroupId).subscribe((items: any) => {
      this.featureItems[featureGroupId] = items;
    });
  }

  loadToolData(): void {
    this.toolService.getToolById(this.toolId).subscribe(tool => {
      this.toolForm.patchValue(tool);
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.toolService.updateTool(this.toolId, this.toolForm.value).subscribe(() => {
        alert('Το εργαλείο ενημερώθηκε με επιτυχία!');
        this.router.navigate(['/tools', this.toolId, 'display']);
      });
    } else {
      this.toolService.createTool(this.toolForm.value).subscribe(response => {
        alert('Το εργαλείο δημιουργήθηκε με επιτυχία!');
        this.router.navigate(['/tools', response.toolId, 'display']);
      });
    }
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
      const reader = new FileReader();
      reader.onload = () => {
        this.toolForm.patchValue({ imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
}