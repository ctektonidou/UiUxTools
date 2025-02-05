import { NgModule } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TopMenuComponent } from "./top-menu.component";
import { MatToolbarModule } from "@angular/material/toolbar";

const routes: Routes = [
    { path: '', component: TopMenuComponent }
  ];

@NgModule({
    declarations: [TopMenuComponent],
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        RouterModule,
        CommonModule
    ],
    exports: [TopMenuComponent]
})
export class TopMenuModule { }
