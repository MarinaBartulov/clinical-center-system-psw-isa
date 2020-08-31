import { RejectDialogComponent } from './reject-dialog/reject-dialog.component';
import { AbsenceService } from './../../service/absence.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Absence } from 'src/app/shared/model/Absence';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-absence-request',
  templateUrl: './absence-request.component.html',
  styleUrls: ['./absence-request.component.css']
})
export class AbsenceRequestComponent implements OnInit {

  constructor(private _route: ActivatedRoute,private _router: Router, private _dialog: MatDialog, private _absenceService: AbsenceService, private _notifier:NotifierService) { }

  private _currentAdmin: any;
  private _clinicId: String;
  private _numOfRequests: Number;
  private _absences: Absence[];
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
    this._absences = [];
    this._absenceService.getAllRequestedAbsences(this._clinicId).subscribe(
      res => {
        this._absences = res;
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

  approveRequest(id){

    this._absenceService.approveAbsence(id).subscribe(
      res => {
        this._notifier.notify("success","You have successfully approved the request.");
             setTimeout(() => {
             this._notifier.hideAll();
        }, 3000)
        this.showRequests();
      },
      error => {
        let dialogRef1 = this._dialog.open(InfoDialogComponent, {
          width: '50%',
          data: error.error
        });
      }
    )

  }

  rejectRequest(id){
    let dialogRef1 = this._dialog.open(RejectDialogComponent, {
      width: '50%'      
    });
    dialogRef1.afterClosed().subscribe(result => {
         if(result != undefined){
           this._absenceService.rejectAbsence(id,result).subscribe(
             res => {
              this._notifier.notify("success","You have successfully rejected the request.");
                 setTimeout(() => {
                 this._notifier.hideAll();
               }, 3000)
              this.showRequests();
             }
           )
         }
    });
  }

}
