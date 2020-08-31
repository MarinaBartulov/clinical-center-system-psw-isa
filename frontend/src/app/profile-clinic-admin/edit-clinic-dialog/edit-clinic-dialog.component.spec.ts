import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClinicDialogComponent } from './edit-clinic-dialog.component';

describe('EditClinicDialogComponent', () => {
  let component: EditClinicDialogComponent;
  let fixture: ComponentFixture<EditClinicDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClinicDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClinicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
