import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBatchTaskComponent } from './view-batch-task.component';

describe('ViewBatchTaskComponent', () => {
  let component: ViewBatchTaskComponent;
  let fixture: ComponentFixture<ViewBatchTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBatchTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBatchTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
