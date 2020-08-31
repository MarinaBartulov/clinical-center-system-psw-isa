import { AuthService } from './../../../service/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PasswordChanger } from '../../model/PasswordChanger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-login-dialog',
  templateUrl: './first-login-dialog.component.html',
  styleUrls: ['./first-login-dialog.component.css']
})
export class FirstLoginDialogComponent implements OnInit {

  private _currentUser: any;
  private _confirmPassword: String;
  private _showError: boolean;
  private _showMsg: boolean;


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordChanger,private _authService:AuthService, private _router: Router) {}

  ngOnInit() {
     this._currentUser = JSON.parse(localStorage.getItem("currentUser"));
     this._confirmPassword = "";
     this._showError = false;
     this._showMsg = false;
  }

  logout(): void {
    this.dialogRef.close();
    this._authService.logout();
  }

  changePassword(){

    this._authService.changePassoword(this.data).subscribe(
      res => {
         
        this._showMsg = true;
        setTimeout(() => {
          this._showMsg = false;
          this.dialogRef.close();
          this._authService.logout(); 
          this._router.navigate(['\login']);
        }, 2500)
      
      },
       error => {
        this._showError = true;
        setTimeout(() => {
          this._showError = false;
        }, 2500)
       }
       );
  }

}
