import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HpPatientComponent } from './hp-patient.component';

describe('HpPatientComponent', () => {
  let component: HpPatientComponent;
  let fixture: ComponentFixture<HpPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HpPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HpPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
