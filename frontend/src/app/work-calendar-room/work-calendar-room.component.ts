import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation  } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarEventTitleFormatter } from 'angular-calendar';
import { Router, ActivatedRoute } from '@angular/router';
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
import { RoomService } from '../service/room.service';

@Component({
  selector: 'app-work-calendar-room',
  templateUrl: './work-calendar-room.component.html',
  styleUrls: ['./work-calendar-room.component.css']
})
export class WorkCalendarRoomComponent implements OnInit {

  constructor(private _router: Router,private _route: ActivatedRoute,private _roomService: RoomService) { }

private _roomTerms: any[];
private _roomId: any;
private _examId: any;
private _clinicId: any;

refresh: any = new Subject();

ngOnInit() {
  this._route.paramMap.subscribe(params => { 
    this._roomId = params.get('idRoom');
    this._examId = params.get('idExam'); 
    this._clinicId = params.get("idClinic"); 
  });
  this.view = CalendarView.Month;
  this.viewDate =  new Date();

  this._roomService.getReservedRoomTerms(this._roomId).subscribe(
    res => {
      this._roomTerms = res;
      for(let i=0; i<res.length;i++){
        let t = res[i].time[0];
        let title = this.formatTime(res[i].time) + " - Reserved" ;
        this.events.push(
          {
            id: res[i].id,
            title: title,
            start: addHours(startOfDay(new Date(res[i].date)),t),
            end: addHours(startOfDay(new Date(res[i].date)),t+1),        
        });
      }
      this.refresh.next();
    },
  );
  
}


view: CalendarView;
viewDate: Date;

events: CalendarEvent[]= [];



clickedBack() : void
{
      this._router.navigate(['/searchRoomForExam',this._examId,this._clinicId]);
    
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