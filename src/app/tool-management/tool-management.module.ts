import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ToolManagementComponent } from "./tool-management.component";
import { MatTooltipModule } from "@angular/material/tooltip";

const routes: Routes = [
    { path: '', component: ToolManagementComponent }
];

@NgModule({
    declarations: [ToolManagementComponent],
    imports: [
        MatButtonModule,
        RouterModule,
        CommonModule,
        MatTooltipModule
    ],
    exports: [ToolManagementComponent]
})
export class ToolManagementModule { }
