import { PatientSearch } from './../shared/model/PatientSearch';
import { AbsenceService } from './../service/absence.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChanger } from './../shared/model/PasswordChanger';
import { PatientService } from './../service/patient.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FirstLoginDialogComponent } from '../shared/dialogs/first-login-dialog/first-login-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { InfoDialogComponent } from '../shared/dialogs/info-dialog/info-dialog.component';
import { AbsenceRequest } from '../shared/model/AbsenceRequest';
import { Patient } from '../shared/model/Patient';
import { NotifierService } from 'angular-notifier';



@Component({
  selector: 'app-hp-doctor',
  templateUrl: './hp-doctor.component.html',
  styleUrls: ['./hp-doctor.component.css']
})
export class HpDoctorComponent implements OnInit {

  constructor(private _patientService: PatientService,private _authService: AuthService,private _absenceService:AbsenceService, private _dialog: MatDialog, private _calendar: NgbCalendar, private _notifier:NotifierService) {
        
    this.fromDate = _calendar.getToday();
    this.toDate = _calendar.getNext(_calendar.getToday(), 'd', 10);
   }

   private _currentDoctor: any;
   private _patients: Patient[];
   private _currentPatient: any;
   private _showList: boolean;
   private _showPatient: boolean;
   private _passwordChanger: PasswordChanger;
   private _showFormRequest: boolean;
   private _selectedType: String;
   private _patientSearch: PatientSearch;
   private _cities: String[];
   private _city: String;
   private _showFilterForm: boolean;
   private _typesAbsence = [
    {value: 'Paid_vacation', viewValue: 'Paid vacation'},
    {value: 'Unpaid_leave', viewValue: 'Unpaid leave'},
    {value: 'Sick_leave', viewValue: 'Sick leave'}
  ];

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  ngOnInit() {
    
    this._currentDoctor = JSON.parse(localStorage.getItem('currentUser'));
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    this._passwordChanger = new PasswordChanger("","");
    if(this._currentDoctor.passwordChanged == false){
      let ref1 = this._dialog.open(FirstLoginDialogComponent,{
          disableClose: true,
          width: '50%',
          data: this._passwordChanger
      });
    }
    this._showFormRequest = false;       
    this.fromDate = this._calendar.getToday();
    this.toDate = this._calendar.getNext(this._calendar.getToday(), 'd', 10);
    this._patientSearch = new PatientSearch();
    this._patientSearch.name = "";
    this._patientSearch.surname = "";
    this._patientSearch.serialNumber = "";
  }

  showAllPatients(){
    this._patientService.getAllPatients().subscribe(patients => {
      this._patients = patients;
      this._showList = true;
      this._showPatient = false;
      this._showFormRequest = false;
      this._showFilterForm = false;
      
     });
     this._patientService.getAllCities().subscribe(
       res => {
         this._cities = res;
       }
     )
  }

  showDetails(id){
    this._patientService.getPatient(id).subscribe(patient => {
      this._currentPatient = patient;
      this._showList = false;
      this._showPatient = true;
    })
  }

  goBack(){
    this._showPatient = false;
    this._showList = true;
  }

  clickedLogout(){
       this._authService.logout();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  sendRequestAbsence(){
    
    if(this.toDate == null){
      let dialogRef1 = this._dialog.open(InfoDialogComponent, {
        width: '50%',
        data: "You have to choose end date for your absence."
      });
    }else{
      let absenceRequest = new AbsenceRequest();
      absenceRequest.startDate = [];
      absenceRequest.endDate = [];
      absenceRequest.typeOfAbsence = this._selectedType;
      absenceRequest.startDate[0] = this.fromDate.year;
      absenceRequest.startDate[1] = this.fromDate.month;
      absenceRequest.startDate[2] = this.fromDate.day;
      absenceRequest.endDate[0] = this.toDate.year;
      absenceRequest.endDate[1] = this.toDate.month;
      absenceRequest.endDate[2] = this.toDate.day;


      this._absenceService.sendRequestDoctor(absenceRequest).subscribe(
        res => {
          let dialogRef1 = this._dialog.open(InfoDialogComponent, {
            width: '50%',
            data: "You have successfully sent request for your absence."
          });
        },
        error => {
          let dialogRef1 = this._dialog.open(InfoDialogComponent, {
            width: '50%',
            data: error.error
          });

        }
      )
    }
    console.log(this.fromDate);
    console.log(this.toDate);
  }

  cancelAbsence(){
    this._showFormRequest = false;
  }

  showFormRequest(){
    this._showFormRequest = true;
    this._showList = false;
    this._showPatient = false;
    this.fromDate = this._calendar.getToday();
    this.toDate = this._calendar.getNext(this._calendar.getToday(), 'd', 10);
    this._selectedType = "";
  }

  searchPatients(){

    this._city = "";
    if((this._patientSearch.name == "" || this._patientSearch.name == null) && (this._patientSearch.surname == "" || this._patientSearch.surname == null) && (this._patientSearch.serialNumber == "" || this._patientSearch.serialNumber==null)){
      this._notifier.notify("error","You have to enter at least one information for search.");
             setTimeout(() => {
             this._notifier.hideAll();
        }, 3000)
        return;
    }

    this._patientService.getPatientSearch(this._patientSearch).subscribe(
      res => {
           this._patients = res;
           if(this._patients.length == 0){
            this._notifier.notify("error","Your search did not match any patients...");
            setTimeout(() => {
            this._notifier.hideAll();
       }, 3000)
            this._showFilterForm = false;
           }else{
            this._showFilterForm = true;
           }
      },
      error => {
        this._notifier.notify("error",error.error);
             setTimeout(() => {
             this._notifier.hideAll();
        }, 3000)
      }

    )
  }

  reset(){
    this._patientSearch.name = "";
    this._patientSearch.surname = "";
    this._patientSearch.serialNumber = "";
    this.showAllPatients();
    this._city = "";
  }

}
