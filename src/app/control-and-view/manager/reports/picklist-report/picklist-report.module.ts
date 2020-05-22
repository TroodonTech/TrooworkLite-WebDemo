import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxDatePickerModule } from 'igniteui-angular';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PicklistReportComponent } from './picklist-report.component';
import { ChartsModule } from 'ng2-charts';
const routes: Routes = [
  {
    path: '',
    component: PicklistReportComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule, ReactiveFormsModule,
    IgxDatePickerModule,
    NgDatepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(routes),
    ChartsModule
  ],
  declarations: [PicklistReportComponent]
})
export class PicklistReportModule { }
