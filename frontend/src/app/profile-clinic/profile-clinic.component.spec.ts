import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileClinicComponent } from './profile-clinic.component';

describe('ProfileClinicComponent', () => {
  let component: ProfileClinicComponent;
  let fixture: ComponentFixture<ProfileClinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileClinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
