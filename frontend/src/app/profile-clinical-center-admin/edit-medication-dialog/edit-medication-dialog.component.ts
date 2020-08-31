import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-medication-dialog',
  templateUrl: './edit-medication-dialog.component.html',
  styleUrls: ['./edit-medication-dialog.component.css']
})
export class EditMedicationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  Cancel(): void {
    this.dialogRef.close();
  }
}
