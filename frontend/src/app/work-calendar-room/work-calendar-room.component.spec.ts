import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCalendarRoomComponent } from './work-calendar-room.component';

describe('WorkCalendarRoomComponent', () => {
  let component: WorkCalendarRoomComponent;
  let fixture: ComponentFixture<WorkCalendarRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCalendarRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCalendarRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
