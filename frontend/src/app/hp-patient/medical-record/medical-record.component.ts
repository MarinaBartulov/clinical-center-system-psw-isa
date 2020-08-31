import { Component, OnInit, Input } from '@angular/core';
import { MedicalRecord } from './MedicalRecord';
import { PatientService } from './../../service/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { MedicationDialogComponent } from './../../shared/dialogs/medication-dialog/medication-dialog.component';
import { DiagnosisDialogComponent } from './../../shared/dialogs/diagnosis-dialog/diagnosis-dialog.component';




@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {
  @Input("_medicalRecord") _medicalRecord: MedicalRecord;
  @Input("_disabled") _disabled: boolean;
  @Input("_patientId") _patientId : any;
  allergicMedication: boolean;
  allergicMedicationList : any;
  chronicCondition: boolean;
  chronicConditionList: any;

  constructor(private _patientService: PatientService,private _dialog: MatDialog) { }

  ngOnInit() {
    this.allergicMedication = true;
    this.chronicCondition = true;
  }
  //for doctors
  onChangeMedicalRecord() {
  
 
    this._patientService.editPatientMedicalRecord(this._patientId,this._medicalRecord).subscribe(
    data => {
    },
    error => {
      alert("Patient info change error.");
      console.log(this._medicalRecord);
      console.log(this._patientId)
    })
  }

  onShowAllergicMedication() {
    this.allergicMedication = this.check(this.allergicMedication);

    this._patientService.getPatientAlergicMed(this._patientId).subscribe(allergicMed => {
      this.allergicMedicationList = allergicMed;
      console.log(this.allergicMedicationList)

    })
  

  }
  onShowChronicCondition() {
    this.chronicCondition = this.check(this.chronicCondition);
    
    this._patientService.getPatientChronicCon(this._patientId).subscribe(chronicCon => {
      this.chronicConditionList = chronicCon;
      console.log(this.chronicConditionList)

    })
  }
  check(check: boolean): boolean {
    if (check == true) {
      check = false;
    } else {
      check = true;
    }
    return check;

  }
  addAllergenMedication(){
    let dialogRef = this._dialog.open(MedicationDialogComponent, {
      width: '50%',
      data: this._patientId,
    });
    this.allergicMedication = true;
  }
  addChronicCondition(){
    let dialogRef = this._dialog.open(DiagnosisDialogComponent, {
      width: '50%',
      data: this._patientId,
    });
    this.chronicCondition = true;

  }
}

