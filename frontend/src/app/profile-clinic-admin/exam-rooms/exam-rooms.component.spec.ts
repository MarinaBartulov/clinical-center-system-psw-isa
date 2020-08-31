import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRoomsComponent } from './exam-rooms.component';

describe('ExamRoomsComponent', () => {
  let component: ExamRoomsComponent;
  let fixture: ComponentFixture<ExamRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
