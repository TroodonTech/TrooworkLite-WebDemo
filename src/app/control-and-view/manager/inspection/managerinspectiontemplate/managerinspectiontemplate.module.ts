import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { CalendarModule } from 'primeng/calendar';

import { ManagerinspectiontemplateComponent } from './managerinspectiontemplate.component';
import { ManagerDashBoardModule } from '../../../dashboard/user-dashboards/manager-dash-board/manager-dash-board.module';

const routes: Routes = [
  {
    path: '',
    component: ManagerinspectiontemplateComponent
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    ManagerDashBoardModule,
    FormsModule, ReactiveFormsModule,
    CalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManagerinspectiontemplateComponent,FileSelectDirective]
})
export class ManagerinspectiontemplateModule { }
