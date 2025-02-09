import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DecisionPopupComponent } from "./decision-popup.component";

const routes: Routes = [
    { path: '', component: DecisionPopupComponent }
  ];

@NgModule({
    declarations: [DecisionPopupComponent],
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule
    ],
    exports: [DecisionPopupComponent]
})
export class DecisionPopupModule { }
