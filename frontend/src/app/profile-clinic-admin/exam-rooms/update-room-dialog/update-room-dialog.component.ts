import { Room } from 'src/app/shared/model/Room';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-room-dialog',
  templateUrl: './update-room-dialog.component.html',
  styleUrls: ['./update-room-dialog.component.css']
})
export class UpdateRoomDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Room) {}

    private types: string[] = ["Medical exam", "Surgery"];

  Cancel(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}



