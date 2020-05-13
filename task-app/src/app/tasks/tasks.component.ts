import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TaskService } from './task.service';
import { Task } from './task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  task: Task;
  tasks: Task[];
  selectedTask: Task;

  constructor(
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  async getTasks(): Promise<void> {
    await this.taskService.getAllTasks().subscribe((results) => {
      console.log('data', results);
      this.tasks = results;
    });
  }

  async getTask(id: string): Promise<void> {
    await this.taskService.getTaskById(id).subscribe((results) => {
      console.log('data', results);
      this.task = results;
    })
  }

  add(name: string): void {
    if (!name) return;

    this.taskService.addTask({ name } as Task)
      .subscribe((task) => {
        console.log('New task sent to server', task);
        this.tasks.push(task);
        this.location.go('/tasks'); // Hack for now to reload page
      });
  }

  save(): void {
    this.taskService.updateTask(this.selectedTask)
      .subscribe(() => console.log('Updated task sent to server'));
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter(t => t._id != id);
    this.taskService.deleteTaskById(id)
      .subscribe(() => {
        console.log(`Sent task with ${id} to be deleted`)
        this.location.go('/tasks'); 
      });
  }

  onSelectTask(task: Task): void {
    this.selectedTask = task;
  }

}
