import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllToolsResponse } from "../interfaces/get-all-tools";
import { User } from "../interfaces/user";

export interface Tool {
    id?: string;
    name: string;
    description: string;
    imageUrl?: string;
    targetAudience: string;
    platformSupport: string;
    pricingModel: string;
    useCases: string;
    animation: boolean;
    wireframing: boolean;
    productLink: string;
}

@Injectable({
    providedIn: 'root'
})
export class ToolService {
    // private apiUrl = 'https://your-api-url.com/tools'; // Replace with actual API
    private apiUrl = 'http://localhost:8081/api';

    constructor(private http: HttpClient) { }

    // Get a tool by ID
    getToolById(id: string): Observable<Tool> {
        return this.http.get<Tool>(`${this.apiUrl}/${id}`);
    }

    // Create a new tool
    createTool(tool: Tool): Observable<Tool> {
        return this.http.post<Tool>(this.apiUrl, tool);
    }

    // Update an existing tool
    updateTool(id: string, tool: Tool): Observable<Tool> {
        return this.http.put<Tool>(`${this.apiUrl}/${id}`, tool);
    }

    // Delete a tool
    deleteTool(toolId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${toolId}`);
    }

    getAllTools(): Observable<GetAllToolsResponse[]> {
        return this.http.get<GetAllToolsResponse[]>(`${this.apiUrl}/tools`);
    }

    getUser(userId: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/user/${userId}`);
    }

    getUserId(email: string): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/user/userId`, email);
    }
}