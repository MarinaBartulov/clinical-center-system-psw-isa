import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HpNurseComponent } from './hp-nurse.component';

describe('HpNurseComponent', () => {
  let component: HpNurseComponent;
  let fixture: ComponentFixture<HpNurseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HpNurseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HpNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
