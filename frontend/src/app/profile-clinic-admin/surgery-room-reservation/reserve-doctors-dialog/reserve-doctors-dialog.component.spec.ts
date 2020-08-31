import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveDoctorsDialogComponent } from './reserve-doctors-dialog.component';

describe('ReserveDoctorsDialogComponent', () => {
  let component: ReserveDoctorsDialogComponent;
  let fixture: ComponentFixture<ReserveDoctorsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveDoctorsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveDoctorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
