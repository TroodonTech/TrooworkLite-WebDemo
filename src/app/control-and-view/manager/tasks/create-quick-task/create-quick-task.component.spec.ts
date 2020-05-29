import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuickTaskComponent } from './create-quick-task.component';

describe('CreateQuickTaskComponent', () => {
  let component: CreateQuickTaskComponent;
  let fixture: ComponentFixture<CreateQuickTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuickTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuickTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
