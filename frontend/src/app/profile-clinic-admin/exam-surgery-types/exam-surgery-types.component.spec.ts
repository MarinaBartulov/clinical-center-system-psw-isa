import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSurgeryTypesComponent } from './exam-surgery-types.component';

describe('ExamSurgeryTypesComponent', () => {
  let component: ExamSurgeryTypesComponent;
  let fixture: ComponentFixture<ExamSurgeryTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamSurgeryTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSurgeryTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
