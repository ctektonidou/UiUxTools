import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "./search.component";
import { SearchItemComponent } from "./search-item/search-item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

const routes: Routes = [
    { path: '', component: SearchComponent }
];

@NgModule({
    declarations: [SearchComponent, SearchItemComponent],
    imports: [
        MatButtonModule,
        RouterModule,
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCheckboxModule
    ],
    exports: [SearchComponent]
})
export class SearchModule { }
