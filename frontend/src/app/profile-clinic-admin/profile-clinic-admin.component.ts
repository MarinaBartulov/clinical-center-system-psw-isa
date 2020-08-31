import { MedicalExamService } from './../service/medical-exam-service';
import { AbsenceService } from './../service/absence.service';
import { FirstLoginDialogComponent } from './../shared/dialogs/first-login-dialog/first-login-dialog.component';
import { PasswordWrongDialogComponent } from '../shared/dialogs/password-wrong-dialog/password-wrong-dialog.component';
import { EditPasswordDialogComponent } from '../shared/dialogs/edit-password-dialog/edit-password-dialog.component';
import { UserService } from './../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { PasswordChanger } from '../shared/model/PasswordChanger';
import { EditInfoDialogComponent } from '../shared/dialogs/edit-info-dialog/edit-info-dialog.component';
import { UserEdit } from '../shared/model/UserEdit';
import { PasswordChangedDialogComponent } from '../shared/dialogs/password-changed-dialog/password-changed-dialog.component';
import { Router } from '@angular/router';
import { ClinicService } from './../service/clinic.service';
import { EditClinicDialogComponent } from './edit-clinic-dialog/edit-clinic-dialog.component';
import { ClinicAdminService } from './../service/clinic-admin.service';
import { Clinic } from '../shared/model/Clinic';
import { MatBadgeModule } from '@angular/material/badge';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { InfoDialogComponent } from '../shared/dialogs/info-dialog/info-dialog.component';
import { NotifierService } from 'angular-notifier';
import { SurgeryService } from '../service/surgery.service';


@Component({
  selector: 'app-profile-clinic-admin',
  templateUrl: './profile-clinic-admin.component.html',
  styleUrls: ['./profile-clinic-admin.component.css']
})
export class ProfileClinicAdminComponent implements OnInit {

  constructor(private _authService: AuthService, private _dialog: MatDialog, private _userService: UserService,
     private _router: Router, private _clinicAdminService: ClinicAdminService, private _clinicService: ClinicService,
     private _absenceService: AbsenceService, private _notifier: NotifierService, private _medicalExamService:MedicalExamService,
     private _surgeryService: SurgeryService) { }

  private _currentAdmin: any;
  private _changedAdmin: any;
  private _showInfo: boolean;

  private _showClinic: boolean;
  private _clinic: Clinic;
  private _changedClinic: Clinic;
  private _passwordChanger: PasswordChanger;
  private _numOfRequests: Number;
  private _numOfExamRequests: Number;
  private _numOfSurgeryRequests: Number;
  

  ngOnInit() {
    
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
    this._changedAdmin = JSON.parse(JSON.stringify(this._currentAdmin));
    this._passwordChanger = new PasswordChanger("","");
    this._clinic = new Clinic();
    this._changedClinic = new Clinic();
    this._showInfo = false;
    this._showClinic = false;

    this._clinicAdminService.getMyClinic().subscribe(clinic => {       
      this._clinic = clinic;
      this._absenceService.getNumberOfRequests(this._clinic.id).subscribe(
        res => {
            this._numOfRequests = res;
        }
      )
      this._medicalExamService.getNumExamRequests(this._clinic.id).subscribe(
        res => {
             this._numOfExamRequests = res;
        }
      )
      this._surgeryService.getNumSurgeryRequests(this._clinic.id).subscribe(
        res => {
             this._numOfSurgeryRequests = res;
        }
      )
    });
    

    if(this._currentAdmin.passwordChanged == false){
    let ref1 = this._dialog.open(FirstLoginDialogComponent,{
        disableClose: true,
        width: '50%',
        data: this._passwordChanger
    });
  }

  }

  clickedEdit(){

       let dialogRef = this._dialog.open(EditInfoDialogComponent, {
         width: '50%',
         data: JSON.parse(JSON.stringify(this._currentAdmin))
       });
       dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result != undefined){
        this._changedAdmin = result;
        if(this._currentAdmin.name != this._changedAdmin.name || this._currentAdmin.surname != this._changedAdmin.surname
          || this._currentAdmin.address != this._changedAdmin.address || this._currentAdmin.city != this._changedAdmin.city 
          || this._currentAdmin.country != this._changedAdmin.country || this._currentAdmin.phoneNumber != this._changedAdmin.phoneNumber){
              let userEdit = new UserEdit(this._changedAdmin.name, this._changedAdmin.surname,this._changedAdmin.address,
              this._changedAdmin.city, this._changedAdmin.country, this._changedAdmin.phoneNumber);
              this._currentAdmin = JSON.parse(JSON.stringify(this._changedAdmin));
              this._userService.editInfo(userEdit).subscribe(res => {
                localStorage.setItem('currentUser',JSON.stringify(this._changedAdmin)); //postavim da je taj izmenjeni sada trenutno ulogovan
      });
        }
      }
      });
  }

  clickedChangePassword(){
    this._passwordChanger = new PasswordChanger("","");
    let dialogRef = this._dialog.open(EditPasswordDialogComponent, {
         width: '50%',
         data: this._passwordChanger
    });
    dialogRef.afterClosed().subscribe(result => {
       if(result != undefined){
        this._passwordChanger = result;
        this._authService.changePassoword(this._passwordChanger).subscribe(
          res => {
            let dialogRef1 = this._dialog.open(PasswordChangedDialogComponent, {
              width: '50%'
            });
    
            dialogRef1.afterClosed().subscribe(result => {
             this._authService.logout(); 
             this._router.navigate(['\login']);
           });
          },
           error => {
            let dialogRef2 = this._dialog.open(PasswordWrongDialogComponent, {
              width: '50%'
            }); 
           }
           );
        
       }
    });

  }

  clickedLogout(){
       this._authService.logout();
  }

  clickedGeneralInfo(){
     
           this._showInfo = false;
           this._showClinic = true;
  }

  clickedClinicProfile(){
      localStorage.setItem("clinic",JSON.stringify(this._clinic));
      localStorage.setItem("coordinates",null);
      this._router.navigate(['/clinicProfile/', this._clinic.id]);
  }

  clickedBusinessReport(){
    localStorage.setItem("clinic",JSON.stringify(this._clinic));
    this._router.navigate(['/businessReport/', this._clinic.id]);
  }

  clickedEditClinic(){
    let dialogRef = this._dialog.open(EditClinicDialogComponent, {
      width: '50%',
      data: JSON.parse(JSON.stringify(this._clinic))
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
         this._changedClinic = result;
         console.log(this._clinic);
         console.log(this._changedClinic);
         if(this._clinic.name != this._changedClinic.name || this._clinic.description != this._changedClinic.description
            || this._clinic.address != this._changedClinic.address){
            this._clinic = JSON.parse(JSON.stringify(this._changedClinic));
            this._clinicService.editClinicInfo(this._changedClinic).subscribe(
              res => {
                       this._notifier.notify("success","Clinic successfully updated.");
                       setTimeout(() => {
                        this._notifier.hideAll();
                      }, 2000)
              },
              error => {
                       
                let dialogRef = this._dialog.open(InfoDialogComponent, {
                  width: '50%',
                  data: error.error
                });   
              }
              );
      }
    }
    });

  }

  clickedBack(){
    this._showClinic = false;
  }

  clickedProfile(){
    this._showClinic = false;
    if(this._showInfo){
      this._showInfo = false;
    }else{
      this._showInfo = true;
    }
  }

}
