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
    const url = ConectionSettings.Url + '/searchWorkorderScheduleByallFilters';
    return this
      .http
      .post(url, obj);
  }
  delete_batchTask(obj) {
    const url = ConectionSettings.Url + '/deletebatchWorkOrders';
    return this
      .http
      .post(url, obj);
  }

  getRemainingTaskDetails(from, to, empKey, wotypeKey, org) {
    return this
      .http
      .get(ConectionSettings.Url + '/getRemainingTaskDetails?from=' + from + "&to=" + to + "&empKey=" + empKey + "&wotypeKey=" + wotypeKey + "&org=" + org);
  }
}
