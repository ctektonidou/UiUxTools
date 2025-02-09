import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DecisionPopupComponent } from "./decision-popup.component";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogContent } from "@angular/material/dialog";

const routes: Routes = [
    { path: '', component: DecisionPopupComponent }
  ];

@NgModule({
    declarations: [DecisionPopupComponent],
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDialogContent
    ],
    exports: [DecisionPopupComponent]
})
export class DecisionPopupModule { }
