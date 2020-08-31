import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChanger } from './../shared/model/PasswordChanger';
import { PatientService } from './../service/patient.service';
import { AuthService } from './../service/auth.service';
import { FirstLoginDialogComponent } from '../shared/dialogs/first-login-dialog/first-login-dialog.component';
import { Router } from '@angular/router';
import { AbsenceService } from '../service/absence.service';
import { NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { InfoDialogComponent } from '../shared/dialogs/info-dialog/info-dialog.component';
import { AbsenceRequest } from '../shared/model/AbsenceRequest';
import { PrescriptionService } from '../service/prescription.service';
import { Prescription } from '../shared/model/Prescription';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-hp-nurse',
  templateUrl: './hp-nurse.component.html',
  styleUrls: ['./hp-nurse.component.css']
})
export class HpNurseComponent implements OnInit {

  constructor(private _authService: AuthService, 
              private _patientService:PatientService, 
              private _router: Router,
              private _dialog: MatDialog,
              private _absenceService:AbsenceService, 
              private _calendar: NgbCalendar,
              private _prescriptionService: PrescriptionService,
              private _notifier: NotifierService) { 

    //this.fromDate = _calendar.getToday();
    //this.toDate = _calendar.getNext(_calendar.getToday(), 'd', 10);

  }

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  private _currentNurse: any;
  private _currentPatient: any;
  private _patients: any;
  private _prescriptions: Prescription[];
  private _numOfPrescriptions: number;
  private _passwordChanger: PasswordChanger;
  private _selectedType: String;
  private _typesAbsence = [
   {value: 'Paid_vacation', viewValue: 'Paid vacation'},
   {value: 'Unpaid_leave', viewValue: 'Unpaid leave'},
   {value: 'Sick_leave', viewValue: 'Sick leave'}
 ];

  private _showList: boolean;
  private _showPatient: boolean;
  private _showFormRequest: boolean;
  private _showPrescriptions: boolean;
  

  ngOnInit() {
    this._currentNurse = JSON.parse(localStorage.getItem('currentUser'));
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    this._passwordChanger = new PasswordChanger("","");
    if(this._currentNurse.passwordChanged == false){
      let ref1 = this._dialog.open(FirstLoginDialogComponent,{
          disableClose: true,
          width: '50%',
          data: this._passwordChanger
      });
    }
    this._patientService.getAllPatients().subscribe(patients => {
      this._patients = patients;     
     });

    this._prescriptionService.getPrescriptions().subscribe(prescriptions => {
      this._prescriptions = prescriptions;     
      this._numOfPrescriptions = this._prescriptions.length;
     });

    this.fromDate = this._calendar.getToday();
    this.toDate = this._calendar.getNext(this._calendar.getToday(), 'd', 10);

    this._showList = false;
    this._showPatient = false;
    this._showFormRequest = false;
    this._showPrescriptions = false;
  }

  showAllPatients(){
      this._showList = !this._showList;
      this._showPatient = false;  
      this._showFormRequest = false;
      this._showPrescriptions = false;    
  }

  showDetails(id){
    this._patientService.getPatient(id).subscribe(patient => {
      this._currentPatient = patient;
      this._showList = false;
      this._showPatient = true;
    })
  }

  

  showFormRequest(){
    this._showFormRequest = true;
    this._showList = false;
    this._showPatient = false;
    this._showPrescriptions = false;  
    this.fromDate = this._calendar.getToday();
    this.toDate = this._calendar.getNext(this._calendar.getToday(), 'd', 10);
    this._selectedType = "";
  }

  showPrescriptions(){
    this._showPrescriptions = !this._showPrescriptions;
    this._showList = false;
    this._showPatient = false;
    this._showFormRequest = false;
  }

  clickVerify(prescription)
  {
    this._prescriptionService.verify(prescription.id).subscribe(data=>{
      
        this._prescriptionService.getPrescriptions().subscribe( prescriptions => {
              this._prescriptions = prescriptions;
              this._numOfPrescriptions = this._prescriptions.length;
            if(this._numOfPrescriptions == 0)
            {
              this._showPrescriptions = false;
            }         
        })
        this._notifier.notify("success","Prescription successfully verified");
              setTimeout(() => {
                this._notifier.hideAll();
              }, 2000)
        },
        error => {
          this._notifier.notify("error","Error verifying prescriptions");
            setTimeout(() => {
          this._notifier.hideAll();
          }, 2000)

    })
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


      this._absenceService.sendRequestNurse(absenceRequest).subscribe(
        res => {
          let dialogRef1 = this._dialog.open(InfoDialogComponent, {
            width: '50%',
            data: "Absence request sent."
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
    this._showFormRequest = false;
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

  cancelAbsence(){
    this._showFormRequest = false;
  }

  goBack(){ //vraca na listu pacijenata
    this._showPatient = false;
    this._showList = true;
  }

  clickedLogout(){
    this._authService.logout();
  }

  clickedProfile(){
    this._router.navigate(['/medicalStaffProfile']);
  }

  clickedWorkCalendar(){
    this._router.navigate(['/workCalendar']);
  }

  clickedBack(){
    this._showPatient = false;
    this._showList = false;
    this._showPrescriptions = false;  
  }
}
