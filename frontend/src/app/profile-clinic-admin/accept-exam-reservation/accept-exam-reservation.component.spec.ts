import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptExamReservationComponent } from './accept-exam-reservation.component';

describe('AcceptExamReservationComponent', () => {
  let component: AcceptExamReservationComponent;
  let fixture: ComponentFixture<AcceptExamReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptExamReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptExamReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
