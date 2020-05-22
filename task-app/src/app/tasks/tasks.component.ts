import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Location } from '@angular/common';
import { TaskService } from './task.service';
import { DailyPlannerService } from '../daily-planner/daily-planner.service';
import { Task } from './task';
import { formatDate } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  dateAndTime: any = { date: new Date(), startTime: 1, endTime: 2 };

  constructor(
    private taskService: TaskService,
    private dailyPlannerService: DailyPlannerService,
    private location: Location,
    @Inject(LOCALE_ID) private locale: string,
    public dialog: MatDialog
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
    this.addTaskToDailyPlanner();
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

  async addTaskToDailyPlanner(): Promise<void> {
    // Figure out how to make month 0 indexed
    this.dateAndTime.date = this.transformDate(this.dateAndTime.date);
    // this.dateAndTime.date = this.dateAndTime.date.split('-')[0] 
    console.log('date', this.dateAndTime);
    await this.dailyPlannerService.getDailyPlannerByDate(this.dateAndTime.date).subscribe((dailyPlanner) => {
      if (dailyPlanner) {
        // if (dailyPlanner.taskMap) {
        //   console.log('map', dailyPlanner.taskMap);
        //   console.log('type', typeof dailyPlanner.taskMap);
        //   dailyPlanner.taskMap.set(this.selectedTask._id, `${this.dateAndTime.startTime}-${this.dateAndTime.endTime}`);
        // }
        // else {
        //   dailyPlanner.taskMap = new Map();
        //   dailyPlanner.taskMap.set(this.selectedTask._id, `${this.dateAndTime.startTime}-${this.dateAndTime.endTime}`);
        // }

        dailyPlanner.taskMap = new Map();
        dailyPlanner.taskMap.set(this.selectedTask._id, `${this.dateAndTime.startTime}-${this.dateAndTime.endTime}`);
        // console.log('dp', dailyPlanner);
        const dp = dailyPlanner;
        this.dailyPlannerService.updateDailyPlanner(dp).subscribe((updatedDailyPlanner) => {
          console.log('Updated daily planner', updatedDailyPlanner);
          
        })
      }
    });
  }

  transformDate(date): string {
    let formattedDate = formatDate(date, 'MM-dd-yyyy', this.locale);
    const formattedDateArray = formattedDate.split('-');
    formattedDateArray[0] = (parseInt(formattedDateArray[0]) - 1).toString();
    formattedDate = formattedDateArray.join('-');
    
    return formattedDate;
  }

  openTask(task: Task): void {
    const dialogRef = this.dialog.open(DialogOverviewTask, {
      width: '250px',
      data: task
    });
  }
}

@Component({
  selector: 'dialog-overview-task-dialog',
  templateUrl: 'dialog-overview-task-dialog.html'
})
export class DialogOverviewTask {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewTask>,
    @Inject(MAT_DIALOG_DATA) public task: Task
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
