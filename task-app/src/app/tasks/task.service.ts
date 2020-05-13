import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs/';
import { catchError } from 'rxjs/operators';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private domainName = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}
  
  /**
   * Get all tasks
   */
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.domainName}/get-tasks`).pipe(
      catchError(this.handleError<Task[]>('getTasks', []))
    );
  }

  /**
   * Get an existing task by it's id
   * @param id - ObjectId of task
   */
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.domainName}/get-task/${id}`).pipe(
      catchError(this.handleError<Task>(`getTask id:${id}`))
      );
  }

  /**
   * Add a new task
   * @param taskDto - the object sent with task details
   */
  addTask(taskDto: Task): Observable<Task> {
    return this.http.post<Task>(`${this.domainName}/add-task`, taskDto, this.httpOptions).pipe(
      catchError(this.handleError<Task>(`addTask name:${taskDto.name}`))
    );
  }

  /**
   * Update an existing task
   * TODO: Update any type
   * @param taskDto - the object sent with task details
   */
  updateTask(taskDto: Task): Observable<any> {
    return this.http.put<Task>(`${this.domainName}/update-task`, taskDto, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /**
   * Delete an existing class by it's id
   * TODO: Update any type
   * @param id - ObjectId of task
   */
  deleteTaskById(id: string): Observable<any> {
    return this.http.delete<Task>(`${this.domainName}/delete-task/${id}`).pipe(
      catchError(this.handleError<Task>(`deleteTask id:${id}`))
    );
  }

  /**
   * Delete all exisiting tasks
   * TODO: Update any type
   */
  deleteAllTasks(): Observable<any> {
    return this.http.delete<Task[]>(`${this.domainName}/delete-all-tasks`).pipe(
      catchError(this.handleError<Task[]>('deleteAllTasks'))
    );
  }

  /**
   * Handle HTTP failures and allow the app to continue to run
   * @param operation - name of the operation that failed
   * @param result  - optional value to return as the Observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
