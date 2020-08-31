import { Component, OnInit, Input } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Doctor } from 'src/app/hp-patient/doctors-list/Doctor'
import { DoctorService } from 'src/app/service/doctor.service';
import { AvailableDoctorRequest } from 'src/app/shared/model/AvailableDoctorRequest';
import { Appointment } from '../appointments-list/Appointment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  @Input("doctors") doctors;
  @Input("doctorReq") doctorReq : AvailableDoctorRequest;
  @Input("_patientId") _patientId : any;
 // private _selectedType: TypeReg;
  private _date: any;
  private _rating: Number;
  private _docName: String;
  private _docSurname: String;
  private doctor : any;

  sortedDoctors : Doctor[];
  appointments : any;
  showTimes : boolean;
  constructor(private _doctorService : DoctorService, private _notifier : NotifierService) { }

  ngOnInit() {
    this.sortedDoctors = this.doctors;
    this.showTimes = false;
   
  }
  showDoctorTimes(doctor: Doctor){
   
    this.doctor = doctor;
    console.log("Patient id = " + this.doctor.name + this.doctor.surname + "  ID: " + this.doctor.id);
  
    
    this.showTimes = false;
    
  
    this._doctorService.getAvailableTerms(this.doctor.id,this.doctorReq).subscribe(terms => {
      this.appointments = terms;
      console.log("Terms: " + this.appointments);

      this.showTimes = true;
   
  }); 
   

  }
  searchDoctors(){
    this.showTimes = false;
    var filter, table, tr;
    table = document.getElementById("myTable");
    console.log(this._docName);
    if(this._docName != null){
      filter = this._docName.toUpperCase();
      tr = table.getElementsByTagName("tr");
      this.hideTr(tr,filter,0);
    }
    if(this._docSurname != null){
      filter = this._docSurname.toUpperCase();
      tr = table.getElementsByTagName("tr");
      this.hideTr(tr,filter,1);
    }
    if(this._rating != null){
      filter = this._rating;
      tr = table.getElementsByTagName("tr");
      this.hideRating(tr,filter,2);
    }
   

    console.log(filter);
  

  }

  hideTr(tr: any,filter:any, rowNum: any){
    var i,td,txtValue;
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[rowNum];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }

  }
  hideRating(tr: any,filter:any, rowNum: any){
    var i,td,txtValue;
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[rowNum];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue == filter) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }

  }
  resetChild(change : any){
   
    if(change){
      this._notifier.notify("success","Appointment request sent! Please wait for responese!");
      setTimeout(() => {
      this._notifier.hideAll();
      this.reset();
     
    }, 2000)

    }else {
      this._notifier.notify("error","Appointment already taken! Please wait for reloading...");
      setTimeout(() => {
      this._notifier.hideAll();
      this.reset();
     
    }, 2000)
    }
 


  }
  reset(){
    this._docName = null;
    this._docSurname = null;
    this._rating = null;
    var table = document.getElementById("myTable");
    var tr = table.getElementsByTagName("tr");
    var i;
    for (i = 0; i < tr.length; i++) {

          tr[i].style.display = "";
    }
    this.showTimes = false;


  }

  sortData(sort: Sort) {
   
    const data = this.doctors.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedDoctors = data;
      return;
    }

    this.sortedDoctors = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'surname': return compare(a.surname, b.surname, isAsc);
        case 'rating': return compare(a.rating, b.rating, isAsc);
        case 'numberOfReviews': return compare(a.numberOfReviews, b.numberOfReviews, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}