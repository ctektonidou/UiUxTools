import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolService, Tool } from '../shared/services/tool.service';

@Component({
  selector: 'app-create-edit-tool',
  templateUrl: './create-edit-tool.component.html',
  styleUrl: './create-edit-tool.component.scss'
})
export class CreateEditToolComponent implements OnInit {
  toolForm!: FormGroup;
  isEditMode = false;
  toolId!: string;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private toolService: ToolService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      this.toolId = params.get('id') || '';
      this.isEditMode = !!this.toolId;

      if (this.isEditMode) {
        this.loadToolData();
      }
    });
  }

  // Initialize the form
  initForm(): void {
    this.toolForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      productLink: ['', Validators.required],
      imageUrl: [''],
      targetAudience: [''],
      platformSupport: [''],
      pricingModel: [''],
      useCases: [''],
      animation: [false],
      wireframing: [false]
    });
  }

  // Load Tool Data for Editing
  loadToolData(): void {
    this.toolService.getToolById(this.toolId).subscribe(tool => {
      this.toolForm.patchValue(tool);
    });
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

  // Submit Form for Create or Update
  onSubmit(): void {
    if (this.isEditMode) {
      this.toolService.updateTool(this.toolId, this.toolForm.value).subscribe(() => {
        alert('Το εργαλείο ενημερώθηκε με επιτυχία!');
        this.router.navigate(['/tools', this.toolId, 'display']);
      });
    } else {
      this.toolService.createTool(this.toolForm.value).subscribe(response => {
        alert('Το εργαλείο δημιουργήθηκε με επιτυχία!');
        this.router.navigate(['/tools', response.id, 'display']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/search']);
  }
}