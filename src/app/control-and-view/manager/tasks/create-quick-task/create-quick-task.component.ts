import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../service/task.service';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-quick-task',
  templateUrl: './create-quick-task.component.html',
  styleUrls: ['./create-quick-task.component.scss']
})
export class CreateQuickTaskComponent implements OnInit {
  EmployeeOption;
  emp_key: number;
  org_id: number;
  marked = false;
  prioritylist;
  EmployeeKey;
  WorkorderNotes;
  PriorityKey;
  isPhotoRequired;
  createworkorder;
  notes;
  priority;
  isReccuring;
  isrecurring; // for setting bit value 1 or 0
  startDT;
  endDT;
  workTime;
  dailyRecc_gap; // dailyreccuringGap
  is_PhotoRequired;
  is_BarcodeRequired;
  occurenceinstance;

  intervaltype;
  repeatinterval;
  occursonday;

  workorderCreation;
  role: String;
  name: String;
  IsSupervisor: Number;
  TaskName;
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
  constructor(private router: Router, private WorkOrderServiceService: WorkOrderServiceService, private taskServ: TaskService) { }
  //Function for converting date from GMT to yyyy/mm/dd format
  convert_DT(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  //function for creating quick work order
  saveQuickWorkOrder() {
    if (!(this.EmployeeKey)) {
      alert("Please select employee!");
    } else if (!(this.TaskName)) {
      alert("Please enter task name!")
    }
    else if (!(this.WorkorderNotes)) {
      alert("Please enter task notes!");
    } else {

      this.startDT = this.convert_DT(new Date());
      var d = new Date();
      var datetext = d.toTimeString();
      datetext = datetext.split(' ')[0];
      this.workTime = datetext;
      this.is_BarcodeRequired = 0;

      if (this.WorkorderNotes) {
        this.notes = this.WorkorderNotes.trim();
      } else {
        this.notes = null;
      }

      if (this.EmployeeKey) {
        this.EmployeeKey = this.EmployeeKey;
      } else {
        this.EmployeeKey = - 1;
      }
      console.log(this.EmployeeKey + "..." + this.emp_key);
      if (this.PriorityKey) {
        this.priority = this.PriorityKey;
      } else {
        this.priority = - 1;
      }
      if (this.isPhotoRequired) {
        this.is_PhotoRequired = 1;
      } else {
        this.is_PhotoRequired = 0;
      }

      this.createworkorder = {

        workorderkey: - 99,
        workordertypekey: "Quick Task",
        TaskName: this.TaskName,
        equipmentkey: - 1,
        roomkeys: '-1',
        facilitykeys: '-1',
        floorkeys: '-1',
        zonekeys: '-1',
        roomtypekeys: '-1',
        employeekey: this.EmployeeKey,
        priority: this.priority,
        fromdate: this.startDT,
        todate: this.startDT,
        intervaltype: '0',
        repeatinterval: 1,
        occursonday: null,
        occursontime: this.workTime,
        occurstype: null,
        workordernote: this.notes,
        isbar: this.is_BarcodeRequired,
        isphoto: this.is_PhotoRequired,
        metaupdatedby: this.emp_key,
        OrganizationID: this.org_id

      };

      this.taskServ
        .addQuickTask(this.createworkorder)
        .subscribe(res => {
          alert("Task created successfully");
          if (this.role == 'Manager') {
            this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['viewTask'] } }]);
          }
          else if (this.role == 'Supervisor') {
            this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['viewTask'] } }]);
          }
        });
    }

  }


  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.emp_key = profile.employeekey;
    this.org_id = profile.OrganizationID;

    this.EmployeeKey = "";
    this.PriorityKey = "";

    this.WorkOrderServiceService//service for getting employee names
      .getallEmployee(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.EmployeeOption = data;
      });

    this.WorkOrderServiceService//service for getting priority list
      .getallPriority(this.org_id)
      .subscribe((data: any[]) => {
        this.prioritylist = data;
      });
  }
}
