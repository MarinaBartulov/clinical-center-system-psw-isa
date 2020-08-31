import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiagnosisDialogComponent } from './create-diagnosis-dialog.component';

describe('CreateDiagnosisDialogComponent', () => {
  let component: CreateDiagnosisDialogComponent;
  let fixture: ComponentFixture<CreateDiagnosisDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDiagnosisDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiagnosisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
