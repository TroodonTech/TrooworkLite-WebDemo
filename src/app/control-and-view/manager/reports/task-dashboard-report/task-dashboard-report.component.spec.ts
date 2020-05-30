import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDashboardReportComponent } from './task-dashboard-report.component';

describe('TaskDashboardReportComponent', () => {
  let component: TaskDashboardReportComponent;
  let fixture: ComponentFixture<TaskDashboardReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDashboardReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDashboardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
