import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiagnosisDialogComponent } from './add-diagnosis-dialog.component';

describe('AddDiagnosisDialogComponent', () => {
  let component: AddDiagnosisDialogComponent;
  let fixture: ComponentFixture<AddDiagnosisDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiagnosisDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiagnosisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
