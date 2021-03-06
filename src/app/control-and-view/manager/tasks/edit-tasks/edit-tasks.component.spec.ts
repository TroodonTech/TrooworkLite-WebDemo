import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTasksComponent } from './edit-tasks.component';

describe('EditTasksComponent', () => {
  let component: EditTasksComponent;
  let fixture: ComponentFixture<EditTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
