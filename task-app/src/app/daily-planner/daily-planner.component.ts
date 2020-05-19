import { DailyPlannerService } from './daily-planner.service';
import { Component, OnInit } from '@angular/core';
import { DailyPlanner } from './daily-planner';

@Component({
  selector: 'app-daily-planner',
  templateUrl: './daily-planner.component.html',
  styleUrls: ['./daily-planner.component.css']
})
export class DailyPlannerComponent implements OnInit {
  dailyPlanners: DailyPlanner[];
  months: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  days: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  date = { month: 1, day: 1 };
  dailyPlannerDto : DailyPlanner;
  taskMap: Map<string, string>;

  constructor(
    private dailyPlannerService: DailyPlannerService
  ) { }

  ngOnInit(): void {
    this.getDailyPlanners();
  }

  /**
   * Get all daily planners
   */
  async getDailyPlanners(): Promise<void> {
    await this.dailyPlannerService.getAllDailyPlanners().subscribe((dailyPlanners) => {
      console.log(`Daily Planners: ${JSON.stringify(dailyPlanners, null, 2)}`);
      this.dailyPlanners = dailyPlanners;
    })
  }

  /**
   * Add a new daily planner
   * @param dailyPlannerDto daily planner object
   */
  async addDailyPlanner(): Promise<void> {
    const date = this.createFormattedDate();
    console.log('date', date);
    
    this.dailyPlannerDto = { date, taskMap : this.taskMap };
    await this.dailyPlannerService.addDailyPlanner(this.dailyPlannerDto).subscribe((dailyPlanner) => {
      console.log(`Daily Planner: ${JSON.stringify(dailyPlanner, null, 2)}`);
      this.dailyPlanners.push(dailyPlanner);
    })
  }

  createFormattedDate(): Date {
    console.log('date object', this.date);
    
    return new Date(2020, this.date.month-1, this.date.day, 0, 0, 0, 0);
  }
}
