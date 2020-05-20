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
  times: Number[] = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  constructor(
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  /**
   * Get all tasks
   */
  async getTasks(): Promise<void> {
    await this.taskService.getAllTasks().subscribe((tasks) => {
      console.log(`Tasks: ${JSON.stringify(tasks, null, 2)}`);
      this.tasks = tasks;
    });
  }

  /**
   * Get a specific task by id
   * @param id - id of task
   */
  async getTask(id: string): Promise<void> {
    await this.taskService.getTaskById(id).subscribe((task) => {
      console.log(`Task: ${JSON.stringify(task, null, 2)}`);

      this.task = task;
    })
  }

  /**
   * Can only add a task with name
   * TODO: Update to inlcude all fields
   * @param name 
   */
  add(name: string): void {
    if (!name) return;

    this.taskService.addTask({ name } as Task)
      .subscribe((newTask) => {
        console.log(`Inserted Task: ${JSON.stringify(newTask, null, 2)}`);

        this.tasks.push(newTask);
        this.location.go('/tasks'); // Hack for now to reload page
      });
  }

  /**
   * Save an exisitng task
   */
  save(): void {
    this.taskService.updateTask(this.selectedTask)
      .subscribe((updatedTask) => {
        console.log(`Updated Task: ${JSON.stringify(updatedTask, null, 2)}`);
      });
  }

  /**
   * Delete an existing task
   * @param id - id of task to be deleted
   */
  delete(id: string): void {
    this.tasks = this.tasks.filter(t => t._id != id); // Remove task from current array of tasks
    
    this.taskService.deleteTaskById(id)
      .subscribe((deletedTask) => {
        console.log(`Deleted Task: ${JSON.stringify(deletedTask, null, 2)}`);

        this.location.go('/tasks'); 
      });
  }

  /**
   * Set the selected task to display full task detials
   * @param task - selected task by user
   */
  onSelectTask(task: Task): void {
    this.selectedTask = task;
  }
}
