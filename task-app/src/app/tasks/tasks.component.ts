import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task;

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  async getTasks(): Promise<void> {
    console.log('hi');
    await this.taskService.getAllTasks().subscribe((results) => {
      console.log('data', results);
      this.tasks = results;
    });
  }

  add(name: string): void {
    if (!name) return;

    this.taskService.addTask({ name } as Task)
      .subscribe((task) => {
        console.log('New task sent to server');
        this.tasks.push(task);
      });
  }

  save(): void {
    this.taskService.updateTask(this.selectedTask)
      .subscribe(() => console.log('Updated task sent to server'));
  }

  onSelectTask(task: Task): void {
    this.selectedTask = task;
  }

}
