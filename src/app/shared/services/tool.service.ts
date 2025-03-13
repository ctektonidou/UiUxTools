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
        console.log("Sending toolIds to API:", JSON.stringify(toolIds)); // Debugging
        return this.http.post<any>(`${this.apiUrl}/tools/compare`, toolIds);
    }
}