import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDiagnosisDialogComponent } from './new-diagnosis-dialog.component';

describe('NewDiagnosisDialogComponent', () => {
  let component: NewDiagnosisDialogComponent;
  let fixture: ComponentFixture<NewDiagnosisDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDiagnosisDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDiagnosisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
