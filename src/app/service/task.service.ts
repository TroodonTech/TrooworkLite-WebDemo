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
}
