import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HpDoctorComponent } from './hp-doctor.component';

describe('HpDoctorComponent', () => {
  let component: HpDoctorComponent;
  let fixture: ComponentFixture<HpDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HpDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HpDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
