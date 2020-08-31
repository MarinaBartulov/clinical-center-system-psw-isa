import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { PatientService } from '../service/patient.service';
import { MedicalRecord } from './medical-record/MedicalRecord';
import { MedicalExamService } from '../service/medical-exam-service';
import { SurgeryService } from '../service/surgery.service';
import { MatDialog } from '@angular/material';
import { DoctorRateDialog } from '../shared/dialogs/doctor-rate-dialog/doctor-rate-dialog.component'
import { Doctor } from './doctors-list/Doctor';
import { Clinic } from './clinic-list/Clinic';
import { ClinicRateDialogComponent } from '../shared/dialogs/clinic-rate-dialog/clinic-rate-dialog.component';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-hp-patient',
  templateUrl: './hp-patient.component.html',
  styleUrls: ['./hp-patient.component.css']
})
export class HpPatientComponent implements OnInit {
  private _signUpUser: any = JSON.parse(localStorage.getItem('currentUser'));


  show: boolean;
  showMedicalRecord: boolean;
  showHome: boolean;
  showClinics: boolean;
  _medicalRecord: MedicalRecord;
  showExams: boolean;
  _medicalExams: any;
  showSurge: boolean;
  _surgeries: any;
  notPatient: boolean;
  message: any;
  _patientId: any;
  _disabled: boolean;

  //for doctors
  numOfReviews: Number = 0;
  _doctorsForRate: Doctor[];

  //for clinics
  clinicsReviews: Number = 0;
  _doc: Doctor[];
  _leftClinics: Clinic[];



  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService, private _userService: UserService, private _patientService: PatientService,
    private _medicalExamsService: MedicalExamService, private _surgeryService: SurgeryService, private _dialog: MatDialog,
    private _notifier: NotifierService) {


  }


  ngOnInit() {

    this.showExams = false;
    this.showSurge = false;
    //
    this.notPatient = false;
    document.getElementById("hidden").hidden = this.notPatient;
    document.getElementById("notHidden").hidden = !this.notPatient;
    document.getElementById("hidden2").hidden = this.notPatient;
    document.getElementById("notHidden2").hidden = !this.notPatient;
    // 
    if (this._signUpUser.authorities[0]['authority'] == 'ROLE_PATIENT') {
      this.notPatient = false;
      this.patientMedicalRecord(this._signUpUser.id);
      this._patientId = this._signUpUser.id;
      this.message = "Home page for patient:";
      this._disabled = true;

      //if we have any unrated doctors
      this._patientService.getRatedDoctors(this._patientId).subscribe(doctors => {
        this._doctorsForRate = doctors;
        console.log("Found doctors : ", doctors);
        this.numOfReviews = this._doctorsForRate.length;
      })

      //if we have any unrated clinics 
      this._patientService.getRatedClinics(this._patientId).subscribe(clinics => {
        this._leftClinics = clinics;
        this.clinicsReviews = this._leftClinics.length;
      })

    } else {

      this._route.paramMap.subscribe(params => {
        this._patientId = params.get('id');
      });
      this.notPatient = true;
      this.patientMedicalRecord(this._patientId);
      this.message = "Patient #" + this._patientId + ", Doctor: ";
      this._disabled = false;
    }
    this.uncheckAll(false);

    document.getElementById("hidden").hidden = this.notPatient;
    document.getElementById("notHidden").hidden = !this.notPatient;
    document.getElementById("hidden2").hidden = this.notPatient;
    document.getElementById("notHidden2").hidden = !this.notPatient;

    this._medicalRecord = new MedicalRecord();
  }
  patientMedicalRecord(id) {
    this._patientService.getPatientMedicalRecord(id).subscribe(medRecord => {
      console.log(medRecord);
      this._medicalRecord = medRecord;
    })
  }
  onClickedLogout() {
    this._authService.logout();
  }
  //Review for doctors
  giveReview() {
    let dialog = this._dialog.open(DoctorRateDialog, {
      id: this._patientId,
      width: '30%',
      data: this._doctorsForRate,
    });
    dialog.afterClosed().subscribe(data => {
      this._patientService.getRatedDoctors(this._patientId).subscribe(doctors => {

        this._doctorsForRate = doctors;
        console.log("Found doctors : ", doctors);
        this.numOfReviews = this._doctorsForRate.length;

      });

    });
  }

  clinicReview() {
    let dialog = this._dialog.open(ClinicRateDialogComponent, {
      id: this._patientId,
      width: '30%',
      data: this._leftClinics,
    });
    dialog.afterClosed().subscribe(data => {
      this._patientService.getRatedClinics(this._patientId).subscribe(clinics => {

        this._leftClinics = clinics;

        this.clinicsReviews = this._leftClinics.length;



      });

    });




  }
  showProfileInfo() {
    this._userService.getMyInfo().subscribe(
      user => {
        this._signUpUser = user;
        this.show = this.uncheckAll(this.show);
        this.show = this.check(this.show);
      }
    );   
  }

  
  showMedicalRecordInfo() {
    if (this._signUpUser.authorities[0]['authority'] == 'ROLE_PATIENT') {
      this.patientMedicalRecord(this._signUpUser.id);
    } else {
      this.patientMedicalRecord(this._patientId);
    }
    this.showMedicalRecord = this.uncheckAll(this.showMedicalRecord);
    this.showMedicalRecord = this.check(this.showMedicalRecord);

  }
  showListOfClinics() {
    this.showClinics = this.uncheckAll(this.showClinics);
    this.showClinics = this.check(this.showClinics);

  }
  showMedicalExams() {
    this._medicalExamsService.getMedicalExam(this._patientId).subscribe(exams => {
      console.log("medical exams" + exams);
      // console.log(exams.JSON)
      this._medicalExams = exams;
      this.showExams = this.uncheckAll(this.showExams);
      this.showExams = this.check(this.showExams);
    })
  }
  showSurgeries() {

    this._surgeryService.getSurgeries(this._patientId).subscribe(surgeries => {
      console.log("Surgeries:" + surgeries);
      this._surgeries = surgeries;
      this.showSurge = this.uncheckAll(this.showSurge);
      this.showSurge = this.check(this.showSurge);

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
  uncheckAll(check): boolean {
    this.show = false;
    this.showHome = false;
    this.showMedicalRecord = false;
    this.showClinics = false;
    this.showExams = false;
    this.showSurge = false;
    return check;
  }
  onClickedBack() {
    this._router.navigate(['/doctorHP']);
  }


}
