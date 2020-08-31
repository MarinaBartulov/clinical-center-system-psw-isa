import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { SignUpUser } from './SignUpUser';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  _signUpUser: SignUpUser;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  confirmPassword: String;
  show :  boolean;
 
  message: String;
  constructor(private _route: ActivatedRoute, 
    private _router: Router,
     private _authService: AuthService, private _dialog: MatDialog, private _notifier: NotifierService) {
       this.show = false
       this._signUpUser = new SignUpUser();
      }

  ngOnInit() {
    this.resetForm(); 
  }

  resetForm(form?: NgForm) {
   
    if (form != null) {
      form.reset();
    }
    
    this.confirmPassword = "";
    this.message = "";
  }
  onClickedRegister() {
    console.log(this._signUpUser);
    this._authService.signup(this._signUpUser).subscribe(data => {
      let dialogRef1 = this._dialog.open(InfoDialogComponent, {
        width: '50%',
        data: "Registration request has been sent. When administrators approve it, you will get an email for further instructions."
      });

      dialogRef1.afterClosed().subscribe(result => { 
       this._router.navigate(['\login']);
     });
    },
    error => {
      let message = "";
      if(typeof(error.error) == "string"){
          message = error.error;
      }else{
          message = "Something went wrong. Registration failed. Please try again.";
      }
      this._notifier.notify("error",message);
      setTimeout(() => {
      this._notifier.hideAll();
    }, 5000)
    })
  
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

  back(){
    this._router.navigate(['\login']);
  }
}
