import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MyReviewsComponent } from "./my-reviews.component";

const routes: Routes = [
    { path: '', component: MyReviewsComponent }
];

@NgModule({
    declarations: [MyReviewsComponent],
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [MyReviewsComponent]
})
export class MyReviewsModule { }
