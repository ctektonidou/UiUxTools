import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MyFavoritesComponent } from "./my-favorites.component";

const routes: Routes = [
    { path: '', component: MyFavoritesComponent }
];

@NgModule({
    declarations: [MyFavoritesComponent],
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [MyFavoritesComponent]
})
export class MyFavoritesModule { }
