import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClinicAdminComponent } from './register-clinic-admin.component';

describe('RegisterClinicAdminComponent', () => {
  let component: RegisterClinicAdminComponent;
  let fixture: ComponentFixture<RegisterClinicAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterClinicAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClinicAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
