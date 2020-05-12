import { Component } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-app';
  tasks = [];

  constructor(public taskService: TaskService) {
    this.getTasks();
  }

  async getTasks() {
    console.log('hi');
    await this.taskService.getAllTasks().subscribe((results) => {
      console.log('data', results);
      this.tasks = results;
    });
    
  }
}
