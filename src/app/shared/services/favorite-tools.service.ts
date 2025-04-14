import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteToolsService {
  private baseUrl = 'http://localhost:8081/api/favorites';

  constructor(private http: HttpClient) {}

  getFavoritesByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  isFavorite(userId: number, toolId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check?userId=${userId}&toolId=${toolId}`);
  }   

  addFavorite(userId: number, toolId: number): Observable<any> {
    return this.http.post(this.baseUrl, { userId, toolId });
  }

  removeFavorite(userId: number, toolId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}?userId=${userId}&toolId=${toolId}`);
  }
}