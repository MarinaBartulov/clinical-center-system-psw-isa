import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileClinicAdminComponent } from './profile-clinic-admin.component';

describe('ProfileClinicAdminComponent', () => {
  let component: ProfileClinicAdminComponent;
  let fixture: ComponentFixture<ProfileClinicAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileClinicAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileClinicAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
