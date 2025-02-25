import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CreateEditToolComponent } from "./create-edit-tool.component";
import { OverlayModule } from "@angular/cdk/overlay";

const routes: Routes = [
    { path: '', component: CreateEditToolComponent }
];

@NgModule({
    declarations: [CreateEditToolComponent],
    imports: [
        MatButtonModule,
        RouterModule,
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatIconModule
    ],
    exports: [CreateEditToolComponent]
})
export class CreateEditToolModule { }
