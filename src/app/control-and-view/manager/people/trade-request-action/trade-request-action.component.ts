import { Component, OnInit } from '@angular/core';
import { PeopleServiceService } from "../../../../service/people-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-trade-request-action',
  templateUrl: './trade-request-action.component.html',
  styleUrls: ['./trade-request-action.component.scss']
})
export class TradeRequestActionComponent implements OnInit {

    //////////Authors : Aswathy///////

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  approvedstartdate;
  approvedenddate;
  traderequestdetailsbyID;
  traderequestDetails$;
  statuscurrentdate;
  assignmentdetails;
  assignmentdetails1;
  StatusKey;
  statuscomments;
  requestdetails;
  editflag;
  Status: String;
  details;

  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    //locale: frLocale,
    //minDate: new Date(Date.now()), // Minimal selectable date
    //maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: { 'font-size': '18px', 'width': '75%', 'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  options1: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    //locale: frLocale,
    //minDate: new Date(Date.now()), // Minimal selectable date
    //maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: '', // Optional, value to pass on to [ngClass] on the input field
    addStyle: { 'font-size': '18px', 'width': '75%', 'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };

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

  charValidation(event: any) {
    const patternChar = /[a-zA-Z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patternChar.test(inputChar)) {
      event.preventDefault();
    }
  }
  goBack() {
    this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['TradeRequestsFromEmployees'] } }]);
  }
  constructor(private PeopleServiceService: PeopleServiceService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.traderequestDetails$ = params.requestID);
  }

  saveTradeRequestAction() {
   
    if (!(this.traderequestdetailsbyID.Status)) {
      alert('Status is not provided !');
      return;
    }

    if ((this.traderequestdetailsbyID.Status) == "Approved") {

      if (!(this.traderequestdetailsbyID.ApprovedStartDate)) {
        alert('Approved Start Date is not provided !');
        return;
      }

      if (!(this.traderequestdetailsbyID.ApprovedEndDate)) {
        alert('Approved End Date is not provided !');
        return;
      }


      if ((this.convert_DT(this.traderequestdetailsbyID.ApprovedStartDate) < this.convert_DT(this.traderequestdetailsbyID.StartDate)) || (this.convert_DT(this.traderequestdetailsbyID.ApprovedStartDate) > this.convert_DT(this.traderequestdetailsbyID.EndDate))) {
        alert("Approved start date must be between requested dates!");
        return;
      }
      if ((this.convert_DT(this.traderequestdetailsbyID.ApprovedEndDate) < this.convert_DT(this.traderequestdetailsbyID.StartDate)) || (this.convert_DT(this.traderequestdetailsbyID.ApprovedEndDate) > this.convert_DT(this.traderequestdetailsbyID.EndDate))) {
        alert("Approved end date must be between requested dates!");
        return;
      }
    }

    if ((this.traderequestdetailsbyID.StatusComment)) {
      var comments = this.traderequestdetailsbyID.StatusComment.trim();
    }

    if (!(comments)) {
      alert('Comments are not provided !');
      return;
    }

    this.PeopleServiceService.saveTradeRequestAction(this.traderequestDetails$, this.employeekey,
      this.statuscurrentdate, this.convert_DT(this.traderequestdetailsbyID.ApprovedStartDate), this.convert_DT(this.traderequestdetailsbyID.ApprovedEndDate),
      this.traderequestdetailsbyID.Status, comments)
      .subscribe((data: any[]) => {
        this.details = data[0];
        alert("Request updated Successfully");
        this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['TradeRequestsFromEmployees'] } }]);
      });
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
    this.statuscurrentdate = this.convert_DT(new Date());
    this.editflag = false;

    this.PeopleServiceService.getTradeRequestdetailsbyID(this.traderequestDetails$)
      .subscribe((data) => {
        this.traderequestdetailsbyID = data[0];
        this.traderequestdetailsbyID.Status = '';
      });

    this.PeopleServiceService.getAssignmentTradebyID(this.traderequestDetails$)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.assignmentdetails1 = data;
          var hi = "";
          for (var i = 0; i < this.assignmentdetails1.length; i++) {
            hi = hi + (i + 1) + ". " + this.assignmentdetails1[i].BatchSchduleName + "\n";
          }
          this.assignmentdetails = hi;
        } else if (data.length == 0) {
          this.assignmentdetails = "No Assignments found";
        }
      });
  }
}
