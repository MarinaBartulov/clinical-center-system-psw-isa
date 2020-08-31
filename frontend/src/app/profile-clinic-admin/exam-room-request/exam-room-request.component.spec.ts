import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRoomRequestComponent } from './exam-room-request.component';

describe('ExamRoomRequestComponent', () => {
  let component: ExamRoomRequestComponent;
  let fixture: ComponentFixture<ExamRoomRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamRoomRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRoomRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
