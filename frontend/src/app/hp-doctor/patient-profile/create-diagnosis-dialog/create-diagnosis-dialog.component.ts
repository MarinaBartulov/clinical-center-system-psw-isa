import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DiagnosisService } from 'src/app/service/diagnosis.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-diagnosis-dialog',
  templateUrl: './create-diagnosis-dialog.component.html',
  styleUrls: ['./create-diagnosis-dialog.component.css']
})
export class CreateDiagnosisDialogComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private _diagnosesService: DiagnosisService,
    private _notifier: NotifierService) { }

    private _diagnoses: any

  ngOnInit() {
    this._diagnosesService.getDiagnosis().subscribe( diagnoses => {
      this._diagnoses = diagnoses;
    })
  }

  clickAddDiagnosis(diagnosis){
    this.data.push(diagnosis); 
      this._notifier.notify("success","Diagnosis added");
        setTimeout(() => {
         this._notifier.hideAll();
       }, 2000)
  }

  Cancel(): void {
    this.dialogRef.close();
  }
}
