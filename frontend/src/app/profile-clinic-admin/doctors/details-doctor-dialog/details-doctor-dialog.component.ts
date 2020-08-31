import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Doctor } from 'src/app/shared/model/Doctor';
import { Time } from 'src/app/shared/model/Time';

@Component({
  selector: 'app-details-doctor-dialog',
  templateUrl: './details-doctor-dialog.component.html',
  styleUrls: ['./details-doctor-dialog.component.css']
})
export class DetailsDoctorDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Doctor) {

      if(data.workingHoursStart[0] < 10){
        this.startHour = "0" + data.workingHoursStart[0];
      }else{
        this.startHour = "" + data.workingHoursStart[0];
      }
      if(data.workingHoursStart[1] < 10){
        this.startMinute = "0" + data.workingHoursStart[1];
      }else{
        this.startMinute = "" + data.workingHoursStart[1];
      }
      if(data.workingHoursEnd[0] < 10){
        this.endHour = "0" + data.workingHoursEnd[0];
      }else{
        this.endHour = "" + data.workingHoursEnd[0];
      }
      if(data.workingHoursEnd[1] < 10){
        this.endMinute = "0" + data.workingHoursEnd[1];
      }else{
        this.endMinute = "" + data.workingHoursEnd[1];
      }


      this.workingHoursStart = this.startHour + ":" + this.startMinute;
      this.workingHoursEnd = this.endHour + ":" + this.endMinute;
    }

    private workingHoursStart: String;
    private workingHoursEnd: String;
    private startHour: String;
    private startMinute: String;
    private endHour: String;
    private endMinute: String;

  Cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
