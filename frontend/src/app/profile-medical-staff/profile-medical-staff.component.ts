import { PasswordChangedDialogComponent } from '../shared/dialogs/password-changed-dialog/password-changed-dialog.component';
import { PasswordChanger } from './../shared/model/PasswordChanger';
import { UserEdit } from './../shared/model/UserEdit';
import { UserService } from './../service/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { FirstLoginDialogComponent } from '../shared/dialogs/first-login-dialog/first-login-dialog.component';
import { EditInfoDialogComponent } from '../shared/dialogs/edit-info-dialog/edit-info-dialog.component';
import { PasswordWrongDialogComponent } from '../shared/dialogs/password-wrong-dialog/password-wrong-dialog.component';
import { EditPasswordDialogComponent } from '../shared/dialogs/edit-password-dialog/edit-password-dialog.component';

@Component({
  selector: 'app-profile-medical-staff',
  templateUrl: './profile-medical-staff.component.html',
  styleUrls: ['./profile-medical-staff.component.css']
})
export class ProfileMedicalStaffComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router, private _userService:UserService, private _dialog:MatDialog) { }

  private _currentUser: any;
  private _changedUser: any;
  private _role: String;
  private _showInfo: boolean;
  private _passwordChanger: PasswordChanger;
  

  ngOnInit() {

    this._currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this._changedUser = JSON.parse(JSON.stringify(this._currentUser)); //kopiranje objekta, da nemaju iste reference
    let tempRole = this._currentUser.authorities[0]['authority'];;
    if(tempRole == "ROLE_DOCTOR"){
      this._role = "doctor";
    }else{
      this._role = "nurse";
    }
    this._showInfo = true;
    this._passwordChanger = new PasswordChanger("","");
  }

  clickedLogout(){
      this._authService.logout();
  }

  backToHomepage(){
      this._showInfo = true;
      
      if(this._role == "doctor"){
           this._router.navigate(['/doctorHP']);
      }else{
        this._router.navigate(['/nurseHP']);
      }
  }
  
  clickedEdit(){

    let dialogRef = this._dialog.open(EditInfoDialogComponent, {
      width: '50%',
      data: JSON.parse(JSON.stringify(this._currentUser))
    });
    dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
     if(result != undefined){
     this._changedUser = result;
     if(this._currentUser.name != this._changedUser.name || this._currentUser.surname != this._changedUser.surname
       || this._currentUser.address != this._changedUser.address || this._currentUser.city != this._changedUser.city 
       || this._currentUser.country != this._changedUser.country || this._currentUser.phoneNumber != this._changedUser.phoneNumber){
           let userEdit = new UserEdit(this._changedUser.name, this._changedUser.surname,this._changedUser.address,
           this._changedUser.city, this._changedUser.country, this._changedUser.phoneNumber);
           this._currentUser = JSON.parse(JSON.stringify(this._changedUser));
           this._userService.editInfo(userEdit).subscribe(res => {
             localStorage.setItem('currentUser',JSON.stringify(this._changedUser)); //postavim da je taj izmenjeni sada trenutno ulogovan
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


 
}
