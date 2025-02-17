import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
    private apiUrl = 'https://your-api-url.com/tools'; // Replace with actual API

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
    deleteTool(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}