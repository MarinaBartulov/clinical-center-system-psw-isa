import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurgeryService } from 'src/app/service/surgery.service';

@Component({
  selector: 'app-surgery-room-request',
  templateUrl: './surgery-room-request.component.html',
  styleUrls: ['./surgery-room-request.component.css']
})
export class SurgeryRoomRequestComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _surgeryService: SurgeryService) { }

  private _clinicId: any;
  private _currentAdmin: any;
  private _surgeryRequests: any[];
  private _showTable: boolean;
  private _showMsg: boolean;

  ngOnInit() {
    this._showMsg = false;
    this._showTable = false;
    this._route.paramMap.subscribe(params => { 
      this._clinicId = params.get('id'); 
    });
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
    this.showRequests();
  }

  showRequests(){
    this._surgeryRequests = [];
    this._surgeryService.getSurgeryRequests(this._clinicId).subscribe(
      res => {
        this._surgeryRequests = res;
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

  findRoom(id:any){
    this.showRequests();
    this._router.navigate(["/searchRoomForSurgery",id,this._clinicId]);
    
  }

  clickedBack(){
    this._router.navigate(["/clinicAdminProfile"]);
  }
}
