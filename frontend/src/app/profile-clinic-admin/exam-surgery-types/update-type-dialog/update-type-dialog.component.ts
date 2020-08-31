import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Type } from 'src/app/shared/model/Type';

@Component({
  selector: 'app-update-type-dialog',
  templateUrl: './update-type-dialog.component.html',
  styleUrls: ['./update-type-dialog.component.css']
})
export class UpdateTypeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Type) { }

  ngOnInit() {
  }

  Cancel(): void {
    this.dialogRef.close();
  }

}
