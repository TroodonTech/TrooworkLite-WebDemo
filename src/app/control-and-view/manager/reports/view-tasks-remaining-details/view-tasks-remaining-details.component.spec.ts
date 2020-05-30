import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTasksRemainingDetailsComponent } from './view-tasks-remaining-details.component';

describe('ViewTasksRemainingDetailsComponent', () => {
  let component: ViewTasksRemainingDetailsComponent;
  let fixture: ComponentFixture<ViewTasksRemainingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTasksRemainingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTasksRemainingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
