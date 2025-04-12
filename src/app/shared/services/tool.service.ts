import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllToolsResponse, Tool } from "../interfaces/get-all-tools";
import { User } from "../interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class ToolService {
    private apiUrl = 'http://localhost:8081/api';

    constructor(private http: HttpClient) { }

    // Create a new tool
    createTool(formData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/tools`, formData);
    }

    updateTool(id: string, toolData: any) {
        return this.http.put(`${this.apiUrl}/tools/${id}`, toolData);
    }

    // Delete a tool
    deleteTool(toolId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/tools/${toolId}`);
    }

    //Get All Tools
    getAllTools(): Observable<GetAllToolsResponse[]> {
        return this.http.get<GetAllToolsResponse[]>(`${this.apiUrl}/tools`);
    }

    //Get User
    getUser(userId: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/user?userId=${userId}`);
    }

    //Update User
    updateUser(userId: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/user/${userId}`, user);
    }

    // Create User
    createUser(user: Partial<User>): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/user`, user);
    }

    //get tools for compare
    getToolsByIds(toolIds: number[]): Observable<Tool[]> {
        return this.http.post<Tool[]>(`${this.apiUrl}/tools/batch`, toolIds);
    }

    //get tools; details for compare
    getToolComparison(toolIds: number[]): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/tools/compare`, toolIds);
    }

    //search tools
    getToolsByFeatureItems(ids: number[]): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/tools/searchByFeatures`, ids);
    }

    //tool display
    getToolWithDetails(id: number) {
        return this.http.get<any>(`${this.apiUrl}/tools/${id}/details`);
    }

    getToolById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/tools/${id}/edit`);
    }
}