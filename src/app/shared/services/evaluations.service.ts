import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubmitReviewRequest } from "../interfaces/review";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EvaluationsService {
    // private apiUrl = 'http://localhost:8081/api';
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getReviewsByToolId(toolId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/evaluation?toolId=${toolId}`);
    }

    submitReview(evaluation: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/evaluation`, evaluation);
    }

    deleteEvaluation(id: number) {
        return this.http.delete(`${this.apiUrl}/evaluation/${id}`);
    }

    updateReview(id: number, review: SubmitReviewRequest) {
        return this.http.put(`${this.apiUrl}/evaluation/${id}`, review);
    }

    getReviewsByUserId(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/evaluation/user/${userId}`);
    }
}