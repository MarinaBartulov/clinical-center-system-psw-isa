import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTypeDialogComponent } from './new-type-dialog.component';

describe('NewTypeDialogComponent', () => {
  let component: NewTypeDialogComponent;
  let fixture: ComponentFixture<NewTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
