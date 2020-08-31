import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Doctor } from 'src/app/hp-patient/doctors-list/Doctor'
import { Appointment } from 'src/app/hp-patient/appointments-list/Appointment'
import {Sort} from '@angular/material/sort';
import { AvailableDoctorRequest } from 'src/app/shared/model/AvailableDoctorRequest';
import { PatientService } from 'src/app/service/patient.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class AppointmentsListComponent implements OnInit {

  @Input("appointments") appointments;
  @Input("_patientId") _patientId : any;
  show : any;
  sortedAppointments : Appointment[];
  @Input("doctor") doctor : any;
  @Input("doctorReq") doctorReq : AvailableDoctorRequest;
  @Output() valueChange = new EventEmitter();
  @Output() valueChange2 = new EventEmitter();

  constructor(private _patientService: PatientService, private _notifier : NotifierService) { 
    this.show = true;
  }

  reserveAppointment(appointment : any){
    console.log("Patient : " + this._patientId + "Appointment : " + appointment);
    this._patientService.makeAppointment(this._patientId,appointment).subscribe(ap => {
     
    
      console.log("True or false?? :" + ap);

    let change = true;
    this.valueChange.emit(change);
    this.valueChange2.emit(change);
      
    

     
    },
    error => {
  
      this._notifier.hideAll();
      this.valueChange.emit(false);
      this.valueChange2.emit(false);

    }
    
    ); 
 
  }

  ngOnInit() {
    this.sortedAppointments = this.appointments;
    
  }
  sortData(sort: Sort) {
   
    const data = this.appointments.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedAppointments = data;
      return;
    }

    this.sortedAppointments = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
      
        case 'date': return compare(a.date, b.date, isAsc);
        case 'time': return compare(a.time, b.time, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        default: return 0;
      }
    });
  }

  formatTime(time:Number[]){
    let timeStr: String = "";
    if(time[0]<10){
      timeStr += '0' + time[0];
    }else{
      timeStr += '' + time[0];
    }

    timeStr += ':' + time[1] + '0';
    return timeStr; 
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}