import { NgModule } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SearchComponent } from "./search.component";
import { SearchItemComponent } from "./search-item/search-item.component";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
    { path: '', component: SearchComponent }
  ];

@NgModule({
    declarations: [SearchComponent, SearchItemComponent],
    imports: [
        MatButtonModule,
        RouterModule,
        CommonModule,
        FormsModule
    ],
    exports: [SearchComponent]
})
export class SearchModule { }
