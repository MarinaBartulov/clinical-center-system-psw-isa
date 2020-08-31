import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDoctorDialogComponent } from './details-doctor-dialog.component';

describe('DetailsDoctorDialogComponent', () => {
  let component: DetailsDoctorDialogComponent;
  let fixture: ComponentFixture<DetailsDoctorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDoctorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDoctorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
