import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRateDialog } from './doctor-rate-dialog.component';

describe('DoctorRateDialogComponent', () => {
  let component: DoctorRateDialog;
  let fixture: ComponentFixture<DoctorRateDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorRateDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorRateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
