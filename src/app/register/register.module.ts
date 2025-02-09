import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { RegisterComponent } from "./register.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    { path: '', component: RegisterComponent }
  ];

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        RouterModule.forChild(routes),
        RouterModule,
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],
    exports: [RegisterComponent]
})
export class RegisterModule { }
