import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
import { ActivatedRoute, Router } from "@angular/router";
import { DatepickerOptions } from 'ng2-datepicker';
import { TaskService } from '../../../../service/task.service';

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.scss']
})
export class EditTasksComponent implements OnInit {
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  delete_curwo;
  loading;
  message;
  //for token decoding
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

  WO_Key: object;
  EmployeeOption;
  workorderTypeList;
  facilitylist;
  FloorList;
  zonelist;
  RoomTypeList;
  RoomList;
  priorityList;
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
  wot;
  notes;
  facilityString;
  zone;
  shift;
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
  keepActive;
  keep_active;
  GpsSnapShot;
  Gps_SnapShot;
  TaskName;
  intervaltype;
  repeatinterval;
  occursonday;
  emp_key;
  workorderCreation;
  timetable = { times: [] };//for daily recurring timepicker
  count = 0;
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService, private taskServ: TaskService) {
    this.route.params.subscribe(params => this.WO_Key = params.WorkorderKey);
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
  //converting date from GMT to yyyy/mm/dd
  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };
  ngOnInit() {
    this.loading = true;
    this.workordertypekey = "";
    this.FacilityKey = "";
    this.FloorKey = "";
    this.ZoneKey = "";
    this.RoomTypeKey = "";
    this.RoomKey = "";
    this.PriorityKey = "";
    this.EmployeeKey = "";
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.taskServ
      .getTask_edit(this.WO_Key, this.OrganizationID)
      .subscribe((data: any[]) => {//service for getting edited work order detail
        this.TaskEditList = data[0];
        this.loading = false;
        if (this.TaskEditList.KeepActive == 1) {
          this.keepActive = true;
        }
        else {
          this.keepActive = false;
        }
        if (this.TaskEditList.IsSnapshot == 1) {
          this.GpsSnapShot = true;
        }
        else {
          this.GpsSnapShot = false;
        }
        this.WorkOrderServiceService
          .getallFloor(this.TaskEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {//for getting all floor names
            this.FloorList = data;
          });
        this.WorkOrderServiceService
          .getzone_facilityfloor(this.TaskEditList.FloorKey, this.TaskEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {//for getting all zone names
            this.zonelist = data;
          });
        this.WorkOrderServiceService
          .getroomType_facilityfloor(this.TaskEditList.FloorKey, this.TaskEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {//service for getting roomtype lists
            this.RoomTypeList = data;
          });
        this.WorkOrderServiceService
          .getRoom_facilityfloor(this.TaskEditList.FloorKey, this.TaskEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {//service for getting roomlist
            this.RoomList = data;
          });

        // if (this.TaskEditList.EquipmentKey == -1) {
        if (!this.TaskEditList.FacilityKey) {
          this.FacilityKey = "";
        }
        else {
          this.FacilityKey = this.TaskEditList.FacilityKey;
        }
        if (!this.TaskEditList.FloorKey) {
          this.FloorKey = "";
        }
        else {
          this.FloorKey = this.TaskEditList.FloorKey;
        }
        if (!this.TaskEditList.ZoneKey) {
          this.ZoneKey = "";
        }
        else {
          this.ZoneKey = this.TaskEditList.ZoneKey;
        }
        if (!this.TaskEditList.RoomTypeKey) {
          this.RoomTypeKey = "";
        }
        else {
          this.RoomTypeKey = this.TaskEditList.RoomTypeKey;
        }
        if (!this.TaskEditList.RoomKey) {
          this.RoomKey = "";
        }
        else {
          this.RoomKey = this.TaskEditList.RoomKey;
        }
        this.TaskName = this.TaskEditList.TaskName;
        this.wot = "Task";
        // }
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
        this.dateValue = new Date(this.TaskEditList.WorkorderDate);
        var date_time = this.dateValue;

        this.workordertypekey = this.TaskEditList.WorkorderTypeKey;
        if (this.TaskEditList.PriorityKey) {
          this.PriorityKey = this.TaskEditList.PriorityKey;
        }
        this.WorkorderNotes = this.TaskEditList.WorkorderNotes;

        this.EmployeeKey = this.TaskEditList.EmployeeKey;
        if (this.EmployeeKey == -1) {
          this.EmployeeKey = "";
        }

        var cur_time = new Date(Date.now());

        var timeValue1 = this.TaskEditList.WorkorderTime;
        var test = timeValue1.split(":");
        var today = new Date(cur_time.getFullYear(), cur_time.getMonth(), cur_time.getDate(), test[0], test[1], 0);
        this.timeValue = today;
      });

    this.WorkOrderServiceService//for getting all building names
      .getallFacility(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.facilitylist = data;
      });
    this.WorkOrderServiceService//for getting all workordertypes
      .getallworkorderType(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.workorderTypeList = data;
      });
    this.WorkOrderServiceService//for getting all priority names
      .getallPriority(this.OrganizationID)
      .subscribe((data: any[]) => {
        this.priorityList = data;
      });
    this.WorkOrderServiceService//for getting employeenames
      .getallEmployee(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.EmployeeOption = data;
      });

  }
  //function called on checkbox value change
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  getFloorDisp(facilityName) {//getting floors for selected facility
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
      this.WorkOrderServiceService//service for getting zones
        .getzone_facilityfloor(floor, facility, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.zonelist = data;
          this.ZoneKey = "";
        });
      this.WorkOrderServiceService//service for getting roomtype lists
        .getroomType_facilityfloor(floor, facility, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.RoomTypeList = data;
          this.RoomTypeKey = "";
        });
      this.WorkOrderServiceService//service for getting roomlist
        .getRoom_facilityfloor(floor, facility, this.OrganizationID)
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

  //function for deleting workorder
  DeleteWO() {
    this.deleteWO = {
      workorderkey: this.WO_Key,
      OrganizationID: this.OrganizationID
    };
    this.taskServ
      .deleteCurrent_task(this.deleteWO)
      .subscribe((data: any[]) => {
        // alert("Task deleted successfully");
        this.message = "Task deleted successfully";
        setTimeout(() => {
          this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['viewTask'] } }]);
        }, 4000);

      });
  }
  //function for updating workorder

  UpdateWO() {
    if (!this.WorkorderNotes) {
      // alert("Please enter task notes");
      this.message = "Please enter task notes"
    } else if (!this.WorkorderNotes.trim()) {
      // alert("Please enter task notes");
      this.message = "Please enter task notes";
    } else if (!this.TaskName) {
      // alert("Please enter a task name");
      this.message = "Please enter a task name";
    }

    else if (!(this.timeValue)) {
      // alert("Please provide time!");
      this.message = "Please provide time!";
    }
    else {
      this.intervaltype = '0'; // char(1),/*d for day, w for week, m for month*/
      this.repeatinterval = 1; // int,/*daily(every `2` days) weekly(every `1` week) monthly(every `3` months)*/
      this.occurenceinstance = null; // int,/*daily(3) weekly(null) monthly(null) monthly(1)*/
      this.occursonday = null;
      // if (this.workordertypekey) {
      // this.wot = this.workordertypekey;
      // } else {
      //   this.wot = null;

      // }
      if (this.WorkorderNotes) {
        this.notes = this.WorkorderNotes.trim();
      } else {
        this.notes = null;
      }

      var facilityString;
      if (this.FacilityKey) {
        facilityString = this.FacilityKey;
      } else {
        facilityString = -1;
      }
      var floorString;
      if (this.FloorKey) {
        floorString = this.FloorKey;
      } else {
        floorString = -1;
      }

      var zoneString;
      if (this.ZoneKey) {
        zoneString = this.ZoneKey;
      } else {
        zoneString = -1;
      }
      var roomtypeString;
      if (this.RoomTypeKey) {
        roomtypeString = this.RoomTypeKey;
      } else {
        roomtypeString = -1;
      }
      var roomsString;
      if (this.RoomKey) {
        roomsString = this.RoomKey;
      } else {
        roomsString = -1;
      }

      // var roomsString;
      // if (this.RoomKey) {
      //   roomsString = this.RoomKey;
      // } else {
      //   if (roomlistObj) {

      //     for (var j = 0; j < roomlistObj.length; j++) {
      //       roomList.push(roomlistObj[j].RoomKey);
      //     }
      //     roomsString = roomList.join(',');
      //   } else {

      //     return;
      //   }
      // }


      // var facilityString;
      // if (this.FacilityKey) {
      //   facilityString = this.FacilityKey;
      // } else {
      //   if (facilitylistObj) {

      //     for (var j = 0; j < facilitylistObj.length; j++) {
      //       facilityList.push(facilitylistObj[j].FacilityKey);
      //     }
      //     facilityString = facilityList.join(',');
      //   }
      // }

      // var floorString;
      // if (this.FloorKey) {
      //   floorString = this.FloorKey;
      // } else {
      //   if (floorlistObj) {

      //     for (var j = 0; j < floorlistObj.length; j++) {
      //       floorList.push(floorlistObj[j].FloorKey);
      //     }
      //     floorString = floorList.join(',');
      //   }
      // }

      // var zoneString;
      // if (this.ZoneKey) {
      //   zoneString = this.ZoneKey;
      // } else {
      //   this.zone = null;
      //   if (zonelistObj) {

      //     for (var j = 0; j < zonelistObj.length; j++) {
      //       zoneList.push(zonelistObj[j].ZoneKey);
      //     }
      //     zoneString = zoneList.join(',');
      //   }
      // }

      // var roomtypeString;
      // if (this.RoomTypeKey) {
      //   roomtypeString = this.RoomTypeKey;
      // } else {
      //   if (roomtypelistObj) {

      //     for (var j = 0; j < roomtypelistObj.length; j++) {
      //       roomtypeList.push(roomtypelistObj[j].RoomTypeKey);
      //     }
      //     roomtypeString = roomtypeList.join(',');
      //   }
      // }

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


      this.isReccuring = false;
      this.isrecurring = 0;

      if (this.dateValue) {
        this.startDT = this.convert_DT(this.dateValue);
      } else {
        this.startDT = this.convert_DT(new Date());
      }
      this.endDT = this.startDT;
    }
    if (this.timeValue) {
      this.workTime = this.timeValue.getHours() + ':' + this.timeValue.getMinutes();
    } else {
      this.workTime = new Date().getHours() + ':' + new Date().getMinutes();
    }
    if (this.keepActive == true) {
      this.keep_active = 1;
    }
    else {
      this.keep_active = 0;
    }
    if (this.GpsSnapShot == true) {
      this.Gps_SnapShot = 1;
    }
    else {
      this.Gps_SnapShot = 0;
    }


    this.workorderCreation = {
      occursontime: this.workTime,
      workorderkey: - 99,
      tasktypekey: this.wot,
      tasknote: this.notes,
      taskname: this.TaskName,
      roomkeys: roomsString.toString(),
      facilitykeys: facilityString.toString(),
      floorkeys: floorString.toString(),
      zonekeys: zoneString.toString(),
      roomtypekeys: roomtypeString.toString(),
      employeekey: this.emp_key,
      priority: this.priority,
      fromdate: this.startDT,
      todate: this.endDT,
      isbar: this.is_BarcodeRequired,
      isphoto: this.is_PhotoRequired,
      metaupdatedby: this.employeekey,
      OrganizationID: this.OrganizationID,
      intervaltype: '0', // char(1),/*d for day, w for week, m for month*/
      repeatinterval: 1,
      occursonday: null,
      keepActive: this.keep_active,
      IsSnapshot: this.Gps_SnapShot,
      NewTask: 0
    };
    this.taskServ.addTasks(this.workorderCreation).subscribe((data: any[]) => {//service for updating workorder
      this.deleteWO = {
        workorderkey: this.WO_Key,
        OrganizationID: this.OrganizationID
      };
      this.taskServ//service for deleting current workorder after updating
        .deleteCurrent_task(this.deleteWO)
        .subscribe((data: any[]) => {
          // alert("Task updated successfully");
          this.message = "Task updated successfully";
          setTimeout(() => {
            this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['viewTask'] } }]);
          }, 4000);
        });
    });
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
  goBack() {
    this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['viewTask'] } }]);
  }

  clear(){
    this.message="";
  }
}
