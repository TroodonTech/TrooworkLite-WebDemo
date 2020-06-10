import { Component, OnInit } from '@angular/core';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
import { Router } from "@angular/router";
import { DatepickerOptions } from 'ng2-datepicker';//for datepicker
import { TaskService } from '../../../../service/task.service';

@Component({
  selector: 'app-create-batch-task',
  templateUrl: './create-batch-task.component.html',
  styleUrls: ['./create-batch-task.component.scss']
})
export class CreateBatchTaskComponent implements OnInit {
  EmployeeOption;
  workorderTypeList;
  facilitylist;
  FloorList;
  zonelist;
  RoomTypeList;
  RoomList;
  priorityList;
  scheduleList;
  emp_key: number;
  org_id: number;
  marked = false;
  FacilityKey;
  FloorKey;
  ZoneKey;
  RoomTypeKey;
  RoomKey;
  PriorityKey;
  EmployeeKey;
  timeValue: any;
  dateValue: any;
  isPhotoRequired: any;
  isBarcodeRequired: any;
  WorkorderTypeKey;
  workorderNotes;
  GpsSnapShot;
  Gps_SnapShot;

  // temp-variables
  wot;
  notes;
  facilityString;
  zone;
  shift;
  priority;
  isrecurring; // for setting bit value 1 or 0
  startDT;
  endDT;
  workTime;
  dailyRecc_gap; // dailyrecurringGap
  is_PhotoRequired;
  is_BarcodeRequired;
  occurenceinstance;
  addWOT;
  intervaltype;
  repeatinterval;
  occursonday;
  dailyrecurring = true;

  workorderCreation;
  isRecurring = true;
  newType = false;
  //recurr variables
  recurringFrequency = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];//for selecting a month in recurring option
  monthlyDays = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];//for selecting day of a month in recurring option(on gap of dropdown)
  timetable = { times: [] };//for daily recurring timepicker
  dailyFrequency;
  TaskStartDate;
  TaskEndDate;
  occurenceat;
  DailyrecurringGap;
  rep_interval = 1;
  occurs_on = null;
  weektable_one;
  weektable_two;
  weektable_three;
  weektable_four;
  weektable_five;
  weektable_six;
  weektable_seven;
  Time_weekly;
  Time_monthly;
  day1;
  month1;
  day2;
  month2;
  occurs_type;
  pos2;
  newworkordertypetext;
  role: String;
  name: String;
  IsSupervisor: Number;
  employeekey;
  keepActive = true;
  keep_active;
  taskNotes;
  taskname;
  //converting date from GMT to yyyy/mm/dd
  public convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");

  }

  // adding properties and methods that will be used by the igxDatePicker
  public date: Date = new Date(Date.now());
  // private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
  // private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });
  // public formatter = (_: Date) => {
  //   return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;

  // }
  //adding datepicker option
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
    addClass: '', // Optional, value to pass on to [ngClass] on the input field
    addStyle: { 'font-size': '18px', 'width': '100%', 'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  constructor(private router: Router, private WorkOrderServiceService: WorkOrderServiceService, private taskServ: TaskService) { }
  url_base64_decode(str) {//token decoding function
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
  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.emp_key = profile.employeekey;
    this.org_id = profile.OrganizationID;
    // this.WorkorderTypeKey = "";
    this.EmployeeKey = "";
    this.FacilityKey = "";
    this.FloorKey = "";
    this.ZoneKey = "";
    this.RoomTypeKey = "";
    this.RoomKey = "";
    this.PriorityKey = "";
    this.day1 = "";
    this.day2 = "";
    this.month1 = "";
    this.month2 = "";
    this.pos2 = "";
    this.dailyrecurring = true;
    this.DailyrecurringGap == "";
    this.dailyFrequency = "";

    this.WorkOrderServiceService//for getting all building names
      .getallFacility(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.facilitylist = data;
      });
    // this.WorkOrderServiceService//for getting all workordertypes
    //   .getallworkorderType(this.emp_key, this.org_id)
    //   .subscribe((data: any[]) => {
    //     var newArray = data.slice(0); //clone the array, or you'll end up with a new "None" option added to your "values" array on every digest cycle.
    //     newArray.unshift({ WorkorderTypeText: "Create New", WorkorderTypeKey: "-99" });
    //     this.workorderTypeList = newArray;
    //   });
    this.WorkOrderServiceService//for getting all priority names
      .getallPriority(this.org_id)
      .subscribe((data: any[]) => {
        this.priorityList = data;
      });

    this.WorkOrderServiceService//for getting employeenames
      .getallEmployee(this.emp_key, this.org_id)
      .subscribe((data: any[]) => {
        this.EmployeeOption = data;
      });

  }
  //function called on checkbox value change

  toggleVisibility_Barcode(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  toggleVisibility_Recur(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  toggleVisibility_Photo(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  //
  //function called on radiobutton change
  dailyrecurringChange() {
    this.dailyrecurring = true;
  }


  getFloorDisp(facilityName) {//getting floors for selected facility
    if (facilityName) {
      this.WorkOrderServiceService
        .getallFloor(facilityName, this.org_id)
        .subscribe((data: any[]) => {
          this.FloorList = data;
          this.FloorKey = "";
          this.ZoneKey = "";
          this.RoomTypeKey = "";
          this.RoomKey = "";
        });
    }
    else {
      this.FloorKey = "";
      this.ZoneKey = "";
      this.RoomTypeKey = "";
      this.RoomKey = "";
    }
  }
  getZoneRoomTypeRoom(floor, facility) {//getting zone,roomtype,room based on facility key,floor key
    if (floor && facility) {
      // if ((this.FloorKey) && (this.showEqTypes == true)) {
      //   this.ZoneKey = -1;
      //   this.RoomTypeKey = -1;
      //   this.RoomKey = -1;
      // }
      // else {
      this.WorkOrderServiceService//service for getting zones
        .getzone_facilityfloor(floor, facility, this.org_id)
        .subscribe((data: any[]) => {
          this.zonelist = data;
          this.ZoneKey = "";
        });
      this.WorkOrderServiceService//service for getting roomtype lists
        .getroomType_facilityfloor(floor, facility, this.org_id)
        .subscribe((data: any[]) => {
          this.RoomTypeList = data;
          this.RoomTypeKey = "";
        });
      this.WorkOrderServiceService//service for getting roomlist
        .getRoom_facilityfloor(floor, facility, this.org_id)
        .subscribe((data: any[]) => {
          this.RoomList = data;
          this.RoomKey = "";
        });
      // }
    }
    else {
      this.ZoneKey = "";
      this.RoomTypeKey = "";
      this.RoomKey = "";
      // this.EquipmentTypeKey = "";
      // this.EquipmentKey = "";
    }
  }
  getRoomTypeRoom(zone, facility, floor) {//get roomtype,room based on zone,facility,floor
    if (zone && facility && floor) {
      this.WorkOrderServiceService//service for getting roomtype lists
        .getRoomtype_zone_facilityfloor(zone, floor, facility, this.org_id)
        .subscribe((data: any[]) => {
          this.RoomTypeList = data;
          this.RoomTypeKey = "";
        });
      this.WorkOrderServiceService//service for getting roomlist
        .getRoom_zone_facilityfloor(zone, floor, facility, this.org_id)
        .subscribe((data: any[]) => {
          this.RoomList = data;
          this.RoomKey = "";
        });
    }
    else {
      this.RoomTypeKey = "";
      this.RoomKey = "";
      this.getZoneRoomTypeRoom(this.FloorKey, this.FacilityKey);
    }
  }
  getRoom(roomtype, zone, facility, floor) {//get room based on zone,facility,floor,roomtype
    if (roomtype && zone && facility && floor) {
      this.WorkOrderServiceService//service for getting roomlist
        .getRoom_Roomtype_zone_facilityfloor(roomtype, zone, floor, facility, this.org_id)
        .subscribe((data: any[]) => {
          this.RoomList = data;
          this.RoomKey = "";
        });
    }
    else {
      this.RoomKey = "";
    }
  }

  getEmployee(schedulename) {//for getting employee for selected schedulename
    if (schedulename) {
      this.WorkOrderServiceService
        .getEmployee_scheduleNamae(schedulename, this.org_id)
        .subscribe((data: any[]) => {
          this.EmployeeKey = data[0].EmployeeKey;
        });
    }
    else {
      this.EmployeeKey = "  ";
    }
  }
  //function for creating workorder

  createBatchTask() {
    // if (!this.FacilityKey) {
    //   alert("Please select building!");
    // }
    // else if (!this.FloorKey) {
    //   alert("Please select floor!");
    // }
    // else if (!this.ZoneKey) {
    //   alert("Please select zone!");
    // } else if (!this.RoomKey) {
    //   alert("Please select room!");
    // }
    if (!this.taskname) {
      alert("Please enter task name");
    } else if (!this.taskname.trim()) {
      alert("Please enter task name");
    }
    else if (!this.taskNotes) {
      alert("Please enter task notes");
    } else if (!this.taskNotes.trim()) {
      alert("Please enter task notes");
    }
    else if (!(this.TaskStartDate)) {
      alert("Please provide start date!");
    }
    else if (!(this.TaskEndDate)) {
      alert("Please provide end date!");
    } else if ((this.TaskEndDate) && (this.convert_DT(this.TaskStartDate) > this.convert_DT(this.TaskEndDate))) {
      alert("Please check your end date!");

    }
    else if (this.dailyrecurring == true) {
      if (this.convert_DT(this.TaskStartDate) < this.convert_DT(new Date())) {
        alert("Start date is less than current date");
      }
      else if (!(this.dailyFrequency)) {
        alert("Please select frequency !");
      } else if (this.dailyFrequency) {
        for (var i = 0; i < this.dailyFrequency; i++) {
          if (!(this.timetable.times[i])) {
            alert("Please enter time values !");
          }
        }
        this.withoutequip_wo();
      }
    }
  }
  //function for creating workorder without equipment
  withoutequip_wo() {
    var roomlistObj = [];
    var roomtypelistObj = [];
    var zonelistObj = [];
    var floorlistObj = [];
    var facilitylistObj = [];
    var facilityList = [];
    var roomList = [];
    var roomtypeList = [];
    var zoneList = [];
    var floorList = [];
    facilitylistObj = this.facilitylist;
    floorlistObj = this.FloorList;
    zonelistObj = this.zonelist;
    roomtypelistObj = this.RoomTypeList;
    roomlistObj = this.RoomList;
    this.intervaltype = '0'; // char(1),/*d for day, w for week, m for month*/
    this.repeatinterval = 1; // int,/*daily(every `2` days) weekly(every `1` week) monthly(every `3` months)*/
    this.occurenceinstance = null; // int,/*daily(3) weekly(null) monthly(null) monthly(1)*/
    this.occursonday = null;

    this.wot = "Task";
    if (this.taskNotes) {
      this.notes = this.taskNotes.trim();
    } else {
      this.notes = null;
    }
    if (this.FacilityKey) {

    } else {
      this.FacilityKey = -1;
    }
    if (this.FloorKey) {
    } else {
      this.FloorKey = -1;
    }
    var roomsString;
    if (this.RoomKey) {
      roomsString = this.RoomKey;
    } else {
      if (roomlistObj) {
        for (var j = 0; j < roomlistObj.length; j++) {
          roomList.push(roomlistObj[j].RoomKey);
        }
        roomsString = roomList.join(',');
      }
    }
    if (!roomsString) {
      roomsString = -1;
    }
    var facilityString;
    if (this.FacilityKey) {
      facilityString = this.FacilityKey;
    } else {
      if (facilitylistObj) {
        for (var j = 0; j < facilitylistObj.length; j++) {
          facilityList.push(facilitylistObj[j].FacilityKey);
        }
        facilityString = facilityList.join(',');
      }
    }
    if (!facilityString) {
      facilityString = -1;
    }
    var floorString;
    if (this.FloorKey) {
      floorString = this.FloorKey;
    } else {
      if (floorlistObj) {
        for (var j = 0; j < floorlistObj.length; j++) {
          floorList.push(floorlistObj[j].FloorKey);
        }
        floorString = floorList.join(',');
      }
    }
    if (!floorString) {
      floorString = -1;
    }
    var zoneString;
    if (this.ZoneKey) {
      zoneString = this.ZoneKey;
    } else {
      this.zone = null;
      if (zonelistObj) {
        for (var j = 0; j < zonelistObj.length; j++) {
          zoneList.push(zonelistObj[j].ZoneKey);
        }
        zoneString = zoneList.join(',');
      }
    }
    if (!zoneString) {
      zoneString = -1;
    }
    var roomtypeString;
    if (this.RoomTypeKey) {
      roomtypeString = this.RoomTypeKey;
    } else {
      if (roomtypelistObj) {
        for (var j = 0; j < roomtypelistObj.length; j++) {
          roomtypeList.push(roomtypelistObj[j].RoomTypeKey);
        }
        roomtypeString = roomtypeList.join(',');
      }
    }
    if (!roomtypeString) {
      roomtypeString = -1;
    }
    if (this.EmployeeKey) {
      this.employeekey = this.EmployeeKey;
    } else {
      this.employeekey = - 1;
    }
    // if (this.ZoneKey) {
    this.zone = this.ZoneKey;
    // } else {
    //   this.zone = null;

    // }
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
    if (this.isBarcodeRequired) {
      this.is_BarcodeRequired = 1;
    } else {
      this.is_BarcodeRequired = 0;
    }
    // if (this.dailyrecurring == true) {
    this.intervaltype = 'd';
    this.isrecurring = 1;
    // }
    if (this.TaskStartDate) {
      this.startDT = this.convert_DT(this.TaskStartDate);
    } else {
      this.startDT = this.convert_DT(new Date());
    }
    if (this.TaskEndDate) {
      this.endDT = this.convert_DT(this.TaskEndDate);
    } else {
      this.endDT = this.convert_DT(new Date());
    }

    // var timeDiff = Math.abs(this.TaskEndDate.getTime() - this.TaskStartDate.getTime());
    // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // if (this.intervaltype == 'w' && diffDays < 7) {
    //   alert("Please Select One week Date Range!");
    //   return;
    // }
    // if (this.intervaltype == 'm' && diffDays < 31) {
    //   alert("Please Select One month Date Range!");
    //   return;
    // }
    // if (this.dailyrecurring == true) {
    var timeset = [];
    var timeset_corr = [];
    timeset = this.timetable.times;
    for (var i = 0; i < timeset.length; i++) {
      timeset_corr.push(timeset[i].getHours() + ':' + timeset[i].getMinutes());
    }

    this.workTime = timeset_corr.join(',');
    if (!(this.DailyrecurringGap)) {
      this.rep_interval = 1;
    }
    else {
      this.rep_interval = this.DailyrecurringGap;
    }
    // }

    if (this.GpsSnapShot == true) {
      this.Gps_SnapShot = 1;
    }
    else {
      this.Gps_SnapShot = 0;
    }
    if (this.keepActive == true) {
      this.keep_active = 1;
    }
    else {
      this.keep_active = 0;
    }
    if (!this.occurs_type) {
      this.occurs_type = null;
    }
    //creating workorder for already existing workordertype
    this.workorderCreation = {
      taskName: this.taskname,
      occursontime: this.workTime,
      workorderkey: - 99,
      workordertypekey: this.wot,
      workordernote: this.notes,
      equipmentkey: -1,
      roomkeys: roomsString,
      facilitykeys: facilityString,
      floorkeys: floorString,
      zonekeys: zoneString,
      roomtypekeys: roomtypeString,
      employeekey: this.employeekey,
      priority: this.priority,
      fromdate: this.startDT,
      todate: this.endDT,
      isbar: this.is_BarcodeRequired,
      isphoto: this.is_PhotoRequired,
      metaupdatedby: this.emp_key,
      OrganizationID: this.org_id,
      intervaltype: this.intervaltype, // char(1),/*d for day, w for week, m for month*/
      repeatinterval: this.rep_interval,
      occursonday: this.occurs_on,
      occurstype: this.occurs_type,
      IsSnapshot: this.Gps_SnapShot,
      KeepActive: this.keep_active,
      NewTask: 1
    };
    console.log(this.workorderCreation);
    this.taskServ.checkTaskName(this.taskname, this.org_id).subscribe((data: any[]) => {
      if (data) {
        alert("Task Name already exists !!!");
        return false;
      } else {
        this.taskServ.addtaskSchedule(this.workorderCreation).subscribe(res => {
          alert("Batch task created successfully");
          if (this.role == 'Manager') {
            this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['viewBatchTask'] } }]);
          }
          // else if (this.role == 'Employee' && this.IsSupervisor == 1) {
          else if (this.role == 'Supervisor') {
            this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['viewBatchTask'] } }]);
          }
        });
      }
    });

  }

  //function for creating workorder withequip

  addFormField() {

    this.timetable.times = [];
    for (var i = 0; i < this.dailyFrequency; i++) {
      this.timetable.times.push('');
    }
  }
  change_values() {
    if ((this.FloorKey)) {
      this.ZoneKey = -1;
      this.RoomTypeKey = -1;
      this.RoomKey = -1;
    }
    else {
      this.ZoneKey = "";
      this.RoomTypeKey = "";
      this.RoomKey = "";
    }
  }
  checkfornewWOT(wot_key) {

    if (wot_key == '-99') {

      this.newType = true;
    }
  }
  GobacktoMenu() {
    this.newType = false;
    this.WorkorderTypeKey = "";
    this.newworkordertypetext = null;
  }
}
