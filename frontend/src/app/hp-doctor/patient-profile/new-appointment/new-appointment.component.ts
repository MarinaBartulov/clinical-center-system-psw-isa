import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TypeReg } from 'src/app/shared/model/TypeReg';
import { DoctorService } from 'src/app/service/doctor.service';
import { AvailableDoctorRequest } from 'src/app/shared/model/AvailableDoctorRequest';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css'],
  providers: [DatePipe]
})
export class NewAppointmentComponent implements OnInit {

 
  constructor(private _doctorService: DoctorService,private _notifier : NotifierService,private datePipe: DatePipe) { } 
  private minDate: any;
  private _date: any;
  private _selectedType: TypeReg;

  @Input("_examTypes") _examTypes : any;
  @Input("_doctor") doctor: any;
  private doctorReq: any;
  @Input("_patientId") _patientId : any;

  private appointments : any;
  private message : any;
  private show;
  private numberOfTerms : any;
  ngOnInit() {
    
    
    console.log("Ocita + " +this.minDate)
    this.show = false;
    console.log(this.minDate);
    
  }
  reset(){
  
    this._date = null;
    this._selectedType = null;
    this.show = false;
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

  searchTerms(){
    let d = new Date();
    this.minDate = this.datePipe.transform(d, 'yyyy-MM-dd');
 
    this.message = " No free appointments for that date, please try with new one!";
    this.numberOfTerms = -1;
    this.show = false;

    let date = [this._date['year'],this._date['month'],this._date['day']];
    let doctorReq = new AvailableDoctorRequest(date,null,this._selectedType.id);
    console.log(doctorReq,this.doctor.id);

    this._doctorService.getAvailableTerms(this.doctor.id,doctorReq).subscribe(terms => {
      this.appointments = terms;
      
      this.numberOfTerms = this.appointments.length;
     
      this.show = true;
      if(this.numberOfTerms == 0){this.show = false}
   
  }, error => {
    this.message = error.error;
    this.numberOfTerms = 0;
    
 


  

  }); 

  }

}
