import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Import routing module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

// Import components
import { AppComponent } from './app.component';
import { FooterModule } from './footer/footer.module';
import { TopMenuModule } from './top-menu/top-menu.module';
import { SearchModule } from './search/search.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterModule } from './register/register.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { DecisionPopupModule } from './decision-popup/decision-popup.module';
import { ToolManagementModule } from './tool-management/tool-management.module';
import { CompareToolsModule } from './compare-tools/compare-tools.module';
import { CreateEditToolModule } from './create-edit-tool/create-edit-tool.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Register routes
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FooterModule,
    TopMenuModule,
    SearchModule,
    BrowserAnimationsModule,
    RegisterModule,
    EvaluationModule,
    UserProfileModule,
    DecisionPopupModule,
    ToolManagementModule,
    CompareToolsModule,
    CreateEditToolModule,

    // Material Modules
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

