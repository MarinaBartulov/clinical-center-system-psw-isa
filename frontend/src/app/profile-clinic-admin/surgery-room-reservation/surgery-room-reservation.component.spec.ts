import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryRoomReservationComponent } from './surgery-room-reservation.component';

describe('SurgeryRoomReservationComponent', () => {
  let component: SurgeryRoomReservationComponent;
  let fixture: ComponentFixture<SurgeryRoomReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryRoomReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryRoomReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
