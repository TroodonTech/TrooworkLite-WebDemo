import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDatepickerModule } from 'ng2-datepicker';
import { CalendarModule } from 'primeng/calendar';

import { EditTasksComponent } from './edit-tasks.component';
const routes: Routes = [
  {
    path: '',
    component: EditTasksComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    NgDatepickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditTasksComponent]
})
export class EditTasksModule { }
