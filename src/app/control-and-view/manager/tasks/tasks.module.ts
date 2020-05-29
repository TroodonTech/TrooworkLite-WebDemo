import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { EditTasksComponent } from './edit-tasks/edit-tasks.component';
import { CreateQuickTaskComponent } from './create-quick-task/create-quick-task.component';
import { CreateBatchTaskComponent } from './create-batch-task/create-batch-task.component';
import { ViewBatchTaskComponent } from './view-batch-task/view-batch-task.component';
import { EditBatchTaskComponent } from './edit-batch-task/edit-batch-task.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateTaskComponent, ViewTasksComponent, EditTasksComponent, CreateQuickTaskComponent, CreateBatchTaskComponent, ViewBatchTaskComponent, EditBatchTaskComponent]
})
export class TasksModule { }
