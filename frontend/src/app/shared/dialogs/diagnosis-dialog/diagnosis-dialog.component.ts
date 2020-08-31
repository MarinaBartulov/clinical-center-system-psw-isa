import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DiagnosisService } from 'src/app/service/diagnosis.service';
import { PatientService } from 'src/app/service/patient.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-diagnosis-dialog',
  templateUrl: './diagnosis-dialog.component.html',
  styleUrls: ['./diagnosis-dialog.component.css']
})
export class DiagnosisDialogComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<any>,  @Inject(MAT_DIALOG_DATA) public data: any,
  private _diagnosesService: DiagnosisService, private _patientService : PatientService,
  private _notifier: NotifierService) { }
  private _diagnoses: any

  ngOnInit() {
    this._diagnosesService.getDiagnosis().subscribe( diagnoses => {
      this._diagnoses = diagnoses;

    })
  }
  clickAddDiagnose(diagnose){
    this.data // id
    console.log(diagnose.id) 
    this._patientService.addChronicCondition(this.data,diagnose).subscribe(
      res => {
        this._notifier.notify("success","Chronic condition added");
        setTimeout(() => {
         this._notifier.hideAll();
       }, 2000)
    },
    error => {
      console.log("Add diagnose error");
    })

    
  }

  Cancel(): void {
    this.dialogRef.close();
  }
}



