import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicationDialogComponent } from './edit-medication-dialog.component';

describe('EditMedicationDialogComponent', () => {
  let component: EditMedicationDialogComponent;
  let fixture: ComponentFixture<EditMedicationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMedicationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
