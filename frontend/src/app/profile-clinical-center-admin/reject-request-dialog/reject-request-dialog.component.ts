import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RejectRequestObject } from '../RejectRequestObject';

@Component({
  selector: 'app-reject-request-dialog',
  templateUrl: './reject-request-dialog.component.html',
  styleUrls: ['./reject-request-dialog.component.css']
})
export class RejectRequestDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: RejectRequestObject) { 

    }

  ngOnInit() {
  }

  Cancel(): void {
    this.dialogRef.close();
  }
}
