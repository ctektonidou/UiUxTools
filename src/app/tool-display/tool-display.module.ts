import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ToolDisplayComponent } from "./tool-display.component";
import { UserReviewsModule } from "../user-reviews/user-reviews.module";

const routes: Routes = [
    { path: '', component: ToolDisplayComponent }
];

@NgModule({
    declarations: [ToolDisplayComponent],
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        UserReviewsModule
    ],
    exports: [ToolDisplayComponent]
})
export class ToolDisplayModule { }
