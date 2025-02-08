import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';

// Import your components here
// import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: SearchComponent }, // Default route
  { path: 'search', component: SearchComponent }, // Login route
  //   { path: 'dashboard', component: DashboardComponent }, // Protected dashboard route
  //   { path: '**', component: NotFoundComponent }, // 404 Not Found route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
