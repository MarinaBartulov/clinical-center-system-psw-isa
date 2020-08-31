import { Component, OnInit,Input } from '@angular/core';
import { TypeReg } from 'src/app/shared/model/TypeReg';
import { DoctorService } from 'src/app/service/doctor.service';
import { Appointment } from 'src/app/hp-patient/appointments-list/Appointment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-surgery-appointment',
  templateUrl: './surgery-appointment.component.html',
  styleUrls: ['./surgery-appointment.component.css']
})
export class SurgeryAppointmentComponent implements OnInit {
  private _date: any;
  private _selectedType: TypeReg;

  @Input("_surgeryTypes") _surgeryTypes : any;
  @Input("_doctor") doctor: any;
  private appointment: any;
  @Input("_patientId") _patientId : any;
 

  constructor(private _doctorService: DoctorService,private _notifier : NotifierService) { }

  ngOnInit() {
  }
  sendSurgeryRequest(){
    let date = [this._date['year'],this._date['month'],this._date['day']];
    let appointment = new Appointment();
    appointment.date = date;
    appointment.doctorId = this.doctor.id;
    appointment.type = this._selectedType.id;
    
    console.log(appointment);

    this._doctorService.makeSurgeryAppointment(this._patientId,appointment).subscribe(terms => {
     
      this._notifier.notify("success","Surgery request sent!");
      setTimeout(() => {
      this._notifier.hideAll();
     
     
    }, 2000)
   
    }, error => {
     
      this._notifier.notify("error", error.error);
      setTimeout(() => {
      this._notifier.hideAll();
     
     
    }, 2000)
    


    

    }); 

    }
  

}
