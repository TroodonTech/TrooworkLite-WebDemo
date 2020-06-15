import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskServiceRequestComponent } from './view-task-service-request.component';

describe('ViewTaskServiceRequestComponent', () => {
  let component: ViewTaskServiceRequestComponent;
  let fixture: ComponentFixture<ViewTaskServiceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskServiceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
