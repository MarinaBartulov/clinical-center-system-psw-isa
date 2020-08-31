import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMedicationDialogComponent } from './new-medication-dialog.component';

describe('NewMedicationDialogComponent', () => {
  let component: NewMedicationDialogComponent;
  let fixture: ComponentFixture<NewMedicationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMedicationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMedicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
