import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../dashboard-report/data.service';
import { ViewCompletedTasksDetailsComponent } from './view-completed-tasks-details.component';
const routes: Routes = [
  {
    path: '',
    component: ViewCompletedTasksDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewCompletedTasksDetailsComponent],
  providers: [DataService]
})
export class ViewCompletedTasksDetailsModule { }
