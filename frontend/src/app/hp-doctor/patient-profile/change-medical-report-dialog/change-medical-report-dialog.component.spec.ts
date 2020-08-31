import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMedicalReportDialogComponent } from './change-medical-report-dialog.component';

describe('ChangeMedicalReportDialogComponent', () => {
  let component: ChangeMedicalReportDialogComponent;
  let fixture: ComponentFixture<ChangeMedicalReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMedicalReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMedicalReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
