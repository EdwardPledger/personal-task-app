import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

export interface Task {
  _id: String,
  actualTime: Number,
  name: String,
  description: String,
  estimatedTime: Number,
}

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/get-tasks');
  }
}
