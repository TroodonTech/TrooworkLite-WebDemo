import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewTasksComponent } from './view-tasks.component';
import { NgDatepickerModule } from 'ng2-datepicker';
import { FileSelectDirective } from 'ng2-file-upload';
const routes: Routes = [
  {
    path: '',
    component: ViewTasksComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgDatepickerModule,
  ],
  declarations: [ViewTasksComponent, FileSelectDirective]
})
export class ViewTasksModule { }
