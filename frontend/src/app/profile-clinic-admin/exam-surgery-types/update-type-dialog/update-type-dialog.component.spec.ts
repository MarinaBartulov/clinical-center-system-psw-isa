import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeDialogComponent } from './update-type-dialog.component';

describe('UpdateTypeDialogComponent', () => {
  let component: UpdateTypeDialogComponent;
  let fixture: ComponentFixture<UpdateTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
