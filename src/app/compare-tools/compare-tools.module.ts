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
import { CompareToolsComponent } from "./compare-tools.component";

const routes: Routes = [
    { path: '', component: CompareToolsComponent }
];

@NgModule({
    declarations: [CompareToolsComponent],
    imports: [
        MatButtonModule,
        RouterModule,
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatIconModule,
        MatSnackBarModule
    ],
    exports: [CompareToolsComponent]
})
export class CompareToolsModule { }
