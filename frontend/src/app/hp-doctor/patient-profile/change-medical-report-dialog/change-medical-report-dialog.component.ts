import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MedicalReport } from 'src/app/shared/model/MedicalReport';
import { MedicalReportService } from 'src/app/service/medical-report-service';
import { Prescription } from 'src/app/shared/model/Prescription';
import { AddDiagnosisDialogComponent } from '../add-diagnosis-dialog/add-diagnosis-dialog.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-change-medical-report-dialog',
  templateUrl: './change-medical-report-dialog.component.html',
  styleUrls: ['./change-medical-report-dialog.component.css']
})
export class ChangeMedicalReportDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: MedicalReport,
    private _medicalReportService: MedicalReportService,
    private _dialog: MatDialog,
    private _notifier: NotifierService,) {

    }

  private _diagnosis: any[];
  private _prescriptions: Prescription[];
  private _currentDoctor: any;

  private _canChange: boolean;

  Cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    this._medicalReportService.getPrescriptions(this.data.id.toString()).subscribe(presc => {
      this._prescriptions = presc;
    });

    this._medicalReportService.getDiagnosis(this.data.id.toString()).subscribe(diagnosis => {
      this._diagnosis = diagnosis;
    });
    
    this._currentDoctor = JSON.parse(localStorage.getItem('currentUser'));
    if(this.data.doctor.id == this._currentDoctor.id )
    {
      this._canChange = true;
    }
    else 
    {
      this._canChange = false;
    }
  }

  clickAddDiagnosis(){
    
    let dialogRef = this._dialog.open(AddDiagnosisDialogComponent, {
      width: '50%',
      data: this.data.id,
    });
    dialogRef.afterClosed().subscribe( result =>{
      this._medicalReportService.getDiagnosis(this.data.id.toString()).subscribe(diagnosis => {
        this._diagnosis = diagnosis;
      });
    });
  }

  clickDeleteDiagnosis(diagnosis)
  {
    this._medicalReportService.deleteDiagnosis(this.data.id.toString(),diagnosis).subscribe( result =>{
      this._medicalReportService.getDiagnosis(this.data.id.toString()).subscribe(diagnosis => {
        this._diagnosis = diagnosis;
      });
      this._notifier.notify("success","Diagnose deleted");
        setTimeout(() => {
         this._notifier.hideAll();
       }, 2000)
    });
  }

}
