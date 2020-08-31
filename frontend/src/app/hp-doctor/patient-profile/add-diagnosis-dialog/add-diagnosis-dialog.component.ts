import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { DiagnosisService } from 'src/app/service/diagnosis.service';
import { MedicalReportService } from 'src/app/service/medical-report-service';


@Component({
  selector: 'app-add-diagnosis-dialog',
  templateUrl: './add-diagnosis-dialog.component.html',
  styleUrls: ['./add-diagnosis-dialog.component.css']
})
export class AddDiagnosisDialogComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<any>, 
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _diagnosesService: DiagnosisService,
      private _notifier: NotifierService,
      private _medicalReportService: MedicalReportService) { }

  private _diagnoses: any

  ngOnInit() {
    this._diagnosesService.getDiagnosis().subscribe( diagnoses => {
      this._diagnoses = diagnoses;
    })
  }

  clickAddDiagnose(diagnose){
    this.data // id
    console.log(diagnose.id) 
    this._medicalReportService.addDiagnosis(this.data,diagnose).subscribe(
      res => {
        this._notifier.notify("success","Diagnose added");
        setTimeout(() => {
         this._notifier.hideAll();
       }, 2000)
    },
    error => {
      this._notifier.notify("error","Diagnose already added");
        setTimeout(() => {
         this._notifier.hideAll();
       }, 2000)
    })

    
  }

  Cancel(): void {
    this.dialogRef.close();
  }

}
