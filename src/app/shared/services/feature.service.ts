import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllToolsResponse, Tool } from "../interfaces/get-all-tools";
import { User } from "../interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class FeatureService {
    private featureGroupUrl = 'http://localhost:8081/api/feature/group';
    private featureItemUrl = 'http://localhost:8081/api/feature/item';

    constructor(private http: HttpClient) { }

    // Fetch all feature groups
    getFeatureGroups(): Observable<any[]> {
        return this.http.get<any[]>(`${this.featureGroupUrl}`);
    }

    // Fetch all feature items by feature group ID
    getFeatureItemsByGroup(featureGroupId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.featureItemUrl}`, { params: { featureGroupId } });
    }

}