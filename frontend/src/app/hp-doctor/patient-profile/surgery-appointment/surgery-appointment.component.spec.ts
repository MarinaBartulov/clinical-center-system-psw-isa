import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryAppointmentComponent } from './surgery-appointment.component';

describe('SurgeryAppointmentComponent', () => {
  let component: SurgeryAppointmentComponent;
  let fixture: ComponentFixture<SurgeryAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
