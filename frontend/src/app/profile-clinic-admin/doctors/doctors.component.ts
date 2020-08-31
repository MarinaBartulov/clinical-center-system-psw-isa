import { TypesService } from './../../service/types.service';
import { FormControl } from '@angular/forms';
import { DoctorService } from './../../service/doctor.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DoctorSearch } from 'src/app/shared/model/DoctorSearch';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { Doctor } from 'src/app/shared/model/Doctor';
import { DetailsDoctorDialogComponent } from './details-doctor-dialog/details-doctor-dialog.component';
import { Time } from 'src/app/shared/model/Time';
import { TypeReg } from 'src/app/shared/model/TypeReg';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _doctorService: DoctorService, private _router: Router, private _dialog: MatDialog, private _typesService: TypesService) { }

  private _currentAdmin: any;
  private _clinicId: String;
  private _showTable: boolean;
  private _showMsg: boolean;
  private _showForm: boolean;
  private _shownSearch: boolean;
  private _shownAll: boolean;
  private _emptyForm: boolean;
  private _foundDoctors: DoctorSearch[];
  private _searchDoctor: DoctorSearch;
  private _detailsDoctor: Doctor;
  private _newDoctor: Doctor;
  private _workingHoursStartTemp: Time;
  private _workingHoursEndTemp: Time;
  private _examTypesId = []; //za registraciju
  private _surgeryTypesId = [];
  private _examTypeList: TypeReg[]; //za prikaz liste tipova u selektu kod registracije
  private _surgeryTypeList: TypeReg[];
  private _confirmPassword: String;

  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
      this._clinicId = params.get('id'); 
      this._showTable = false;
      this._showMsg = false;
      this._showForm = false;
      this._shownAll = false;
      this._shownSearch = false;
      this._searchDoctor = new DoctorSearch;
      this._detailsDoctor = new Doctor;
      this._newDoctor = new Doctor;
      this._searchDoctor.name = "";
      this._searchDoctor.surname = "";
      this._searchDoctor.serialNumber = "";
      

    });
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));

  }

  showAllDoctors(){

      this._doctorService.getAllDoctors(this._clinicId).subscribe(
        res => {
          if(res.length != 0){
            this._foundDoctors = res;
            this._showTable = true;
            this._showMsg = false;
            this._shownSearch = false;
            this._showForm = false;
            this._shownAll = true;
          }else{
            let dialogRef1 = this._dialog.open(InfoDialogComponent, {
              width: '50%',
              data: "This clinic doesn't have any doctors."
            });
          }
        },
        error => {
          let dialogRef1 = this._dialog.open(InfoDialogComponent, {
            width: '50%',
            data: error.error
          });
        }
      )

  }

  onClickedSearch(){
    if((this._searchDoctor.name == "" || this._searchDoctor.name == undefined) && (this._searchDoctor.surname == "" || this._searchDoctor.surname == undefined) && (this._searchDoctor.serialNumber == "" ||
     this._searchDoctor.serialNumber == undefined)){  
      this._emptyForm = true;
        setTimeout(() => {
          this._emptyForm = false;
        }, 5000)
    }else{
      if(this._searchDoctor.name == undefined)
          this._searchDoctor.name = "";
       if(this._searchDoctor.surname == undefined)
          this._searchDoctor.surname = "";
       if(this._searchDoctor.serialNumber == undefined)
          this._searchDoctor.serialNumber = "";    
      this._foundDoctors = [];
      this._doctorService.searchDoctors(this._searchDoctor,this._clinicId).subscribe(
        res => {
            this._foundDoctors = res;
            if(res.length != 0){
              this._showMsg = false;
              this._showTable = true;
              this._showForm = false;
              this._shownAll = false;
              this._shownSearch = true;
            }else{
              this._showMsg = true;
              this._showTable = false;
              this._showForm = false;
              this._shownAll = false;
              this._shownSearch = true;
            }
        },
        error => {
          let dialogRef1 = this._dialog.open(InfoDialogComponent, {
            width: '50%',
            data: error.error
          });
        }
      )
    }
  }

  removeDoctor(id){

    this._doctorService.removeDoctor(id).subscribe(
      res => {
        let dialogRef1 = this._dialog.open(InfoDialogComponent, {
          width: '50%',
          data: "You have successfully removed the doctor."
        });
        if(this._shownAll){
          this.showAllDoctors();
        }else{
          this.onClickedSearch();
        }
      },
      error => {
        let dialogRef1 = this._dialog.open(InfoDialogComponent, {
          width: '50%',
          data: error.error
        });
      }
    )
  }

  showDetails(id){
    this._doctorService.getDoctor(id).subscribe(
      res => {
        this._detailsDoctor = res;
        console.log(this._detailsDoctor);
        let dialogRef1 = this._dialog.open(DetailsDoctorDialogComponent, {
          width: '50%',
          data: this._detailsDoctor
        });
      }
    )
  }

  showForm(){
    this._typesService.getTypesForReg(this._clinicId).subscribe(
      res => {
        this._examTypeList = res.examTypeRegs;
        this._surgeryTypeList = res.surgeryTypeRegs;
        
      }
    )
    this._confirmPassword = "";
    this._showTable = false;
    this._showMsg = false;
    this._showForm = true;
    this._workingHoursEndTemp = null;
    this._workingHoursStartTemp = null;
  }

  registerNewDoctor(form){
      this._newDoctor.workingHoursStart = [];
      this._newDoctor.workingHoursEnd = [];
      this._newDoctor.workingHoursStart[0] = this._workingHoursStartTemp.hour;
      this._newDoctor.workingHoursStart[1] = this._workingHoursStartTemp.minute;
      this._newDoctor.workingHoursEnd[0] = this._workingHoursEndTemp.hour;
      this._newDoctor.workingHoursEnd[1] = this._workingHoursEndTemp.minute;
      this._newDoctor.examTypesId = this._examTypesId;
      this._newDoctor.surgeryTypesId = this._surgeryTypesId;
      console.log(this._newDoctor);

      this._doctorService.addNewDoctor(this._newDoctor,this._clinicId).subscribe(
        res => {
          let dialogRef1 = this._dialog.open(InfoDialogComponent, {
            width: '50%',
            data: "You have successfully registered a new doctor."
          });
          form.reset();
          this._confirmPassword = "";
          this._workingHoursEndTemp = null;
          this._workingHoursStartTemp = null;
        },
        error => {
          let dialogRef1 = this._dialog.open(DetailsDoctorDialogComponent, {
            width: '50%',
            data: error.error
          });
        }
      )
      

  }

  cancelForm(form){
    this._showForm = false;
    form.reset();
    console.log(this._examTypesId);
    console.log(this._surgeryTypesId);
    console.log(this._workingHoursStartTemp);
    console.log(this._workingHoursEndTemp);
    

  }


  clickedBack(){
    this._router.navigate(["/clinicAdminProfile"]);
  }

  resetForm(){

    this._showTable = false;
    this._showMsg = false;
    
  }

  ctrl = new FormControl('', (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.hour < 6) {
      return {tooEarly: true};
    }
    if (value.hour > 21) {
      return {tooLate: true};
    }

    return null;
  });

  ctrl1 = new FormControl('', (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.hour < 7) {
      return {tooEarly: true};
    }
    if (value.hour > 22) {
      return {tooLate: true};
    }

    return null;
  });

}
