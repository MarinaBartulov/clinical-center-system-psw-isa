import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CodebookItem } from '../CodebookItem';


@Component({
  selector: 'app-new-diagnosis-dialog',
  templateUrl: './new-diagnosis-dialog.component.html',
  styleUrls: ['./new-diagnosis-dialog.component.css']
})
export class NewDiagnosisDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: CodebookItem) { 

    }

  ngOnInit() {
  }

  Cancel(): void {
    this.dialogRef.close();
  }

}
