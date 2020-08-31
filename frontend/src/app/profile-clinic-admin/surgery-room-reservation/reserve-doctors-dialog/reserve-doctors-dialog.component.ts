import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { DoctorService } from 'src/app/service/doctor.service';
import { ReserveDoctor } from 'src/app/shared/model/ReserveDoctor';
import { SurgeryService } from 'src/app/service/surgery.service';
import { SurgeryRequestForServer } from 'src/app/shared/model/SurgeryRequestForServer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve-doctors-dialog',
  templateUrl: './reserve-doctors-dialog.component.html',
  styleUrls: ['./reserve-doctors-dialog.component.css']
})
export class ReserveDoctorsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) public data: SurgeryRequestForServer,
    private _notifier: NotifierService,
    private _doctorService: DoctorService,
    private _surgeryService: SurgeryService,
    private _router: Router) { }


  private _doctors: any[]=[];
  ngOnInit() {
    console.log(this.data);
     this._doctorService.getFreeDoctorsForThisTerm(this.data.reserveDoctor, this.data.idClinic).subscribe(
            res => {
               
              this._doctors = res;
            }
          ) 
  }

  Reserve()
  {
    this.data.reserveDoctor.doctors = this.data.doctors;
    this._surgeryService.reserve(this.data.reserveDoctor,this.data.surgeryRequest.id).subscribe( res => {
      this._notifier.notify("success","Operation successfully scheduled");
        setTimeout(() => {
         this._notifier.hideAll();
       }, 2000)
    }
    )
    //this._router.navigate(["/surgeryRoomRequests",this.data.idClinic]);
    this.dialogRef.afterClosed().subscribe(result => {
      this._router.navigate(["/surgeryRoomRequests",this.data.idClinic]);
    });
  }

  clickAddDoctor(doctor,i)
  {
    this.data.doctors.push(doctor);
    this._notifier.notify("success","Doctor added");
        setTimeout(() => {
         this._notifier.hideAll();
       }, 2000)
  }

  Cancel(): void {
    this.dialogRef.close();
  }
}
