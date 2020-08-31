import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordWrongDialogComponent } from './password-wrong-dialog.component';

describe('PasswordWrongDialogComponent', () => {
  let component: PasswordWrongDialogComponent;
  let fixture: ComponentFixture<PasswordWrongDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordWrongDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordWrongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
