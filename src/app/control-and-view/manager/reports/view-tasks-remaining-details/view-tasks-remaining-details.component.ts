import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { TaskService } from '../../../../service/task.service';
import { DataService } from '../dashboard-report/data.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-view-tasks-remaining-details',
  templateUrl: './view-tasks-remaining-details.component.html',
  styleUrls: ['./view-tasks-remaining-details.component.scss']
})
export class ViewTasksRemainingDetailsComponent implements OnInit {
  from;
  to;
  empKey;
  wotypeKey;
  wotypeName;
  empName;
  workorderList;
  loading;

  role;
  name;
  employee;
  org;

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

  constructor(private taskServ: TaskService, private dataSer: DataService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.from = params.fromdt);
    this.route.params.subscribe(params => this.to = params.todt);
    this.route.params.subscribe(params => this.empKey = params.empKey);
    this.route.params.subscribe(params => this.wotypeKey = params.wotypeKey);
    this.route.params.subscribe(params => this.empName = params.empName);
    this.route.params.subscribe(params => this.wotypeName = params.wotypeName);
  }

  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.name = profile.username;
    this.employee = profile.employeekey;
    this.org = profile.OrganizationID;

    this.loading = true;
    this.taskServ.getRemainingTaskDetails(this.from, this.to, this.empKey, this.wotypeKey, this.org)
      .subscribe((data: any[]) => {
        this.workorderList = data;
        this.loading = false;
      });
  }

  goBack() {
    if (this.role == 'Manager') {
      this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['TaskDashboardReport'] } }]);
    }
    else if (this.role == 'Supervisor') {
      this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['TaskDashboardReport'] } }]);
    }
  }
}
