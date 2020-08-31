import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicRateDialogComponent } from './clinic-rate-dialog.component';

describe('ClinicRateDialogComponent', () => {
  let component: ClinicRateDialogComponent;
  let fixture: ComponentFixture<ClinicRateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicRateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicRateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
