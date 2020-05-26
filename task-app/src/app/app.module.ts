import { DailyPlannerService } from './daily-planner/daily-planner.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppComponent } from './app.component';
import { TasksComponent, DialogOverviewTask } from './tasks/tasks.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DailyPlannerComponent } from './daily-planner/daily-planner.component';
import { MatFormFieldModule, MatLabel, MatFormField } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';   
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    DashboardComponent,
    DailyPlannerComponent,
    DialogOverviewTask
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    // MatIconRegistry,
    MatIconModule
  ],
  providers: [
    DailyPlannerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
