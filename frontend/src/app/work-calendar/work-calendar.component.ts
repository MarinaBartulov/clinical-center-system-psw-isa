import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation  } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarEventTitleFormatter } from 'angular-calendar';
import { Router } from '@angular/router';
import { FastAppointmentService } from '../service/fastAppointment.service';
import { FastAppointmentWK } from '../shared/model/FastAppointmentWK';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/internal/Subject';
//import { CustomEventTitleFormatter } from './custom-event-title-formatter';
import { MedicalExamService } from '../service/medical-exam-service';
import { SurgeryService } from '../service/surgery.service';
import { AbsenceService } from '../service/absence.service';


@Component({
  selector: 'app-work-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css'],
  encapsulation: ViewEncapsulation.None,
  /*providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]*/
})
export class WorkCalendarComponent implements OnInit {

  constructor(private _router: Router,
      private _fAService: FastAppointmentService,
      private _medicalExamService: MedicalExamService,
      private _surgeryService: SurgeryService,
      private _absenceService: AbsenceService) { }

  private _fastAppointments: FastAppointmentWK[];
  private _exams: any[];
  private _surgeries: any[];
  private _absences: any[];

  refresh: any = new Subject();

  ngOnInit() {
    this.view = CalendarView.Month;
    this.viewDate =  new Date();
    this._currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let tempRole = this._currentUser.authorities[0]['authority'];

    if(tempRole == "ROLE_DOCTOR"){ //ovde ucitati preglede trenutnog doktora
      this._role = "doctor";

      this._fAService.getReservedFastAppointments(this._currentUser.id).subscribe( res=> {
        this._fastAppointments = res;
        console.log("Fast appointments", this._fastAppointments);

        for(let i=0; i<res.length; i++) {

          let t = res[i].time[0];
          let title = res[i].time[0] + ":" + res[i].time[1] + "0 - " +
          res[i].nameExamType + " - " + res[i].nameAndNumberRoom + " - " + res[i].patient.name +
          " " + res[i].patient.surname;
          this.events.push(
          {
            id: res[i].patient.id,
            title: title,
            start: addHours(startOfDay(new Date(res[i].date)),t),
            end: addHours(startOfDay(new Date(res[i].date)),t+1),        
        });
      }
      console.log("Events", this.events);
      this.refresh.next();
      },
      
      );

      this._medicalExamService.getDoctorsExams(this._currentUser.id).subscribe( res=> {
         this._exams = res;
         console.log("Exams:",this._exams);
 
         for(let i=0; i<res.length; i++) {
 
           let t = res[i].time[0];
           let title = res[i].time[0] + ":" + res[i].time[1] + "0 - " +
           res[i].nameExamType + " - " + res[i].nameAndNumberRoom + " - " + res[i].patient.name +
           " " + res[i].patient.surname;
           this.events.push(
           {
             id: res[i].patient.id,
             title: title,
             start: addHours(startOfDay(new Date(res[i].date)),t),
             end: addHours(startOfDay(new Date(res[i].date)),t+1),        
         });
       }
       console.log("Events", this.events);
       this.refresh.next();
       },
       
       );

       this._surgeryService.getDoctorsSurgeries(this._currentUser.id).subscribe( res=> {
        this._surgeries = res;
        console.log("Surgeries:",this._surgeries);

        for(let i=0; i<res.length; i++) {

          let t = res[i].time[0];
          let title = res[i].time[0] + ":" + res[i].time[1] + "0 - " +
           res[i].nameSurgeryType + " - " + res[i].nameAndNumberRoom + " - " + res[i].patient.name +
          " " + res[i].patient.surname;
          this.events.push(
          {
            id: res[i].patient.id,
            title: title,
            start: addHours(startOfDay(new Date(res[i].date)),t),
            end: addHours(startOfDay(new Date(res[i].date)),t+1),        
        });
      }
      console.log("Events", this.events);
      this.refresh.next();
      },
      
      );
      

    }
    //else{
      //this._role = "nurse";
      this._absenceService.getAllAbsences(this._currentUser.id).subscribe( res=> {
        this._absences = res;
        console.log("Absences:",this._absences);

        for(let i=0; i<res.length; i++) {

          let title = res[i].typeOfAbsence;
          this.events.push(
          {
            title: title,
            start: startOfDay(new Date(res[i].startDate)),
            end: endOfDay(new Date(res[i].endDate)),        
        });
      }
      console.log("Events", this.events);
      this.refresh.next();
      },
      
      );

   // }
    
  }

  _role: String;
  _currentUser: any;
  view: CalendarView;
  viewDate: Date;

  events: CalendarEvent[]= [];
  /*= [ //primer cisto da nesto ima
    {
      title: 'Appointment',
      start: new Date("Fri Jan 24 2020 07:00:00 AM"),
      end: new Date("Fri Jan 24 2020 08:00:00 AM")
    },
    {
      title: 'Appointment Today',
      start: new Date()
    }
  ];*/

  eventClicked({ event }: { event: CalendarEvent }): void {
    if(event.id != undefined)
      this._router.navigate(['/patientProfile', event.id]);
  }

  clickedBack() : void
  {
    if(this._role == "doctor"){
        this._router.navigate(['/doctorHP']);
    }else{
        this._router.navigate(['/nurseHP']);
    }
  }

}
