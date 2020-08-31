import { RoomService } from './../../service/room.service';
import { FreeTermsRequest } from './../../shared/model/FreeTermsRequest';
import { DoctorService } from './../../service/doctor.service';
import { MERoomRequest } from './../../shared/model/MERoomRequest';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalExamService } from 'src/app/service/medical-exam-service';
import { MedicalExamRequest } from 'src/app/shared/model/MedicalExamRequest';
import { RoomME } from 'src/app/shared/model/RoomME';
import { NotifierService } from 'angular-notifier';
import { DoctorFA } from 'src/app/shared/model/DoctorFA';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {

  constructor(private _route: ActivatedRoute,private _router: Router,private _medicalExamService:MedicalExamService,
    private _notifier:NotifierService, private _doctorsService:DoctorService, private _roomService:RoomService, private _dialog: MatDialog) { }

  private _examId: any;
  private _clinicId: any;
  private _currentAdmin: any;
  private _examStart: MedicalExamRequest; //ovo je medicalExam sa podacima koji se zele
  private _examEnd: MedicalExamRequest; //ovo je medicalExam sa podacima kada se nadje soba
  private _showInfo: boolean;
  private _showAvailable: boolean;
  private _showNoAvailable: boolean;
  private _availableRooms: RoomME[]; //ovo su ponudjene sobe za rezervaciju za tacan dan i datum
  private _foundRooms: RoomME[]; //ovo su pronadjene sobe ako nema za tacan dan i datum
  private _doctors:DoctorFA[]; //doktori koji mogu da izvrse taj pregled

  //forma
  private _roomNameSearch: String;
  private _roomNumberSearch: String;
  private _dateSearch: any;
  private _doctorSearch:DoctorFA;

  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
      this._examId = params.get('idExam'); 
      this._clinicId = params.get("idClinic");
      this._medicalExamService.getMedicalExamRequest(this._examId).subscribe(
        res => {
          this._examStart = JSON.parse(JSON.stringify(res)); //na pocetku su isti
          this._examEnd = JSON.parse(JSON.stringify(res));
          this._showInfo = true;

          this._doctorSearch = JSON.parse(JSON.stringify(this._examStart.doctor));
          this._dateSearch = {'year':this._examStart.date[0],'month':this._examStart.date[1],'day':this._examStart.date[2]};
          this._roomNumberSearch = "";
          this._roomNameSearch = "";
          //dobave se za trazeni datum i vreme
          this._medicalExamService.getAvailableRooms(this._examId).subscribe(
            res => {
              this._availableRooms = res;
              if(res.length != 0){
                this._showAvailable = true;
                this._showNoAvailable = false;
              }else{
                this.showNoAvailable();
              }
            }
          )
        });
        }
      )
      
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));

  }

  showNoAvailable(){
    this._showNoAvailable = true;
    this._showAvailable = false;
    this._doctorsService.getDoctorExamTypes(this._clinicId,this._examStart.idExamType).subscribe(
      res => {
        this._doctors = res;
      }
    )

     
  }
  
   clickedBack(){
    this._router.navigate(["/examRoomRequests",this._clinicId]);
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

  reserveRoom(roomME){

    console.log(this._examStart);
    console.log(this._examEnd);
    console.log(roomME); //podaci o sobi koja se rezervise
        let meR = new MERoomRequest(this._examStart,this._examEnd,roomME); 
        this._medicalExamService.reserveRoom(meR).subscribe(
          res => {
            this._notifier.notify("success","You have successfully reserved a room for medical exam.");
            setTimeout(() => {
             this._notifier.hideAll();
             this._router.navigate(["/examRoomRequests",this._clinicId]);
           }, 2000)
          },
          error => {
            this._notifier.notify("error",error.error);
            setTimeout(() => {
             this._notifier.hideAll();
             this._router.navigate(["/examRoomRequests",this._clinicId]);
           }, 2000)
          }
        )
  }

  searchFreeTerms(){
       
    let date = [this._dateSearch['year'],this._dateSearch['month'],this._dateSearch['day']]; 
    let req = new FreeTermsRequest(this._roomNameSearch,this._roomNumberSearch,this._doctorSearch.id,date);
    console.log(date);
    console.log(this._doctorSearch);
    this._examEnd.date = date; //ovo se moglo promeniti
    this._examEnd.doctor = this._doctorSearch; //ovo se moglo promeniti
    //promena o terminu se vidi u roomME koja se salje kod rezervacije
    this._roomService.findRoomsFreeTerms(this._clinicId,req).subscribe(
      res =>{
           this._foundRooms = res;
      }
    )
  }

  reset(){
    this._roomNumberSearch = "";
    this._roomNumberSearch = "";
    this._doctorSearch = this._examStart.doctor;
    this._dateSearch = {'year':this._examStart.date[0],'month':this._examStart.date[1],'day':this._examStart.date[2]};
    this._foundRooms = [];
  }

  rejectExam(){

    this._medicalExamService.rejectExamRequest(this._examStart.id).subscribe(
      res => {
        let dialogRef1 = this._dialog.open(InfoDialogComponent, {
          width: '50%',
          data: "You have rejected this request. Patients will get email notification which explains why their request was rejected."
        });
        dialogRef1.afterClosed().subscribe(result => {
          this._router.navigate(["/examRoomRequests",this._clinicId]);
        });
      },error => {
        let dialogRef1 = this._dialog.open(InfoDialogComponent, {
          width: '50%',
          data: error.error
        });
        dialogRef1.afterClosed().subscribe(result => {
          this._router.navigate(["/examRoomRequests",this._clinicId]);
        });
      }
    ) 
  }

  seeCalendar(room){
               
        this._router.navigate(["/workCalendarRoom",room.id,this._examId,this._clinicId]); 
  }
}
