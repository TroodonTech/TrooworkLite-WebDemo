import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxDatePickerModule } from 'igniteui-angular';
import { CalendarModule } from 'primeng/calendar';

import { CreateQuickTaskComponent } from './create-quick-task.component';

const routes: Routes = [
  {
    path: '',
    component: CreateQuickTaskComponent
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
    IgxDatePickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateQuickTaskComponent]
})
export class CreateQuickTaskModule { }
