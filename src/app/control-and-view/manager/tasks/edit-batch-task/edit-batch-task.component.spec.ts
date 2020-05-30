import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBatchTaskComponent } from './edit-batch-task.component';

describe('EditBatchTaskComponent', () => {
  let component: EditBatchTaskComponent;
  let fixture: ComponentFixture<EditBatchTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBatchTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBatchTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
