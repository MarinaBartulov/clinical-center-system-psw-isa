import { Component, OnInit, Input} from '@angular/core';
import { UserService } from './../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {PasswordChanger } from '../shared/model/PasswordChanger'
import { PasswordWrongDialogComponent } from '../shared/dialogs/password-wrong-dialog/password-wrong-dialog.component';
import { EditPasswordDialogComponent } from '../shared/dialogs/edit-password-dialog/edit-password-dialog.component';
import { PasswordChangedDialogComponent } from '../shared/dialogs/password-changed-dialog/password-changed-dialog.component';
import { ModalService } from '../_modal';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {
  @Input("_signUpUser") _signUpUser : any;
  @Input("showHome") showHome : boolean;
  @Input("show") show : boolean;
  _passwordChanger : PasswordChanger;
  confirmPassword: String;
  oldPassword: String;

  message: String;
  changePasswordMessage : String;
 
  constructor(private _route: ActivatedRoute, 
    private _router: Router,
     private _authService: AuthService,private _userService:UserService,
      private _modalService: ModalService,private _dialog: MatDialog) {

  
      }
 
  ngOnInit() {
    this._passwordChanger = new PasswordChanger("","");
    this.oldPassword = ""
    this.confirmPassword = ""
    this.show = false;
    this.showHome = true;
  }
 
  showPasswordInput(){
    // if(this.show == true){
    //   this.changePasswordMessage = "Patient profile informations:"
    //   this.show = false;
    // }else{
     
    //   this.changePasswordMessage = "Password change:"
    //   this.show = true;
      
    // }
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
  onChangeClicked(){
    console.log(this._signUpUser);
   
    if(this.show == false){
      this._userService.editInfo(this._signUpUser).subscribe(data => {
      },
      error => {
        alert("Patient info change error.");
      })
    }else{
      console.log(this.oldPassword)
      console.log(this.confirmPassword)
      this._passwordChanger = new PasswordChanger(this.oldPassword,this.confirmPassword);
      console.log(this._passwordChanger);
      this._userService.changePassword(this._passwordChanger).subscribe(data => {
      },
      error => {
       
        alert("Error in password change.");
      })
    }
    

    
  }
  onPasswordChange(){
    if(this._signUpUser.password != this.confirmPassword){
      this.message = "changed";
    }else {
      this.message = ""
    }
    
  }
  onConfirnChange(){
    if(this._signUpUser.password == this.confirmPassword){
      this.message = ""
    }else{
      this.message = "changed";
    }
  }
  

}
