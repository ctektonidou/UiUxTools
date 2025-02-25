import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { UserReviewsComponent } from "./user-reviews.component";
import { UserReviewItemComponent } from "./user-review-item/user-review-item.component";

const routes: Routes = [
    { path: '', component: UserReviewsComponent }
];

@NgModule({
    declarations: [UserReviewsComponent, UserReviewItemComponent],
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [UserReviewsComponent]
})
export class UserReviewsModule { }
