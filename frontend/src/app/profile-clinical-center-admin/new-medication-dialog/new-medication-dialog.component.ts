import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RejectRequestObject } from '../RejectRequestObject';
import { CodebookItem } from '../CodebookItem';


@Component({
  selector: 'app-new-medication-dialog',
  templateUrl: './new-medication-dialog.component.html',
  styleUrls: ['./new-medication-dialog.component.css']
})
export class NewMedicationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: CodebookItem) {

     }

  ngOnInit() {
  }

  Cancel(): void {
    this.dialogRef.close();
  }

}
