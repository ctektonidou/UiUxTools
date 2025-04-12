import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tool } from "../interfaces/get-all-tools";

@Injectable({
    providedIn: 'root'
})
export class EvaluationsService {
    private apiUrl = 'http://localhost:8081/api';

    constructor(private http: HttpClient) { }

    getReviewsByToolId(toolId: number): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:8081/api/evaluation?toolId=${toolId}`);
    }

    submitReview(evaluation: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/evaluation`, evaluation);
      }      

}