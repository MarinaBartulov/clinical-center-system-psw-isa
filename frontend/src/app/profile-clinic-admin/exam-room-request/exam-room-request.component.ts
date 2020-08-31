import { MedicalExamService } from './../../service/medical-exam-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalExamRequest } from 'src/app/shared/model/MedicalExamRequest';

@Component({
  selector: 'app-exam-room-request',
  templateUrl: './exam-room-request.component.html',
  styleUrls: ['./exam-room-request.component.css']
})
export class ExamRoomRequestComponent implements OnInit {

  constructor(private _route: ActivatedRoute,private _router: Router,private _medicalExamService:MedicalExamService) { }

  private _clinicId: any;
  private _currentAdmin: any;
  private _examRequests: MedicalExamRequest[];
  private _showTable: boolean;
  private _showMsg: boolean;


  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
      this._clinicId = params.get('id'); 
    });
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
    this.showRequests();
  }

  showRequests(){
    this._examRequests = [];
    this._medicalExamService.getExamRequests(this._clinicId).subscribe(
      res => {
        this._examRequests = res;
        if(res.length != 0){
          this._showTable = true;
          this._showMsg = false;
        }else{
          this._showMsg = true;
          this._showTable = false;
        }
      }
    )
  }

  clickedBack(){
    this._router.navigate(["/clinicAdminProfile"]);
  }

  findRoom(id:any){

    this._router.navigate(["/searchRoomForExam",id,this._clinicId]);
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
