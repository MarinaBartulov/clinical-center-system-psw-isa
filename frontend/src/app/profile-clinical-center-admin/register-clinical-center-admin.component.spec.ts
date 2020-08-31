import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClinicalCenterAdminComponent } from './register-clinical-center-admin.component';

describe('RegisterClinicalCenterAdminComponent', () => {
  let component: RegisterClinicalCenterAdminComponent;
  let fixture: ComponentFixture<RegisterClinicalCenterAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterClinicalCenterAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClinicalCenterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
