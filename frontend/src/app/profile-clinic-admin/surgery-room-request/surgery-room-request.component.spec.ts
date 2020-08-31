import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryRoomRequestComponent } from './surgery-room-request.component';

describe('SurgeryRoomRequestComponent', () => {
  let component: SurgeryRoomRequestComponent;
  let fixture: ComponentFixture<SurgeryRoomRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryRoomRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryRoomRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
