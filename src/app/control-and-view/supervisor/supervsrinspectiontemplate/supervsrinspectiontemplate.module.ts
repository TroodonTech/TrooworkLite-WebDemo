import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupervisorDashboardModule } from '../../dashboard/user-dashboards/supervisor-dashboard/supervisor-dashboard.module';
import { SupervsrinspectiontemplateComponent } from './supervsrinspectiontemplate.component';
import { FileSelectDirective } from 'ng2-file-upload';
const routes: Routes = [
  {
    path: '',
    component: SupervsrinspectiontemplateComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    SupervisorDashboardModule,
    // UserDashboardsModule,
    // InventoryModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SupervsrinspectiontemplateComponent, FileSelectDirective]
})
export class SupervsrinspectiontemplateModule { }
