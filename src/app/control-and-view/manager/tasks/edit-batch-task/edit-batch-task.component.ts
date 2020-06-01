import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
import { TaskService } from '../../../../service/task.service';
import { ActivatedRoute, Router } from "@angular/router";
import { DatepickerOptions } from 'ng2-datepicker';//for datepicker

@Component({
  selector: 'app-edit-batch-task',
  templateUrl: './edit-batch-task.component.html',
  styleUrls: ['./edit-batch-task.component.scss']
})
export class EditBatchTaskComponent implements OnInit {
  BatchWO_Key: object;

  EmployeeOption;
  workorderTypeList;
  facilitylist;
  FloorList;
  zonelist;
  RoomTypeList;
  RoomList;
  priorityList;
  scheduleList;
  floorvalue;
  TaskEditList;
  isPhotoRequired: any;
  isBarcodeRequired: any;
  marked = false;
  dateValue: Date;
  WorkorderNotes;
  workordertypekey;
  FacilityKey;
  FloorKey;
  ZoneKey;
  RoomTypeKey;
  RoomKey;
  PriorityKey;
  EmployeeKey;
  timeValue;
  deleteWO;
  date1;
  wot;
  notes;
  facilityString;
  zone;
  eqp_key;
  shift;
  priority;
  isRecurring;
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
  GpsSnapShot;
  Gps_SnapShot;
  KeepActive;
  Keep_Active;
  workorderCreation;
  timetable = { times: [] };
  dailyrecurring;
  dailyFrequency;
  TaskStartDate;
  TaskEndDate;
  occurenceat;
  DailyrecurringGap;
  rep_interval = 1;
  occurs_on = null;
  day1;
  month1;
  day2;
  month2;
  occurs_type;
  pos2;
  BatchScheduleNameKey;
  Times;
  RoomNameList;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  emp_key;
  TaskName;
  taskNotes;
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

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService, private taskServ: TaskService) {
    this.route.params.subscribe(params => this.BatchWO_Key = params.WorkorderScheduleKey);//getting key for edited batchworkorder
  }
  // adding properties and methods that will be used by the igxDatePicker
  public date: Date = new Date(Date.now());

  //adding datepicker option
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: '', // Optional, value to pass on to [ngClass] on the input field
    addStyle: { 'font-size': '18px', 'width': '100%', 'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };
  convert_DT(str) {//converting date from GMT to yyyy/mm/dd
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };
  tConvert(time) {//function for converting time
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
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
    this.workordertypekey = "";
    this.BatchScheduleNameKey = "";
    this.FacilityKey = "";
    this.FloorKey = "";
    this.ZoneKey = "";
    this.RoomTypeKey = "";
    this.RoomKey = "";
    this.PriorityKey = "";
    this.DailyrecurringGap = "";
    this.dailyFrequency = "";
    this.day1 = "";
    this.day2 = "";
    this.month1 = "";
    this.month2 = "";
    this.pos2 = "";
    this.WorkOrderServiceService//for getting edit details for selected batchworkorder
      .getBatchWO_edit(this.BatchWO_Key, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.TaskEditList = data[0];

        this.workordertypekey = this.TaskEditList.WorkorderTypeKey;
        this.FacilityKey = this.TaskEditList.FacilityKey;
        this.FloorKey = this.TaskEditList.FloorKey;
        this.ZoneKey = this.TaskEditList.ZoneKey;
        this.RoomKey = this.TaskEditList.RoomKey;
        this.RoomTypeKey = this.TaskEditList.RoomTypeKey;
        if (this.TaskEditList.PriorityKey || this.TaskEditList.PriorityKey != -1) {
          this.PriorityKey = this.TaskEditList.PriorityKey;
        } else {
          this.PriorityKey = "";
        }
        this.taskNotes = this.TaskEditList.WorkorderNotes;
        this.EmployeeKey = this.TaskEditList.EmployeeKey;
        this.TaskName = this.TaskEditList.BatchSchduleName;
        if (this.TaskEditList.EquipmentKey == -1) {
          this.WorkOrderServiceService
            .getRoomList(this.TaskEditList.RoomKeyList, this.OrganizationID)
            .subscribe((data: any[]) => {
              this.RoomNameList = data[0].RoomText;
            });
        }
        //services for populating dropdown with floornames,zone names,roomtype names,room names,equipment names,schedule names

        this.Times = this.tConvert(this.TaskEditList.WorkorderTime);
        this.WorkOrderServiceService
          .getallFloor(this.TaskEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.FloorList = data;
          });
        this.WorkOrderServiceService
          .getzone_facilityfloor(this.TaskEditList.FloorKey, this.TaskEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.zonelist = data;
          });
        this.WorkOrderServiceService
          .getroomType_facilityfloor(this.TaskEditList.FloorKey, this.TaskEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.RoomTypeList = data;
          });
        this.WorkOrderServiceService
          .getRoom_facilityfloor(this.TaskEditList.FloorKey, this.TaskEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.RoomList = data;
          });
        this.WorkOrderServiceService
          .getallScheduleName(this.employeekey, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.scheduleList = data;
          });

        if (this.TaskEditList.IsPhotoRequired == 1) {
          this.isPhotoRequired = true;
        }
        else {
          this.isPhotoRequired = false;
        }
        if (this.TaskEditList.IsBarcodeRequired == 1) {
          this.isBarcodeRequired = true;
        }
        else {
          this.isBarcodeRequired = false;
        }
        if (this.TaskEditList.IsSnapshot == 1) {
          this.GpsSnapShot = true;
        }
        else {
          this.GpsSnapShot = false;
        }
        if (this.TaskEditList.KeepActive == 1) {
          this.KeepActive = true;
        }
        else {
          this.KeepActive = false;
        }
        this.isRecurring = true;
        this.dailyrecurring = true;
        this.DailyrecurringGap = this.TaskEditList.OccurrenceInterval;
        if (this.DailyrecurringGap == 0) {
          this.DailyrecurringGap = "";
        }
        this.TaskStartDate = new Date(this.TaskEditList.WorkorderDate);
        this.TaskEndDate = new Date(this.TaskEditList.WorkorderEndDate);
        var count = [];
        var WorkorderTime = [];
        var ocurraOntime = this.TaskEditList.WorkorderTime;
        var y = this.TaskEditList.WorkorderTime;
        count = y.split(',');
        this.dailyFrequency = count.length;
        //converting time from am/pm format to GMT
        if (count.length > 0) {

          this.timetable = { times: [] };
          this.timetable.times = [];
          var arr = [];
          for (var i = 0; i < count.length; i++) {
            this.timetable.times.push('');
            var test = count[i].split(":");
            // // console.log(test[0]+" .... "+test[1]);
            var cur_time = new Date(Date.now());
            var today = new Date(cur_time.getFullYear(), cur_time.getMonth(), cur_time.getDate(), test[0], test[1], 0);

            arr.push(today);
            this.timetable.times[i] = arr[i];
          }

        }

      });
    this.WorkOrderServiceService//service for getting facility
      .getallFacility(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.facilitylist = data;
      });
    this.WorkOrderServiceService//service for getting floor
      .getallworkorderType(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.workorderTypeList = data;
      });
    this.WorkOrderServiceService//service for getting prioritylist
      .getallPriority(this.OrganizationID)
      .subscribe((data: any[]) => {
        this.priorityList = data;
      });
    this.WorkOrderServiceService//service for getting employeelist
      .getallEmployee(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.EmployeeOption = data;
      });

  }
  //function called when checkbox value is changed
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }

  getFloorDisp(facilityName) {//getting floor based on facility
    if (facilityName) {
      this.WorkOrderServiceService
        .getallFloor(facilityName, this.OrganizationID)
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
      if ((this.FloorKey)) {
        this.ZoneKey = -1;
        this.RoomTypeKey = -1;
        this.RoomKey = -1;
      }
      else {
        this.WorkOrderServiceService//service for getting zones
          .getzone_facilityfloor(floor, facility, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.zonelist = data;
            this.ZoneKey = "";
          });
        this.WorkOrderServiceService//service for getting roomtype
          .getroomType_facilityfloor(floor, facility, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.RoomTypeList = data;
            this.RoomTypeKey = "";
          });
        this.WorkOrderServiceService//service for getting rooms
          .getRoom_facilityfloor(floor, facility, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.RoomList = data;
            this.RoomKey = "";
          });
      }
    }
    else {
      this.ZoneKey = "";
      this.RoomTypeKey = "";
      this.RoomKey = "";
    }
  }
  getRoomTypeRoom(zone, facility, floor) {//get roomtype,room based on zone,facility,floor
    if (zone && facility && floor) {
      this.WorkOrderServiceService//service for getting roomtype lists
        .getRoomtype_zone_facilityfloor(zone, floor, facility, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.RoomTypeList = data;
          this.RoomTypeKey = "";
        });
      this.WorkOrderServiceService//service for getting roomlist
        .getRoom_zone_facilityfloor(zone, floor, facility, this.OrganizationID)
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
        .getRoom_Roomtype_zone_facilityfloor(roomtype, zone, floor, facility, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.RoomList = data;
          this.RoomKey = "";
        });
    }
    else {
      this.RoomKey = "";
    }
  }
  //function called on radio button change
  dailyrecurringChange() {
    this.dailyrecurring = true;
  }

  //function for deleting current workorder
  DeleteWO() {
    this.deleteWO = {
      workorderSchedulekey: this.BatchWO_Key,
      OrganizationID: this.OrganizationID
    };
    this.taskServ
      .deleteCurrent_BatchTask(this.deleteWO)
      .subscribe((data: any[]) => {
        alert("Batch task deleted successfully");
        // this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['viewBatchTask'] } }]);
        if (this.role == 'Manager') {
          this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['viewBatchTask'] } }]);
        }
        // else if (this.role == 'Employee' && this.IsSupervisor == 1) {
        else if (this.role == 'Supervisor') {
          this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['viewBatchTask'] } }]);
        }
      });
  }

  UpdateWO() {//function for updatewo without equipment
    if (!(this.TaskName)) {
      alert("Please select Task Name!");
    }
    // else if (!this.workordertypekey) {
    //   alert("Please select work-order type!");
    // }
    else if (!this.FacilityKey) {
      alert("Please select building!");
    }
    else if (!this.FloorKey) {
      alert("Please select floor!");
    }
    else if (!(this.TaskStartDate)) {
      alert("Please provide work-order start date!");
    }
    else if (!(this.TaskEndDate)) {
      alert("Please provide work-order end date!")
    }
    else if ((this.TaskEndDate) && (this.convert_DT(this.TaskStartDate) > this.convert_DT(this.TaskEndDate))) {
      alert("Please check your start date!");

    }
    else if (this.dailyrecurring == true) {
      if (!(this.dailyFrequency)) {
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
    if (this.workordertypekey) {
      this.wot = this.workordertypekey;
    } else {
      this.wot = null;
    }
    if (this.WorkorderNotes) {
      this.notes = this.WorkorderNotes.trim();
    } else {
      this.notes = null;
    }
    if (this.FacilityKey) {

    }
    if (this.FloorKey) {
    }
    var roomsString;
    if (this.RoomKey) {
      roomsString = this.RoomKey;
    } else if (this.RoomNameList) {
      roomsString = this.RoomNameList;
    }
    else {
      if (roomlistObj) {
        for (var j = 0; j < roomlistObj.length; j++) {
          roomList.push(roomlistObj[j].RoomKey);
        }
        roomsString = roomList.join(',');
      } else {
        return;
      }
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

    if (this.EmployeeKey) {
      this.emp_key = this.EmployeeKey;
    } else {
      this.emp_key = - 1;
    }
    if (this.ZoneKey) {
      this.zone = this.ZoneKey;
    } else {
      this.zone = null;

    }
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
    if (this.dailyrecurring == true) {
      this.intervaltype = 'd';
      this.isrecurring = 1;
    }
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

    if (this.dailyrecurring == true) {
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
    }


    if (this.GpsSnapShot == true) {
      this.Gps_SnapShot = 1;
    }
    else {
      this.Gps_SnapShot = 0;
    }

    if (this.KeepActive == true) {
      this.Keep_Active = 1;
    }
    else {
      this.Keep_Active = 0;
    }

    this.workorderCreation = {
      taskName: this.TaskName.trim(),
      occursontime: this.workTime,
      workorderkey: - 99,
      workordertypekey: this.wot,
      workordernote: this.taskNotes.trim(),
      equipmentkey: -1,
      roomkeys: roomsString,
      facilitykeys: facilityString,
      floorkeys: floorString,
      zonekeys: zoneString,
      roomtypekeys: roomtypeString,
      employeekey: this.emp_key,
      priority: this.priority,
      fromdate: this.startDT,
      todate: this.endDT,
      isbar: this.is_BarcodeRequired,
      isphoto: this.is_PhotoRequired,
      metaupdatedby: this.employeekey,
      OrganizationID: this.OrganizationID,
      intervaltype: this.intervaltype, // char(1),/*d for day, w for week, m for month*/
      repeatinterval: this.rep_interval,
      occursonday: this.occurs_on,
      occurstype: this.occurs_type,
      IsSnapshot: this.Gps_SnapShot,
      KeepActive: 1
    };
    this.taskServ.addtaskSchedule(this.workorderCreation).subscribe(res => {//service for updating wo
      this.deleteWO = {
        workorderSchedulekey: this.BatchWO_Key,
        OrganizationID: this.OrganizationID
      };
      this.taskServ//if updated successfully delete the current batchwo
        .deleteCurrent_BatchTask(this.deleteWO)
        .subscribe((data: any[]) => {
          alert("Batch task updated successfully");
          if (this.role == 'Manager') {
            this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['viewBatchTask'] } }]);
          }
          else if (this.role == 'Supervisor') {
            this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['viewBatchTask'] } }]);
          }
        });
    });
  }

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
  toggleVisibility_Equipment(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  goBack() {
    if (this.role == 'Manager') {
      this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['viewBatchTask'] } }]);
    }
    else if (this.role == 'Supervisor') {
      this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['viewBatchTask'] } }]);
    }
  }
}
