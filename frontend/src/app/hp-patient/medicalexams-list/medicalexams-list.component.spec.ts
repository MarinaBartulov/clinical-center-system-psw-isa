import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalexamsListComponent } from './medicalexams-list.component';

describe('MedicalexamsListComponent', () => {
  let component: MedicalexamsListComponent;
  let fixture: ComponentFixture<MedicalexamsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalexamsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalexamsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
