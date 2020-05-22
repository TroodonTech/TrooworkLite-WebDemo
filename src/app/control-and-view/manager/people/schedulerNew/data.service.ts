import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DayPilot} from 'daypilot-pro-angular';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {
newtype= 'Month';
passDate=DayPilot.Date.today();
  resources: any[] = [
    { name: 'Employee1', id: 'GA',"expanded": true, children: [
      { name: 'Resource 1', id: 'R1' },
      { name: 'Resource 2', id: 'R2' }
    ]},
    // { name: 'Employee2', id: 'GB',"expanded": true, children: [
    //   { name: 'Resource 3', id: 'R3'},
    //   { name: 'Resource 4', id: 'R4'}
    // ]},
    // { name: 'Employee3', id: 'GC',"expanded": true, children: [
    //   { name: 'Resource 3', id: 'R5'},
    //   { name: 'Resource 4', id: 'R6'}
    // ]}
  ];

  events: any[] = [
    {
      id: "1",
      resource: "R1",
      start: "2019-06-19",
      end: "2019-06-19",
      text: "Event 1",
      scheduleName:"Schedule Manager1",
      backColor: "blue"
    }
  ];

  constructor(private http : HttpClient){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getResources(): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.resources);
      }, 200);
    });

    // return this.http.get("/api/resources");
  }

  createEvent(data: CreateEventParams): Observable<EventData> {
    let e: EventData = {
      start: data.start,
      end: data.end,
      resource: data.resource,
      id: DayPilot.guid(),
      text: data.text,
      ScheduleNameKey:data.ScheduleNameKey,
      ScheduleName:data.ScheduleName,
      backColor: "White",
      moveDisabled: false,
      bubbleHtml:data.text
    };

    return new Observable(observer => {
      setTimeout(() => {
        observer.next(e);
      }, 200);
    });

    //return this.http.post("/api/events/create", data);
  }

  updateEvent(data: DayPilot.Event): Observable<any> {
    console.log("Updating event: " + data.text());
    console.log(data);
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({result: "OK"});
      }, 200);
    });
  }
  setData(type,Date){
    this.newtype=type;
    this.passDate= Date;
  }
  
  getType(){
    let temp =  this.newtype;
    return temp;
  }
  getDate(){
    let temp =  this.passDate;
    return temp;
  }

}


export interface CreateEventParams {
  start: string;
  end: string;
  text: string;
  resource: string | number;
  ScheduleNameKey:string;
  ScheduleName:string;
  backColor:string;
  moveDisabled:boolean;
  bubbleHtml:string;
}

export interface UpdateEventParams {
  id: string | number;
  start: string;
  end: string;
  text: string;
  resource: string | number;
  ScheduleNameKey:string;
  ScheduleName:string;
  backColor:string;
  moveDisabled:boolean;
  bubbleHtml:string;
}

export interface EventData {
  id: string | number;
  start: string;
  end: string;
  text: string;
  resource: string | number;
  ScheduleNameKey:string;
  ScheduleName:string;
  backColor:string;
  moveDisabled:boolean;
  bubbleHtml:string;
}
