import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authGuard } from './shared/guards/auth.guard';
import { ToolManagementComponent } from './tool-management/tool-management.component';
import { CompareToolsComponent } from './compare-tools/compare-tools.component';
import { CreateEditToolComponent } from './create-edit-tool/create-edit-tool.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' }, // Fix auto-redirect issue
  { path: 'search', component: SearchComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'admin/tools', component: ToolManagementComponent, canActivate: [authGuard] },
  { path: 'compare', component: CompareToolsComponent },
  { path: 'tools/create', component: CreateEditToolComponent, canActivate: [authGuard] },
  { path: 'tools/:id/edit', component: CreateEditToolComponent, canActivate: [authGuard] },
  // { path: 'tools/:id/display', component: ToolDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
