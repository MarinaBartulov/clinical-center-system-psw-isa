import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MedicalRecord } from 'src/app/shared/model/MedicalRecord';

@Component({
  selector: 'app-change-medical-record-dialog',
  templateUrl: './change-medical-record-dialog.component.html',
  styleUrls: ['./change-medical-record-dialog.component.css']
})
export class ChangeMedicalRecordDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: MedicalRecord) {}

  Cancel(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
  }

}
