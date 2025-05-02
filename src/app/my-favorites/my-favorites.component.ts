import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteToolsService } from '../shared/services/favorite-tools.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss']
})
export class MyFavoritesComponent implements OnInit {
  favorites: any[] = [];
  environment = environment;

  constructor(private favoriteService: FavoriteToolsService, private router: Router) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.favoriteService.getFavoritesByUser(userId).subscribe((res: any) => {
      this.favorites = res;
    });
  }

  goToTool(tool: any) {
    this.router.navigate([`/tools/${tool.toolId}/display`]);
  }
}
