import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMedicalStaffComponent } from './profile-medical-staff.component';

describe('ProfileMedicalStaffComponent', () => {
  let component: ProfileMedicalStaffComponent;
  let fixture: ComponentFixture<ProfileMedicalStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMedicalStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMedicalStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
