import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBatchTaskComponent } from './create-batch-task.component';

describe('CreateBatchTaskComponent', () => {
  let component: CreateBatchTaskComponent;
  let fixture: ComponentFixture<CreateBatchTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBatchTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBatchTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
