import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reports } from '../../../../model-class/reports';
import { ReportServiceService } from '../../../../service/report-service.service';
import { PieChartConfig } from '../../../../extra-files/piechart-file/Models/PieChartConfig';//for piechart
import { GooglePieChartService } from '../../../../extra-files/piechart-file/Services/google-pie-chart.service';//for piechart
declare var google: any;//for piechart
import * as jspdf from 'jspdf';//for pdf
import html2canvas from 'html2canvas';//for pdf
import { DatepickerOptions } from 'ng2-datepicker';
import 'jspdf-autotable';//for pdf
import { interval, Subscription } from 'rxjs';//for calling function on regular interval
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-task-dashboard-report',
  templateUrl: './task-dashboard-report.component.html',
  styleUrls: ['./task-dashboard-report.component.scss']
})
export class TaskDashboardReportComponent implements OnInit {
  loading: boolean;// loading
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  subscription: Subscription;

  taskList;
  TaskID;
  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }
  //new date picker

  options: DatepickerOptions;
  // = {
  //   minYear: 1970,
  //   maxYear: 2030,
  //   displayFormat: 'MM/DD/YYYY',
  //   barTitleFormat: 'MMMM YYYY',
  //   dayNamesFormat: 'dd',
  //   firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  //   //locale: frLocale,
  //   //minDate: new Date(Date.now()), // Minimal selectable date
  //   //maxDate: new Date(Date.now()),  // Maximal selectable date
  //   barTitleIfEmpty: 'Click to select a date',
  //   placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
  //   addClass: '', // Optional, value to pass on to [ngClass] on the input field
  //   addStyle: { 'font-size': '18px', 'width': '125%', 'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
  //   fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
  //   useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  // }

  title = 'Reusable charts sample';
  public arr: Array<any> = [{}];
  public samplearr: Array<any> = [{}];
  public convert_DT(str) { //converting date to yyyy/mm/dd format
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  // adding properties and methods that will be used by the igxDatePicker

  public date: Date = new Date(Date.now());

  // sudina-code for exporting to pdf starts
  public captureScreen() {
    const doc = new jspdf();
    var data = document.getElementById('part1');
    html2canvas(data).then(canvas => {
      const img = canvas.toDataURL('image/png');
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      doc.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.addPage();
      doc.autoTable({
        html: '#contentToConvert',
      });
      doc.save('TaskDashBoardReport.pdf');
    });
  }

  //code for exporting to pdf ends//
  employeeoption: Reports[];
  dashboardreport: FormGroup;
  workordertypeoption: Reports[];
  reporttable: Reports[];
  pievalues: Reports[];
  filterbypie: Reports[];
  data1: any[];
  data3: any[];
  sampledata1: any[];
  sampledata2: any[];
  data4: any[];
  finalStringForPie: String;
  config1: PieChartConfig;
  elementId1: String;
  dropdownSettings = {};
  em_Key: number;
  Workorder_TypeKey: string;
  date1: string;
  date2: string;
  org_id: number;
  manager;
  EmployeeKey;
  fromdate: Date;
  todate: Date;
  WorkorderTypeKey = [];
  showElement: boolean;
  constructor(private fb: FormBuilder, private ReportServiceService: ReportServiceService, private _pieChartService: GooglePieChartService, private ds: DataService, private router: Router) {
    this.dashboardreport = fb.group({
      EmployeeKey: ['', Validators.required],
      EmployeeText: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.loading = true;
    this.EmployeeKey = "";
    this.fromdate = new Date();
this.TaskID="";
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    console.log(dte);

    // console.log(".... "+new Date(Date.now()));
    this.options = {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: 'MM/DD/YYYY',
      barTitleFormat: 'MMMM YYYY',
      dayNamesFormat: 'dd',
      firstCalendarDay: 0,

      maxDate: dte,

      barTitleIfEmpty: 'Click to select a date',
      placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
      addClass: '', // Optional, value to pass on to [ngClass] on the input field
      addStyle: { 'font-size': '18px', 'width': '125%', 'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
      fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
      useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
    };

    var from = this.ds.getFromDate();
    var to = this.ds.getToDate();
    var employees = this.ds.getEmployees();
    var workordertypes = this.ds.getTaskID();
    var shiftType1 = this.ds.getshiftType();
    var shiftvalue1 = this.ds.getshiftValue();

    this.ds.setEmp(null);
    this.ds.setEmployees(null);
    this.ds.setFromDate(null);
    this.ds.setToDate(null);
    // this.ds.setWOType(null);
    this.ds.setTaskName(null);
    this.ds.setTaskID(null);
    this.ds.setempName(null);
    this.ds.setshiftType(null);
    this.ds.setshiftValue(null);

    var dateTemp_1;
    var dateTemp_2;

    if (from) {
      dateTemp_1 = from;
    } else {
      dateTemp_1 = new Date();
    }

    if (to) {
      dateTemp_2 = to;
    } else {
      dateTemp_2 = new Date();
    }

    if (employees) {
      this.em_Key = employees;
    } else {
      this.em_Key = null;
    }

    this.fromdate = dateTemp_1;
    // if (this.fromdate != dateTemp_2) {
    this.todate = dateTemp_2;
    // }
    if (this.em_Key != null) {
      this.EmployeeKey = this.em_Key;
    }
    else {
      this.EmployeeKey = "";
    }

    this.ReportServiceService.getallemployee(this.employeekey, this.OrganizationID).subscribe((data: Reports[]) => {
      this.employeeoption = data;
    });

    this.ReportServiceService
      .getallworkordertype(this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.workordertypeoption = data;
      });
    this.ReportServiceService
      .getallTaskName(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.taskList = data;
      });

    if (workordertypes) {
      if (workordertypes.length == 0) {
        this.Workorder_TypeKey = null;
      } else {
        var workordertypeList1 = [];
        var workordertypeListObj1 = workordertypes;
        var workordertypeString1;
        if (workordertypeListObj1.length > 0) {
          if (workordertypeListObj1) {
            for (var j = 0; j < workordertypeListObj1.length; j++) {
              workordertypeList1.push(workordertypeListObj1[j].WorkorderTypeKey);
            }
          }
          this.Workorder_TypeKey = workordertypeList1.join(',');
          this.WorkorderTypeKey = workordertypes;
        }

      }
    } else if (!(workordertypes)) {
      this.Workorder_TypeKey = null;
    }

    this.dropdownSettings = {//for multiselect dropdown
      singleSelection: false,
      idField: 'WorkorderTypeKey',
      textField: 'WorkorderTypeText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };//


    this.ReportServiceService//service for fetching table values
      .gettaskdashboardreport(this.convert_DT(dateTemp_1), this.convert_DT(dateTemp_2), this.em_Key, this.Workorder_TypeKey, this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.reporttable = data;
        this.loading = false;


        this.ReportServiceService//service for fetching pie chart values
          // .getpievalues(dateTemp_1, this.employeekey, this.OrganizationID, this.ShiftType, this.ShiftValue)
          .gettaskvaluesfilterbypie(this.convert_DT(dateTemp_1), this.convert_DT(dateTemp_2), this.em_Key, this.Workorder_TypeKey, this.OrganizationID, this.employeekey)
          .subscribe((data: Reports[]) => {
            this.pievalues = data;
            this.sampledata1 = [['WorkorderStatus', 'count']];

            for (var i = 0; i < this.pievalues.length; i++) {

              var status = this.pievalues[i].reportpietext;
              var num = this.pievalues[i].totalItems;
              this.data4 = ([status, num]);
              this.sampledata1.push(this.data4);
            }
            this.data1 = this.sampledata1;
            this.config1 = new PieChartConfig(' ', 0.4);
            this.elementId1 = 'piechart';
            setTimeout(() => {
              if (this.reporttable.length > 0) {
                this._pieChartService.BuildPieChart(this.elementId1, this.data1, this.config1);//drawing piechart on pageload by calling piechart service
              }
            }, 1000)
          });
      });



    const source = interval(900000);  //sudina-code for calling filter function after regular interval
    this.subscription = source.subscribe(val => this.dashboardreportbyfilter());
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  //function for filter
  dashboardreportbyfilter() {
    this.pievalues = [];
    this.reporttable = [];

    if (!this.EmployeeKey) {
      this.em_Key = null;
    }
    else {
      this.em_Key = this.EmployeeKey;
    }
    if (!this.fromdate) {
      var date1 = this.convert_DT(new Date());
    }
    else {
      date1 = this.convert_DT(this.fromdate);
    }
    if (!this.todate) {
      var date2 = date1;
    }
    else {
      date2 = this.convert_DT(this.todate);
    }

    if (date2 && date1 > date2) {
      alert("Please check your Start Date!");
      return;
    }

    this.manager = this.employeekey;
    // if (this.WorkorderTypeKey.length == 0) {
    //   workordertypeString = null;
    // }
    // else {//converting workordertype list to comma separated string

    //   var workordertypeList = [];
    //   var workordertypeListObj = this.WorkorderTypeKey;
    //   var workordertypeString;
    //   if (workordertypeListObj.length > 0) {
    //     if (workordertypeListObj) {
    //       for (var j = 0; j < workordertypeListObj.length; j++) {
    //         workordertypeList.push(workordertypeListObj[j].WorkorderTypeKey);
    //       }
    //     }
    //     workordertypeString = workordertypeList.join(',');
    //   }
    // }

    if (!this.TaskID) {
      this.TaskID = null;
    }
    this.loading = true;
    this.ReportServiceService//service for fetching values for table
      .gettaskdashboardreport(date1, date2, this.em_Key, this.TaskID, this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.reporttable = data;
        this.loading = false;

        this.ReportServiceService//service for fetching values for piechart
          .gettaskvaluesfilterbypie(date1, date2, this.em_Key, this.TaskID, this.OrganizationID, this.employeekey)
          .subscribe((data: Reports[]) => {
            this.pievalues = data;
            this.sampledata2 = [['WorkorderStatus', 'count']];//converting array to json format for piechart

            for (var i = 0; i < this.pievalues.length; i++) {
              var status = this.pievalues[i].reportpietext;
              var num = this.pievalues[i].totalItems;
              this.data3 = ([status, num]);
              this.sampledata2.push(this.data3);

              if ((i == this.pievalues.length - 1) && (this.sampledata2.length == this.pievalues.length + 1)) {

                setTimeout(() => {
                  if ((this.pievalues.length > 0)) {
                    this.data1 = this.sampledata2;
                    this.config1 = new PieChartConfig(' ', 0.4);
                    this.elementId1 = 'piechart';
                    this._pieChartService.BuildPieChart(this.elementId1, this.data1, this.config1);//call for building piechart
                  }
                }, 1000)
              }
            }
          });
      });

  }
  ngOnDestroy() {//unsubscribing from calling filter function after regular interval
    this.subscription.unsubscribe();
  }

  viewTaskDetails(empkey, WOTypeKey, empName, TaskName) {
    if (!this.todate) {
      this.todate = this.fromdate;
    }
    this.ds.setFromDate(this.fromdate);
    this.ds.setToDate(this.todate);
    this.ds.setEmployees(this.EmployeeKey);
    this.ds.setTaskID(this.TaskID);
    this.ds.setEmp(empkey);
    this.ds.setTaskID(this.TaskID);
    this.ds.setTaskName(TaskName);
    this.ds.setempName(empName);


    if (this.role == 'Manager') {
      this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['viewTaskRemainingDetails', this.convert_DT(this.fromdate), this.convert_DT(this.todate), empkey, WOTypeKey, empName, TaskName] } }]);
    }
    else if (this.role == 'Supervisor') {
      this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['viewTaskRemainingDetails', this.convert_DT(this.fromdate), this.convert_DT(this.todate), empkey, WOTypeKey, empName, TaskName] } }]);
    }
  }

  viewTaskCompletedDetails(empkey, WOTypeKey, empName, TaskName) {
    if (!this.todate) {
      this.todate = this.fromdate;
    }
    this.ds.setFromDate(this.fromdate);
    this.ds.setToDate(this.todate);
    this.ds.setEmployees(this.EmployeeKey);
    this.ds.setTaskID(this.TaskID);
    this.ds.setEmp(empkey);
    this.ds.setTaskID(this.TaskID);
    this.ds.setTaskName(TaskName);
    this.ds.setempName(empName);


    if (this.role == 'Manager') {
      this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['viewTaskCompletedDetails', this.convert_DT(this.fromdate), this.convert_DT(this.todate), empkey, WOTypeKey, empName, TaskName] } }]);
    }
    else if (this.role == 'Supervisor') {
      this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['viewTaskCompletedDetails', this.convert_DT(this.fromdate), this.convert_DT(this.todate), empkey, WOTypeKey, empName, TaskName] } }]);
    }
  }
}
