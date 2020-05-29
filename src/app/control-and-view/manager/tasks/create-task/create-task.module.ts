import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxDatePickerModule } from 'igniteui-angular';
import { CalendarModule } from 'primeng/calendar';
import { NgDatepickerModule} from 'ng2-datepicker';
import { CreateTaskComponent } from './create-task.component';
const routes: Routes = [
  {
    path: '',
    component: CreateTaskComponent
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
  declarations: [CreateTaskComponent]
})
export class CreateTaskModule { }
