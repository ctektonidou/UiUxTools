// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module'; // Import routing module
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

// // Angular Material Modules
// import { MatButtonModule } from '@angular/material/button';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatInputModule } from '@angular/material/input';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatDialogModule } from '@angular/material/dialog';

// // Import components
// import { AppComponent } from './app.component';
// import { SearchComponent } from './search/search.component';
// import { FooterComponent } from './footer/footer.component';
// import { FooterModule } from './footer/footer.module';


// @NgModule({
//   declarations: [
//     AppComponent,
//     SearchComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule, // Register routes
//     FormsModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     FooterModule,

//     // Material Modules
//     MatButtonModule,
//     MatToolbarModule,
//     MatIconModule,
//     MatCardModule,
//     MatInputModule,
//     MatSnackBarModule,
//     MatDialogModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FooterModule } from './footer/footer.module'; // ✅ Import FooterModule

@NgModule({
  declarations: [
    AppComponent // ✅ Do NOT declare FooterComponent here!
  ],
  imports: [
    BrowserModule,
    FooterModule // ✅ Import FooterModule instead
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

