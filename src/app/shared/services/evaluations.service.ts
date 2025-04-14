import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SubmitReviewRequest } from "../interfaces/review";

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

    deleteEvaluation(id: number) {
        return this.http.delete(`http://localhost:8081/api/evaluation/${id}`);
    }

    updateReview(id: number, review: SubmitReviewRequest) {
        return this.http.put(`http://localhost:8081/api/evaluation/${id}`, review);
    }

    getReviewsByUserId(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:8081/api/evaluation/user/${userId}`);
    }
}