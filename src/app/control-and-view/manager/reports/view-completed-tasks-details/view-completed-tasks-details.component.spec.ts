import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompletedTasksDetailsComponent } from './view-completed-tasks-details.component';

describe('ViewCompletedTasksDetailsComponent', () => {
  let component: ViewCompletedTasksDetailsComponent;
  let fixture: ComponentFixture<ViewCompletedTasksDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompletedTasksDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompletedTasksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
