import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  actionKey$: Object;
  actionTypeKey$: Object;
  dept: Array<any>;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

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



  constructor(private route: ActivatedRoute, private peopleServ: PeopleServiceService, private router: Router) {
    this.route.params.subscribe(params => this.actionKey$ = params.ActionKey);
    this.route.params.subscribe(params => this.actionTypeKey$ = params.ActionTypeKey);
  }

  updateEventType(type, name, desc) {
 
    this.peopleServ.UpdateEventType(type, name, desc, this.actionKey$, this.actionTypeKey$, this.employeekey, this.OrganizationID).subscribe(res =>
       this.router.navigateByUrl('/EventView')
       );

  }

  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.peopleServ.getEventTypeDetails(this.actionKey$, this.actionTypeKey$, this.employeekey, this.OrganizationID).subscribe((data: Array<any>) => {
      this.dept = data[0];
    });
  }
}

