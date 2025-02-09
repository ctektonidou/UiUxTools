import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserProfileComponent } from "./user-profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";

const routes: Routes = [
    { path: '', component: UserProfileComponent }
];

@NgModule({
    declarations: [UserProfileComponent],
    imports: [        
        RouterModule.forChild(routes),
        RouterModule,
        CommonModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatDialogModule
    ],
    exports: [UserProfileComponent]
})
export class UserProfileModule { }
