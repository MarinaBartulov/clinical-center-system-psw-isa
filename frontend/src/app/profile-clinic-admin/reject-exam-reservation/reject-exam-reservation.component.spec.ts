import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectExamReservationComponent } from './reject-exam-reservation.component';

describe('RejectExamReservationComponent', () => {
  let component: RejectExamReservationComponent;
  let fixture: ComponentFixture<RejectExamReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectExamReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectExamReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
