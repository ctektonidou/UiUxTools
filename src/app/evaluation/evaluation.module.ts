import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EvaluationComponent } from "./evaluation.component";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

const routes: Routes = [
    { path: '', component: EvaluationComponent }
];

@NgModule({
    declarations: [EvaluationComponent],
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [EvaluationComponent]
})
export class EvaluationModule { }
