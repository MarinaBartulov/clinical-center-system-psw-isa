import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Room } from 'src/app/shared/model/Room';

@Component({
  selector: 'app-exam-room-dialog',
  templateUrl: './new-room-dialog.component.html',
  styleUrls: ['./new-room-dialog.component.css']
})
export class NewRoomDialogComponent implements OnInit {

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
