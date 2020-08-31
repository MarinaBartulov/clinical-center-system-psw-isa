import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';
import { MatDialog } from '@angular/material';
import { MedicationDialogComponent } from 'src/app/shared/dialogs/medication-dialog/medication-dialog.component';
import { DiagnosisDialogComponent } from 'src/app/shared/dialogs/diagnosis-dialog/diagnosis-dialog.component';
import { ChangeMedicalRecordDialogComponent } from './change-medical-record-dialog/change-medical-record-dialog.component';
import { NotifierService } from 'angular-notifier';
import { MedicalReport } from 'src/app/shared/model/MedicalReport';
import { ChangeMedicalReportDialogComponent } from './change-medical-report-dialog/change-medical-report-dialog.component';
import { MedicalReportService } from 'src/app/service/medical-report-service';
import { Prescription } from 'src/app/shared/model/Prescription';
import { DiagnosisService } from 'src/app/service/diagnosis.service';
import { MedicationService } from 'src/app/service/medication.service';
import { AddDiagnosisDialogComponent } from './add-diagnosis-dialog/add-diagnosis-dialog.component';
import { AddPrescriptionDialogComponent } from './add-prescription-dialog/add-prescription-dialog.component';
import { Medication } from 'src/app/shared/model/Medication';
import { CreateDiagnosisDialogComponent } from './create-diagnosis-dialog/create-diagnosis-dialog.component';
import { Diagnosis } from 'src/app/shared/model/Diagnosis';
import { TypesService } from 'src/app/service/types.service';
import { MedicalExamService } from 'src/app/service/medical-exam-service';
import { FastAppointmentService } from 'src/app/service/fastAppointment.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
      private _patientService: PatientService,
      private _medicalReportService: MedicalReportService,
      private _router: Router,
      private _dialog: MatDialog,
      private _notifier: NotifierService,
      private _diagnosesService: DiagnosisService,
      private _medicationService: MedicationService,
      private _typesService : TypesService,
      private _fAService: FastAppointmentService,
      private _medicalExamService: MedicalExamService) { 
        this._newMedicalReport = new MedicalReport();
        this._newMedications = [];
        this._newDiagnoses = [];
        this._reportDescription = "";
        this._currentExamType = "";
  }

  private _currentDoctor: any;
  private _currentPatient: any;
  private _patientId: any;
  private _medicalRecord: any;
  private _medicalRecordChanged: any;
  private _medicalReport: MedicalReport;
  private _medicalReportChanged: MedicalReport;
  private _newMedicalReport: MedicalReport;
  private _currentExam: any;
  private _reportDescription: string;
  private _currentExamType: string;

  private _allergicMedicationList: any[];
  private _chronicConditionList: any[];
  private _medicalReports: MedicalReport[];
  private _newDiagnoses: Diagnosis[];
  private _newMedications: Medication[];
  private _medicalExams: any[];
  private _fastExams: any[];

  private _showInformation: boolean;
  private _showMedicalRecord: boolean;
  private _showMedicalReports: boolean;
  private _showNewMedicalReport: boolean;
  private _medicalReportCreated: boolean;
  private _startMedicalExam: boolean;
  //private _canStartMedicalExam: boolean;
  private _endMedicalExam: boolean;
  private _canEndMedicalExam: boolean;
  private _startedMedicalExam: boolean;
  private patientInfo : any;
  //Appointment component  
  private _newAppointment : boolean;

  private _examTypes : any;
  private _doctor : any;
  //Surgery component
  private _newSurgery : boolean;
  private _surgeryTypes : any;
  

  ngOnInit() {
    this.patientInfo = "";
    this._newAppointment = false;
    this._newSurgery = false;
    this._currentDoctor = JSON.parse(localStorage.getItem('currentUser'));
    this._doctor= this._currentDoctor;

    this._route.paramMap.subscribe(params => { 
      this._patientId = params.get('id');
      this._patientService.getPatient(this._patientId).subscribe( 
        patient=> {
          this._currentPatient=patient;
          this.patientInfo = this._currentPatient.name + " " + this._currentPatient.surname;
        }
      );
    });


 
    this._patientService.getPatientMedicalRecord(this._patientId).subscribe(medRecord => {
      this._medicalRecord = medRecord;
    });

    this._patientService.getPatientAlergicMed(this._patientId).subscribe(allergicMed => {
      this._allergicMedicationList = allergicMed;
    });

    this._patientService.getPatientChronicCon(this._patientId).subscribe(chronicCon => {
      this._chronicConditionList = chronicCon;
    });
   
    this._showInformation = false;
    this._showMedicalRecord = false;
    this._showMedicalReports = false;
    this._startMedicalExam = false; 

    this._medicalReportCreated = false; 
    //this._canStartMedicalExam = true; // bice neki uslov
    this._endMedicalExam = false;
    this._canEndMedicalExam = false; // bice neki uslov;
    this._startedMedicalExam = false;
    this._showNewMedicalReport = false;
    this._newAppointment = false;
    this._newSurgery = false;
      
  }

  clickedShowInformation()
  {
    this._showInformation=!this._showInformation;
    this._showMedicalRecord = false;
    this._showMedicalReports = false;
    this._showNewMedicalReport = false;
    this._newAppointment = false;
    this._newSurgery = false;
    this._startMedicalExam = false; 
  }
  
  clickedMedicalRecord()
  {
    this._showMedicalRecord=!this._showMedicalRecord;
    this._showMedicalReports = false;
    this._showInformation = false;
    this._showNewMedicalReport = false;
    this._newAppointment = false;
    this._newSurgery = false;
    this._startMedicalExam = false; 
  }

  clickedMedicalReports()
  {
    this._patientService.getMedicalReports(this._patientId).subscribe(reports => {
      this._medicalReports = reports;
    });
    this._showMedicalReports = !this._showMedicalReports;
    this._showInformation = false;
    this._showMedicalRecord = false;
    this._showNewMedicalReport = false;
    this._newAppointment = false;
    this._newSurgery = false;
    this._startMedicalExam = false; 
  }

  clickedCreateMedicalReport()
  {
    this._showNewMedicalReport = true;
    this._showMedicalReports = false;
    this._showInformation = false;
    this._showMedicalRecord = false;
    this._newAppointment = false;
    this._newSurgery = false;
    
    this._newMedicalReport.date=this._currentExam.date;
    this._newMedicalReport.time=this._currentExam.startTime;
  }

  clickedStartMedicalExam()
  {
    if(this._startMedicalExam == false)
    {
      this._showInformation = false;
      this._showMedicalRecord = false;
      this._showMedicalReports = false;

      this._medicalExamService.getDoctorPatientExams(this._currentPatient.id.toString()).subscribe( res=>
        this._medicalExams = res
      )

      this._fAService.getDoctorPatientFastAppointments(this._currentPatient.id.toString()).subscribe( res=>
        this._fastExams = res
      )

      this._startMedicalExam = true;
    }
    else{
      this._startMedicalExam = false;
    }
       
  }

  clickedEndMedicalExam()
  {
    this._startMedicalExam = false;
    //this._canStartMedicalExam = false;
    this._endMedicalExam = false;
    this._canEndMedicalExam = false;
    this._showNewMedicalReport =  false;
    this._startedMedicalExam = false;
    this._newAppointment = false;
    this._newSurgery = false;
  }

  clickStartMedicalExam(e){
    this._currentExam = e;
    this._currentExamType = "EXAM";
    this._startMedicalExam = false;
    this._endMedicalExam = true;
    this._medicalReportCreated = false;
    this._startedMedicalExam = true;

    
  }

  clickStartFastExam(e){
    this._currentExam = e;
    this._currentExamType= "FAST";
    this._startMedicalExam = false;
    this._endMedicalExam = true;
    this._medicalReportCreated = false;
    this._startedMedicalExam = true;
  }

  clickSaveMedicalReport()
  {
    this._newMedicalReport = new MedicalReport();
    this._newMedicalReport.description = this._reportDescription;
    this._reportDescription = "";
    this._newMedicalReport.type = this._currentExamType;
    this._currentExamType = "";
    this._newMedicalReport.date=this._currentExam.date;
    this._newMedicalReport.time=this._currentExam.startTime;
    this._newMedicalReport.diagnoses=this._newDiagnoses;
    this._newMedicalReport.medications=this._newMedications;
    this._newMedicalReport.doctor=this._currentDoctor;
    this._newMedicalReport.examId = this._currentExam.id;
    this._medicalReportService.createMedicalReport(this._patientId,this._newMedicalReport).subscribe(res=> {
      this._notifier.notify("success","Medical report created");
              setTimeout(() => {
                this._notifier.hideAll();
              }, 2000)
            },
          error => {
            this._notifier.notify("error","Error creating medical report.");
              setTimeout(() => {
            this._notifier.hideAll();
            }, 2000)
    })

    this._canEndMedicalExam = true;
    this._medicalReportCreated = true;
  }

  clickedNewAppointment()
  {

   
    // console.log("ID SALJEM : " + this._patientId + "DOKTOR: "  + this._doctor);
  
    this._typesService.getDoctorExamTypes(this._currentDoctor.id).subscribe(
      res => {
        console.log(res);
        this._examTypes = res;
        this._newAppointment =  this.hideAll();
      });


  }

  clickedOpenReport(report)
  {
    this._medicalReport = report;
    let dialogRef = this._dialog.open(ChangeMedicalReportDialogComponent, {
      width: '50%',
      data: JSON.parse(JSON.stringify(report))
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
      this._medicalReportChanged = result;
      if(this._medicalReport.description != this._medicalReportChanged.description ){
            this._medicalReport = JSON.parse(JSON.stringify(this._medicalReportChanged));
            this._medicalReportService.editMedicalReport(this._medicalReport).subscribe(data => {
              this._patientService.getMedicalReports(this._patientId).subscribe(reports => {
                this._medicalReports = reports;
              });
               this._notifier.notify("success","Medical report changed");
               setTimeout(() => {
                 this._notifier.hideAll();
               }, 2000)
           },
           error => {
             this._notifier.notify("error","Change medical report failed");
               setTimeout(() => {
             this._notifier.hideAll();
             }, 2000)
           })
      }
    }
    });
  }

  clickedChangeInformation()
  {
    let dialogRef = this._dialog.open(ChangeMedicalRecordDialogComponent, {
      width: '50%',
      data: JSON.parse(JSON.stringify(this._medicalRecord))
    });
    dialogRef.afterClosed().subscribe(result => {
     if(result != undefined){
     this._medicalRecordChanged = result;
     if(this._medicalRecord.dateOfBirth != this._medicalRecordChanged.dateOfBirth || this._medicalRecord.height!= this._medicalRecordChanged.height
       || this._medicalRecord.weight != this._medicalRecordChanged.weight || this._medicalRecord.diopter != this._medicalRecordChanged.diopter
       || this._medicalRecord.bloodType != this._medicalRecordChanged.bloodType || this._medicalRecord.organDonor != this._medicalRecordChanged.organDonor){
           this._medicalRecord = JSON.parse(JSON.stringify(this._medicalRecordChanged));
           this._patientService.editPatientMedicalRecord(this._patientId,this._medicalRecord).subscribe(data => {
              this._notifier.notify("success","Medical record changed");
              setTimeout(() => {
                this._notifier.hideAll();
              }, 2000)
          },
          error => {
            this._notifier.notify("error","Change medical record failed");
              setTimeout(() => {
            this._notifier.hideAll();
            }, 2000)
          })
     }
   }
   });
  }

  addAllergicMedication(){
    let dialogRef = this._dialog.open(MedicationDialogComponent, {
      width: '50%',
      data: this._patientId,
    });
    dialogRef.afterClosed().subscribe( result =>
      {
        this._patientService.getPatientAlergicMed(this._patientId).subscribe(allergicMed => {
          this._allergicMedicationList = allergicMed;
        });
      });
  }

  clickDeleteAllergicMedication(med)
  {
    this._patientService.deleteAllergicMedication(this._patientId,med).subscribe( result =>{
      this._patientService.getPatientAlergicMed(this._patientId).subscribe(allergicMed => {
        this._allergicMedicationList = allergicMed;
      });
      this._notifier.notify("success","Allergic medication deleted");
        setTimeout(() => {
         this._notifier.hideAll();
       }, 2000)
    });
  }

  addChronicCondition(){
    let dialogRef = this._dialog.open(DiagnosisDialogComponent, {
      width: '50%',
      data: this._patientId,
    });
    dialogRef.afterClosed().subscribe( result =>{
      this._patientService.getPatientChronicCon(this._patientId).subscribe(chronicCon => {
        this._chronicConditionList = chronicCon;
      });
    });
  }

  clickDeleteChronicCondition(ch)
  {
    this._patientService.deleteChronicCondition(this._patientId,ch).subscribe( result =>{
      this._patientService.getPatientChronicCon(this._patientId).subscribe(chronicCon => {
        this._chronicConditionList = chronicCon;
      });
      this._notifier.notify("success","Chronic condition deleted");
        setTimeout(() => {
         this._notifier.hideAll();
       }, 2000)
    });
  }

  //prilikom pravljenja novog izvestaja
  clickAddPrescription(){
    let dialogRef = this._dialog.open(AddPrescriptionDialogComponent, {
      width: '50%',
      data: this._newMedications,
    });
    //dialogRef.afterClosed().subscribe(); 
  }
  //prilikom pravljenja novog izvestaja
  clickAddDiagnosis(){
    let dialogRef = this._dialog.open(CreateDiagnosisDialogComponent, {
      width: '50%',
      data: this._newDiagnoses,
    });
   // dialogRef.afterClosed().subscribe();
  }

  clickDeleteDiagnosis(i){
    this._newDiagnoses.splice(i,1);
  }

  clickDeleteMedication(i){
    this._newDiagnoses.splice(i,1);
  }

  onClickedBack(){
    this._router.navigate(['/doctorHP']);
  }

  clickedClose(){
    this._showInformation = false;
    this._showMedicalReports = false;
    this._newAppointment = false;
    this._startMedicalExam = false;
  }

  clickedRequestSurgery(){
    this._typesService.getDoctorSurgeryTypes(this._currentDoctor.id).subscribe(
      res => {
        console.log( "Surgery types :" + res);
        this._surgeryTypes = res;
        this._newSurgery = this.hideAll();
      });

  

  }

  hideAll():boolean{
    this._showInformation = false;
    this._showMedicalRecord = false;
    this._showNewMedicalReport = false;
    this._showMedicalReports = false;
    this._newAppointment = false;
    this._newSurgery = false;
    return true;
  }
}
