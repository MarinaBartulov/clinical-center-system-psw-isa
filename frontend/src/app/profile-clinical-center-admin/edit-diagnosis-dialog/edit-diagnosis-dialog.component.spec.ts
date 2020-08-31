import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiagnosisDialogComponent } from './edit-diagnosis-dialog.component';

describe('EditDiagnosisDialogComponent', () => {
  let component: EditDiagnosisDialogComponent;
  let fixture: ComponentFixture<EditDiagnosisDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDiagnosisDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiagnosisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
