import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastAppointmentsComponent } from './fast-appointments.component';

describe('FastAppointmentsComponent', () => {
  let component: FastAppointmentsComponent;
  let fixture: ComponentFixture<FastAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
