import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { BaseResponseInterface } from '../interfaces/base-response.interface';
import { Task } from '../interfaces/task.interface';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private apiUrl = `${environment.apiUrl}/tasks`;

    constructor(private http: HttpClient) {}

    getTasks(): Observable<BaseResponseInterface<Task[]>> {
        return this.http.get<BaseResponseInterface<Task[]>>(this.apiUrl);
    }

    addTask(title: string): Observable<BaseResponseInterface<Task>> {
        return this.http.post<BaseResponseInterface<Task>>(this.apiUrl, {
            title,
            completed: false,
        });
    }

    updateTask(id: number, completed: boolean): Observable<BaseResponseInterface<Task>> {
        return this.http.patch<BaseResponseInterface<Task>>(`${this.apiUrl}/${id}`, { completed });
    }

    deleteTask(id: number): Observable<BaseResponseInterface<{ deletedCount: number }>> {
        return this.http.delete<BaseResponseInterface<{ deletedCount: number }>>(
            `${this.apiUrl}/${id}`,
        );
    }
}
