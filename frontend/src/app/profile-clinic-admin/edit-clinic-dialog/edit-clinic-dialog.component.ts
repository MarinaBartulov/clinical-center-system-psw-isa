import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Clinic } from 'src/app/shared/model/Clinic';

@Component({
  selector: 'app-edit-clinic-dialog',
  templateUrl: './edit-clinic-dialog.component.html',
  styleUrls: ['./edit-clinic-dialog.component.css']
})
export class EditClinicDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Clinic) {}

  Cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

