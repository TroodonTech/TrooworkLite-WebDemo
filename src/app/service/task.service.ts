import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConectionSettings } from './ConnectionSetting';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  addTasks(obj) {
    const url = ConectionSettings.Url + '/addNewTask';
    return this
      .http
      .post(url, obj);
  }
  getTaskFilter_pagination(obj) {
    const url = ConectionSettings.Url + '/tasksByallFilters_pagination';
    return this
      .http
      .post(url, obj);
  }
  delete_task(obj) {
    const url = ConectionSettings.Url + '/deleteTasks';
    return this
      .http
      .post(url, obj);
  }
  getTask_edit(WO_Key, org_id) {
    return this
      .http
      .get(ConectionSettings.Url + '/taskDetails?SearchKey=' + WO_Key + '&OrganizationID=' + org_id);
  }
  deleteCurrent_task(obj) {
    const url = ConectionSettings.Url + '/deletetaskByKey';
    return this
      .http
      .post(url, obj);
  }

  addQuickTask(obj) {
    const url = ConectionSettings.Url + '/addQuicktask';
    return this
      .http
      .post(url, obj);
  }

  addtaskSchedule(obj) {
    const url = ConectionSettings.Url + '/addtaskSchedule';
    return this
      .http
      .post(url, obj);
  }

  getBatchTasks(on_date, emp_key, page_no, iems_perpage, org_id) {
    return this
      .http
      .get(ConectionSettings.Url + '/viewScheduledTasks?viewdate=' + on_date + '&employeekey=' + emp_key + '&pageno=' + page_no + '&itemsPerPage=' + iems_perpage + '&OrganizationID=' + org_id);
  }

  getBatchTaskFilter(viewWorkOrder) {
    const url = ConectionSettings.Url + '/taskScheduleByallFilters';
    return this
      .http
      .post(url, viewWorkOrder);
  }
  search_Batch_Task(obj) {
    const url = ConectionSettings.Url + '/searchTaskScheduleByallFilters';
    return this
      .http
      .post(url, obj);
  }
  delete_batchTask(obj) {
    const url = ConectionSettings.Url + '/deletebatchTasks';
    return this
      .http
      .post(url, obj);
  }

  getRemainingTaskDetails(from, to, empKey, wotypeKey, org) {
    return this
      .http
      .get(ConectionSettings.Url + '/getRemainingTaskDetails?from=' + from + "&to=" + to + "&empKey=" + empKey + "&wotypeKey=" + wotypeKey + "&org=" + org);
  }
  deleteCurrent_BatchTask(obj) {
    const url = ConectionSettings.Url + '/deleteTaskBatchSchedule';
    return this
      .http
      .post(url, obj);
  }

  taskViewsSupervisorByAll(obj) {
    const url = ConectionSettings.Url + '/taskViewSupervisorByAll';

    return this
      .http
      .post(url, obj);
  }
  gettaskTablewithOnDateandToDateFilter(date1, date2, tosrvempky, orgid, FacKey, Flrky, RmTypKy, ZnKy) {
    const url = ConectionSettings.Url + '/taskEmployeeByallFilters';
    const obj = {
      manager: tosrvempky,
      workorderDate: date1,
      workorderDate2: date2,
      facilitykey: FacKey,
      roomTypeKey: RmTypKy,
      floorKey: Flrky,
      zoneKey: ZnKy,
      OrganizationID: orgid
    };
    return this
      .http
      .post(url, obj);
  }




  BarcodeRoom(BarcodeValue, toServeremployeekey, workorderkey, type, OrganizationID, complete_Time) {
    return this
      .http
      .get(ConectionSettings.Url + '/barcodeRoom_Task?barcode=' + BarcodeValue + "&employeekey=" + toServeremployeekey + "&wkey=" + workorderkey + "&updatetype=" + type + "&OrganizationID=" + OrganizationID + "&complete_Time=" + complete_Time);
  }
  UpdateTaskbyPhotoForEmployee(fileName, toServeremployeekey, workorderkey, orgid, complete_Time) {
    return this
      .http
      .get(ConectionSettings.Url + '/updateTaskByPhoto?pho=' + fileName + "&employeekey=" + toServeremployeekey + "&wkey=" + workorderkey + "&OrganizationID=" + orgid + "&complete_Time=" + complete_Time);
  }
  CompleteTaskByempWithoutPhotoandBarcd(toServeremployeekey, workorderkey, OrganizationID, complete_Time) {
    return this
      .http
      .get(ConectionSettings.Url + '/TaskCompleted?employeekey=' + toServeremployeekey + "&wkey=" + workorderkey + "&OrganizationID=" + OrganizationID + "&complete_Time=" + complete_Time);
  }
  setCancelTask(wokey, reason, date1, time1, empkey, orgID) {
    const url = ConectionSettings.Url + '/cancelTask';
    const obj = {
      workOrderKey: wokey,
      Reason: reason,
      updateDate: date1,
      updateTime: time1,
      empKey: empkey,
      OrganizationID: orgID
    };
    return this
      .http
      .post(url, obj);
  }
  delete_Task(obj) {
    const url = ConectionSettings.Url + '/deleteTasks';
    return this
      .http
      .post(url, obj);
  }

  taskViewsEmpByAll(obj) {
    const url = ConectionSettings.Url + '/taskViewsEmpByAll';
    return this
      .http
      .post(url, obj);
  }
  checkTaskName(taskname, org_id) {
    return this
      .http
      .get(ConectionSettings.Url + '/checkTaskName?taskName=' + taskname + "&OrganizationID=" + org_id);

  }

  getCompletedTaskDetails(from, to, empKey, wotypeKey, org) {
    return this
      .http
      .get(ConectionSettings.Url + '/getCompletedTaskDetails?from=' + from + "&to=" + to + "&empKey=" + empKey + "&wotypeKey=" + wotypeKey + "&org=" + org);
  }
}
