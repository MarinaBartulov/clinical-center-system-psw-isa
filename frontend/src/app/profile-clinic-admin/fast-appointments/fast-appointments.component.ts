import { AllFastAppointments } from './../../shared/model/AllFastAppointments';
import { FastAppointmentService } from './../../service/fastAppointment.service';
import { FARequest } from './../../shared/model/FARequest';
import { DoctorService } from './../../service/doctor.service';
import { AvailableRoomRequest } from './../../shared/model/AvailabeRoomRequest';
import { RoomService } from './../../service/room.service';
import { DoctorFA } from './../../shared/model/DoctorFA';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypesService } from 'src/app/service/types.service';
import { TypeReg } from 'src/app/shared/model/TypeReg';
import { RoomFA } from 'src/app/shared/model/RoomFA';
import { NotifierService } from 'angular-notifier';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Term } from 'src/app/shared/model/Term';
import { AvailableDoctorRequest } from 'src/app/shared/model/AvailableDoctorRequest';
import { FastAppointment } from 'src/app/shared/model/FastAppointment';

@Component({
  selector: 'app-fast-appointments',
  templateUrl: './fast-appointments.component.html',
  styleUrls: ['./fast-appointments.component.css']
})


export class FastAppointmentsComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _router: Router, private _typeService: TypesService,
     private _notifier: NotifierService, private _roomService:RoomService, private _doctorService: DoctorService, private _faService:FastAppointmentService) { }

  private _currentAdmin: any;
  private _clinicId: String;
  private _showAllFA: boolean;
  private _showCreateNew: boolean;
  private _examTypes: TypeReg[];
  private _doctors: DoctorFA[];
  private _rooms: RoomFA[];
  private _date: any; //{year:2020, month:1, day:18}
  private _time: any; //{hour:1, minute:1, second:0}
  private _selectedType: TypeReg;
  private _selectedDoctor: DoctorFA;
  private _selectedRoom: RoomFA;
  private _examTerms: Term[];
  private _selectedTerm: Term;
  private _today: any;
  @ViewChild('type',{static:false}) ngSelectComponent: NgSelectComponent;
  @ViewChild('room',{static:false}) ngSelectRoom: NgSelectComponent;
  @ViewChild('doctor',{static:false}) ngSelectDoctor: NgSelectComponent;
  private _noRooms: boolean;
  private _noDoctors: boolean;
  private _allFA: AllFastAppointments;
  private _finishedFA: FastAppointment[];
  private _scheduledFA: FastAppointment[];
  private _freeFA: FastAppointment[];

  
  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
      this._clinicId = params.get('id'); 
      this._showAllFA = false;
      this._showCreateNew = false;
      this._noRooms = false;
      this._noDoctors = false;
      

    });
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
    this.createTerms(); 
    let date = new Date();
    this._today = {year:date.getFullYear(), month:date.getMonth()+1, day:date.getDay};
   
  }

  createTerms(){
      this._examTerms = [];
      for(let i=6;i<22;i++){
        this._examTerms.push(new Term(i+":00",[i,0]));
      }
  }

  clickedBack(){
    this._router.navigate(["/clinicAdminProfile"]);

  }

  clickedShowAllFA(){
      
    this._faService.getAllFastAppointments(this._clinicId).subscribe(
      res => {
        this._allFA = res;
        this._finishedFA = this._allFA.finished;
        this._scheduledFA = this._allFA.scheduled;
        this._freeFA = this._allFA.free;
        this._showAllFA = true;
        this._showCreateNew = false;
      }
    )
      
  }

  clickedCreateNew(){
    this._typeService.getExamTypesForRes(this._clinicId).subscribe(
      res => {
        this._examTypes = res;
        this._showAllFA = false;
        this._showCreateNew = true;
      }
    )
  }

  onChange(newValue) {
    if(newValue == null){
      return;
    }
    if(this._selectedTerm == null || this._date == null){
        this._selectedType= null;
        this.ngSelectComponent.clearModel();
        this._notifier.notify("warning","You have to choose date and time first.");
        setTimeout(() => {
        this._notifier.hideAll();
      }, 3000)
    }else{
      console.log(newValue.name);
    
     this.sendReqests();
    }
}

sendReqests(){
  let date = [this._date['year'],this._date['month'],this._date['day']];
      let roomReq = new AvailableRoomRequest(date,this._selectedTerm.value);
      let doctorReq = new AvailableDoctorRequest(date,this._selectedTerm.value,this._selectedType.id);
  
      this._roomService.getAvailableRooms(this._clinicId,roomReq).subscribe(
        res => {
          this._rooms = res;
          if(this._rooms.length == 0){
            this._noRooms = true;
          }else{
            this._noRooms = false;
          }
        },
        error => {
          this._notifier.notify("error",error.error);
             setTimeout(() => {
             this._notifier.hideAll();
           }, 3000)
        }
      )

      this._doctorService.getAvailableDoctors(this._clinicId,doctorReq).subscribe(
        res => {
          this._doctors = res;
          if(this._doctors.length == 0){
            this._noDoctors = true;
          }else{
            this._noDoctors = false;
          }

        }, 
        error => {
          this._notifier.notify("error",error.error);
             setTimeout(() => {
             this._notifier.hideAll();
        }, 3000)
        }
      ) 
      this.ngSelectRoom.clearModel();
      this.ngSelectDoctor.clearModel();
   
}

onChangeTime(newTime){
  if(this._date != null && this._selectedType!=null){

    this.sendReqests();
    console.log(newTime); 
  }
}

onChangeDate(newDate){
  if(this._selectedTerm!= null && this._selectedType!=null){

    this.sendReqests();
    console.log(newDate); 
  }
}

  createNewFA(){
    
    let date = [this._date['year'],this._date['month'],this._date['day']];
    let faReqest = new FARequest(date,this._selectedTerm.value,this._selectedType.id,this._selectedDoctor.id,this._selectedRoom.id);
    this._faService.addNewFA(faReqest,this._clinicId).subscribe(
      res => {
        this._notifier.notify("success","Fast appointment successfully created.");
        setTimeout(() => {
         this._notifier.hideAll();
       }, 3000)
       this.reset();
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
    this._selectedTerm = null;
    this._date = null;
    this._selectedType = null;
    this._selectedDoctor = null;
    this._selectedRoom = null;
    this._noDoctors = false;
    this._noRooms = false;
  }

}
