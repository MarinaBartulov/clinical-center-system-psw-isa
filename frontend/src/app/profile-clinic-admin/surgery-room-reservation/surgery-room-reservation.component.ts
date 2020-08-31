import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DoctorService } from 'src/app/service/doctor.service';
import { RoomService } from 'src/app/service/room.service';
import { MatDialog } from '@angular/material';
import { SurgeryService } from 'src/app/service/surgery.service';
import { SurgeryRequest } from 'src/app/shared/model/SurgeryRequest';
import { DoctorFA } from 'src/app/shared/model/DoctorFA';
import { ReserveDoctorsDialogComponent } from './reserve-doctors-dialog/reserve-doctors-dialog.component';
import { ReserveDoctor } from 'src/app/shared/model/ReserveDoctor';
import { SurgeryRequestForServer } from 'src/app/shared/model/SurgeryRequestForServer';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-surgery-room-reservation',
  templateUrl: './surgery-room-reservation.component.html',
  styleUrls: ['./surgery-room-reservation.component.css']
})
export class SurgeryRoomReservationComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _notifier:NotifierService, 
    private _doctorsService:DoctorService, 
    private _roomService:RoomService, 
    private _dialog: MatDialog,
    private _surgeryService: SurgeryService) {
      this._surgeryStart = new SurgeryRequest();
      this._reserveDoctor = new ReserveDoctor();
      this._surgeryRequestForServer =new SurgeryRequestForServer();
     }


  private _surgeryId: any;
  private _clinicId: any;
  private _currentAdmin: any;

  private _reserveDoctor: ReserveDoctor;
  private _surgeryStart: SurgeryRequest; 
  private _surgeryRequestForServer: SurgeryRequestForServer;
  

  private _showInfo: boolean;
  private _showAvailable: boolean;
  private _showNoAvailable: boolean;
  private _availableRooms: any[]; //ovo su ponudjene sobe za rezervaciju za tacan datum
 // private _foundRooms: any[]; //ovo su pronadjene sobe ako nema za tacan dan i datum
 // private _doctors:DoctorFA[]; //doktori koji mogu da izvrse taj pregled
 // private _chosenDoctors: DoctorFA[];
  //forma
 // private _roomNameSearch: String;
 // private _roomNumberSearch: String;
 // private _dateSearch: any;
 // private _doctorSearch:any;

  ngOnInit() {

    this._route.paramMap.subscribe(params => { 
      this._surgeryId = params.get('idSurgery'); 
      this._clinicId = params.get("idClinic");
      
      this._surgeryService.getSurgeryRequest(this._surgeryId).subscribe(
        res => {
          this._surgeryStart = JSON.parse(JSON.stringify(res)); //na pocetku su isti
         // this._surgeryEnd = JSON.parse(JSON.stringify(res));
          
          this._showInfo = true;

         // this._dateSearch = {'year':this._surgeryStart.date[0],'month':this._surgeryStart.date[1],'day':this._surgeryStart.date[2]};
         // this._roomNumberSearch = "";
         // this._roomNameSearch = "";
          //dobave se svi slobodni termini za trazeni datum 
          this._surgeryService.getAvailableRoomsTerms(this._surgeryId).subscribe(
            res => {
              this._availableRooms = res;
              
              if(res.length != 0){
                this._showAvailable = true;
                this._showNoAvailable = false;
              }else{
                this._showAvailable = false;
                this._showNoAvailable = true;
              }
            }
          )
        });
        }
      )
     
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
  }

 searchForRooms()
 {
  this._surgeryService.getAvailableRoomsTerms(this._surgeryId).subscribe(
    res => {
      this._availableRooms = res;
      if(res.length != 0){
        this._showAvailable = true;
        this._showNoAvailable = false;
      }else{
        this._showAvailable = false;
        this._showNoAvailable = true;
      }
    }
  )
 }

checkNextDay()
{
  //this._surgeryStart.date(1)=this._surgeryStart.date[1]+1;
}
  

  reserveDoctors(room)
  {
    this.makeSurgeryRequestForServerObject(room);
    let dialogRef = this._dialog.open(ReserveDoctorsDialogComponent, {
      width: '50%',
      data: this._surgeryRequestForServer
    });
    dialogRef.afterClosed().subscribe(result => {
      

    });
  }

  makeSurgeryRequestForServerObject(room)
  {
    this._reserveDoctor.idSurgeryType = this._surgeryStart.idSurgeryType; //uvek trazim doktora za ovaj tip operacije
    this._reserveDoctor.id = room.id; //ovo je id termina
    this._reserveDoctor.idRoom = room.idRoom;
    this._reserveDoctor.name = room.name;
    this._reserveDoctor.number = room.number;
    this._reserveDoctor.date = room.date;
    this._reserveDoctor.startTime = room.startTime;
    this._reserveDoctor.endTime = room.endTime;
    this._surgeryRequestForServer.reserveDoctor=this._reserveDoctor;
    this._surgeryRequestForServer.surgeryRequest=this._surgeryStart;
    this._surgeryRequestForServer.doctors = [];
    this._surgeryRequestForServer.idClinic = this._clinicId;
  }  

  rejectSurgery(){

    this._surgeryService.rejectSurgeryRequest(this._surgeryStart.id).subscribe(
      res => {
        let dialogRef1 = this._dialog.open(InfoDialogComponent, {
          width: '50%',
          data: "You have rejected this request. Patients will get email notification which explains why their request was rejected."
        });
        dialogRef1.afterClosed().subscribe(result => {
          this._router.navigate(["/surgeryRoomRequests",this._clinicId]);
        });
      },error => {
        let dialogRef1 = this._dialog.open(InfoDialogComponent, {
          width: '50%',
          data: error.error
        });
        dialogRef1.afterClosed().subscribe(result => {
          this._router.navigate(["/surgeryRoomRequests",this._clinicId]);
        });
      }
    ) 
  }

  clickedBack(){
    this._router.navigate(["/surgeryRoomRequests",this._clinicId]);
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
