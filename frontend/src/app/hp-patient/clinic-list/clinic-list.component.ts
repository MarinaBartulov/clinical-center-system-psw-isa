import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Clinic } from './clinic'
import { ClinicService } from 'src/app/service/clinic.service'
import { TypeReg } from 'src/app/shared/model/TypeReg';
import { TypesService } from 'src/app/service/types.service';
import { AvailableDoctorRequest } from 'src/app/shared/model/AvailableDoctorRequest';
import { DoctorService } from 'src/app/service/doctor.service';
@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnInit {
  @Input("_patientId") _patientId : any;
  _clinic : Clinic;
  _clinics : any;
  _allClinics : any;
  imagePath : any;
  startIndex : any;
  numberOfClinics : any;
  leftArrow : String;
  rightArrow : String;
  showSpinner : boolean;
  showSpinner2 : boolean;
  showDoctors : boolean;
  showAppointments : boolean;
  doctorReq : any;

  
  private _examTypes: TypeReg[];
  private _selectedType: TypeReg;
  private _date: any;
  private doctors: any;
  private message : any;


  constructor(private _clinicService :ClinicService, private _router:Router, private _typesService : TypesService, private _doctorService : DoctorService) { }

  ngOnInit() {
    this.message = " No free appointments for that date, please try with new one!";
    this.startIndex = 0;
    this.leftArrow = "<--";
    this.rightArrow = "-->";
    this.numberOfClinics = 0;
    this.showSpinner = true;
    this.showSpinner2 = false;
    this.showDoctors = false;
    this.showAppointments = false;
    this.imagePath = "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg";

    this._typesService.getAllExamTypes().subscribe(
      res => {
        this._examTypes = res;
      });
   
  }
  searchClinics(){
    this.message = " No free appointments for that date, please try with new one!";
      this.showDoctors = false;
      this.showSpinner = true;
      let date = [this._date['year'],this._date['month'],this._date['day']];
      let doctorReq = new AvailableDoctorRequest(date,null,this._selectedType.id);
    
      console.log(doctorReq,date);
      this.showSpinner2 = true;

      this._clinicService.getFreeClinics(doctorReq).subscribe(clinics => {

      console.log("Clinics retrived : " + clinics);
      this._allClinics = null;
      this._allClinics = clinics;
      this.numberOfClinics = this._allClinics.length;
      this.startIndex = 0;
      this.showSpinner = false;
      this.showSpinner2 = false;
      this.nextClinics();
 
    

     
    },
    error => {
      this._allClinics = null;
      this.numberOfClinics = 0
      this.startIndex = 0;
      this.nextClinics();

      this.message = error.error;
      console.log(this.message);

      this.showSpinner = false;
      this.showSpinner2 = false;
    

    }); 

  }

 
  nextClinics(){
    var left = this.numberOfClinics - this.startIndex;
    console.log(left);
    var num = 0;
    if(left >= 3){
     num = 3;
    }else if(left == 2){
      num = 2;
    }else if(left == 1){
      num = 1;
    }
    this.startIndex =  this.startIndex + num;
    this.newClinics(num);

  }
  newClinics(num){
 
    this._clinics = [];
    var start = this.startIndex - num;
    var end = this.startIndex;
    for(start; start<end; start++ ){
      console.log(start,end);
      this._clinics.push(this._allClinics[start]);
    }
   
  }
  previousClinics(){
    this.startIndex =  this.startIndex - this._clinics.length;
    this.newClinics(3);

  }
  readMore(clinicId: any){
    this.showDoctors = false;
    let date = [this._date['year'],this._date['month'],this._date['day']];
    let doctorReq = new AvailableDoctorRequest(date,null,this._selectedType.id);

    console.log(doctorReq,date);
    this._doctorService.getFreeDoctors(clinicId,doctorReq).subscribe(
      doctors => {       
          this.doctors = doctors;
          console.log(doctors);
          this.doctorReq = doctorReq;
          this.showDoctors = true;
      }
    )
    
    
    

  }
  reset(){
    this._date = null;
    this._selectedType = null;
    this.showDoctors = false;
    this.showSpinner = true;
  }
  showDoctorTimes(){
    this.showAppointments = true;
  }
 

  showClinicProfile(idClinic){
    this._clinicService.getClinic(idClinic).subscribe(
      clinic => {       
           let clinicTemp:Clinic = clinic;
           localStorage.setItem("clinic",JSON.stringify(clinicTemp));
           localStorage.setItem("coordinates",null);
           this._router.navigate(['/clinicProfile/', idClinic]);
      }
    )
  }

}


