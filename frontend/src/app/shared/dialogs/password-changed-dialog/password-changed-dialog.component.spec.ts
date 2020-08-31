import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangedDialogComponent } from './password-changed-dialog.component';

describe('PasswordChangedDialogComponent', () => {
  let component: PasswordChangedDialogComponent;
  let fixture: ComponentFixture<PasswordChangedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordChangedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
