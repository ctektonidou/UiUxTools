import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authGuard } from './shared/guards/auth.guard';
import { ToolManagementComponent } from './tool-management/tool-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' }, // Fix auto-redirect issue
  { path: 'search', component: SearchComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'admin/tools', component: ToolManagementComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
