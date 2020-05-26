import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Location } from '@angular/common';
import { TaskService } from './task.service';
import { DailyPlannerService } from '../daily-planner/daily-planner.service';
import { Task } from './task';
import { formatDate } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'plus',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/iconmonstr-plus-circle-thin.svg')
    )
  }

  ngOnInit(): void {
    this.getTasks();
  }

  /**
   * CRUD methods
   */

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
  addTask(task: Task): void {
    if (!task.name) return;

    this.taskService.addTask(task)
      .subscribe((newTask) => {
        console.log(`Inserted Task: ${JSON.stringify(newTask, null, 2)}`);

        this.tasks.push(newTask);
        this.location.go('/tasks'); // Hack for now to reload page
      });
  }

    /**
   * Save an exisitng task
   */
  updateTask(task: Task): void {
    // this.addTaskToDailyPlanner();
    this.taskService.updateTask(task)
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
   * DIALOG METHODS
   */

  /**
   * Add a task through dialog 
   */
  addTaskThroughDialog(): void {
    const newTask: Task = { name: '', description: '', estimatedTime: 0, actualTime: 0, taskState: false };    
    const dialogRef = this.dialog.open(DialogOverviewTask, this.getDialogConfig(newTask));

    dialogRef.afterClosed().subscribe(dialogTask => {
      console.log('Add Task - Dialog closed.');
      this.addTask(dialogTask);
    });
  }

  /**
   * Update an existing task through dialog
   * @param task task to be updated
   */
  openTaskThroughDialog(task: Task): void {
    const dialogRef = this.dialog.open(DialogOverviewTask, this.getDialogConfig(task));

    dialogRef.afterClosed().subscribe(dialogTask => {
      console.log('Dialog closed.');
      
      if (dialogTask) {
        console.log('Update task.');
        this.updateTask(task);
      }
    });
  }

  getDialogConfig(task): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = task;
    dialogConfig.width = '500px';
    dialogConfig.height = '400px';

    return dialogConfig;
  }

  /**
   * Daily planner methods
   */

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
}

@Component({
  selector: 'dialog-overview-task-dialog',
  templateUrl: 'dialog-overview-task-dialog.html',
  styleUrls: ['./dialog-overview-task-dialog.css'] 
})
export class DialogOverviewTask {
  options = [
    { "state": true, "name": "Completed" }, 
    {"state": false, "name": "In Progress" }
  ];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewTask>,
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private taskService: TaskService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
