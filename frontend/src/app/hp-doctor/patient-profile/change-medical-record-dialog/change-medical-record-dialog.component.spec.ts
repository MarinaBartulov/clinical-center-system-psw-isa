import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMedicalRecordDialogComponent } from './change-medical-record-dialog.component';

describe('ChangeMedicalRecordDialogComponent', () => {
  let component: ChangeMedicalRecordDialogComponent;
  let fixture: ComponentFixture<ChangeMedicalRecordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMedicalRecordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMedicalRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
