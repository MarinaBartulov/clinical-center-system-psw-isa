import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileClinicalCenterAdminComponent } from './profile-clinical-center-admin.component';

describe('ProfileClinicalCenterAdminComponent', () => {
  let component: ProfileClinicalCenterAdminComponent;
  let fixture: ComponentFixture<ProfileClinicalCenterAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileClinicalCenterAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileClinicalCenterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
