import { Component, OnInit, Inject, Input } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DoctorService } from 'src/app/service/doctor.service';
import { Rate } from '../../model/Rate';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'doctor-rate-dialog',
  templateUrl: './doctor-rate-dialog.component.html',
  styleUrls: ['./doctor-rate-dialog.component.css']
})
export class DoctorRateDialog implements OnInit {

  constructor( public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any,
   private _doctorService : DoctorService,private _notifier:NotifierService) { }
  private _rate : any = 0;
  private _doctors : any;
  private _doctor : any;
  private hide = true;
  private _patientId : any;
  private rate : Rate;
  ngOnInit() {
    this._doctors = this.data;
    this._patientId = this.dialogRef.id;
  }

  onCancelDialog(){

    this.Cancel();
  }
  Cancel(): void {
    this.dialogRef.close();
  }
  onSubmit() { 
    this.rate = new Rate();
    this.rate.patient_id = this._patientId;
    this.rate.rate = this._rate;

    this._doctorService.rateDoctor(this._doctor.id,this.rate).subscribe(doctor => {
      this._notifier.notify("success", "Thanks for doctor rate! :D");
      setTimeout(() => {
      this._notifier.hideAll();
      }, 2000)
      this.dialogRef.close();
    })
  }
  doctorForRate(doctor){
    this.hide = false;
    this._doctor = doctor;

  }
}
