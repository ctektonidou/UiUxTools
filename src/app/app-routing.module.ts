import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ToolManagementComponent } from './tool-management/tool-management.component';
import { CompareToolsComponent } from './compare-tools/compare-tools.component';
import { CreateEditToolComponent } from './create-edit-tool/create-edit-tool.component';
import { ToolDisplayComponent } from './tool-display/tool-display.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' }, // Fix auto-redirect issue
  { path: 'search', component: SearchComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]  },
  { path: 'admin/tools', component: ToolManagementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'compare', component: CompareToolsComponent },
  { path: 'tools/create', component: CreateEditToolComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'tools/:id/edit', component: CreateEditToolComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'tools/:id/display', component: ToolDisplayComponent },
  { path: 'my-reviews', component: MyReviewsComponent, canActivate: [AuthGuard]  },
  { path: 'my-favorites', component: MyFavoritesComponent, canActivate: [AuthGuard]  },
  { path: '**', redirectTo: 'search', pathMatch: 'full' }, // Redirect unknown routes to search
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
