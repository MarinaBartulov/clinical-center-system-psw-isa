import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-diagnosis-dialog',
  templateUrl: './edit-diagnosis-dialog.component.html',
  styleUrls: ['./edit-diagnosis-dialog.component.css']
})
export class EditDiagnosisDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  Cancel(): void {
    this.dialogRef.close();
  }

}
