import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../dashboard-report/data.service';
import { ViewTasksRemainingDetailsComponent } from './view-tasks-remaining-details.component';
const routes: Routes = [
  {
    path: '',
    component: ViewTasksRemainingDetailsComponent
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
  declarations: [ViewTasksRemainingDetailsComponent],
  providers: [DataService]
})
export class ViewTasksRemainingDetailsModule { }
