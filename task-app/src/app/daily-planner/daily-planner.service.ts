import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs/';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DailyPlanner } from './daily-planner';

@Injectable({
  providedIn: 'root'
})
export class DailyPlannerService {
  private domainName: string = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  /**
   * Get all daily planners
   */
  getAllDailyPlanners(): Observable<DailyPlanner[]> {
    return this.http.get<DailyPlanner[]>(`${this.domainName}/get-daily-planners`).pipe(
      catchError(this.handleError<DailyPlanner[]>('getDailyPlanners', []))
    );
  }

  /**
   * Get an existing daily planner by it's id
   * @param id ObjectId of daily planner
   */
  getDailyPlannerById(id: string): Observable<DailyPlanner> {
    return this.http.get<DailyPlanner>(`${this.domainName}/get-daily-planner/${id}`).pipe(
      catchError(this.handleError<DailyPlanner>(`getDailyPlanner id:${id}`))
    );
  }

  /**
   * Add a new daily planner
   * @param dailyPlannerDto the object sent with daily planner details
   */
  addDailyPlanner(dailyPlannerDto: DailyPlanner): Observable<DailyPlanner> {
    return this.http.post<DailyPlanner>(`${this.domainName}/add-daily-planner`, dailyPlannerDto, this.httpOptions).pipe(
      catchError(this.handleError<DailyPlanner>(`addDailyPlanner date:${dailyPlannerDto.date}`))
    );
  }

  /**
   * Update an existing daily planner
   * @param dailyPlannerDto the object sent with daily planner details
   */
  updateTask(dailyPlannerDto: DailyPlanner): Observable<DailyPlanner> {
    return this.http.put<DailyPlanner>(`${this.domainName}/update-daily-planner`, dailyPlannerDto, this.httpOptions).pipe(
      catchError(this.handleError<DailyPlanner>(`updateDailyPlanner date:${dailyPlannerDto.date}`))
    );
  }

  /**
   * Delete an existing daily planner by it's id
   * @param id ObjectId of daily planner
   */
  deleteDailyPlannerById(id: string): Observable<DailyPlanner> {
    return this.http.delete<DailyPlanner>(`${this.domainName}/delete-daily-planner/${id}`).pipe(
      catchError(this.handleError<DailyPlanner>(`deleteDailyPlanner id:${id}`))
    );
  }

  deleteAllDailyPlanners(): Observable<any> {
    return this.http.delete<DailyPlanner[]>(`${this.domainName}/delete-all-daily-planners`).pipe(
      catchError(this.handleError<DailyPlanner[]>('deleteDailyPlanners'))
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
