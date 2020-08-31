import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ClinicalCenterAdministrator } from './ClinicalCenterAdministrator';

import { NgForm } from '@angular/forms';
import { ClinicalCenterAdminService } from '../service/clinical-center-admin.service';
import { MatDialog } from '@angular/material';
import { InfoDialogComponent } from '../shared/dialogs/info-dialog/info-dialog.component';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-register-clinical-center-admin',
  templateUrl: './register-clinical-center-admin.component.html',
  styleUrls: ['./register-clinical-center-admin.component.css']
})
export class RegisterClinicalCenterAdminComponent implements OnInit {

  constructor(private _router: Router, private _clcadminService: ClinicalCenterAdminService,
    private _notifier: NotifierService) {
    this._newAdmin=new ClinicalCenterAdministrator();
  }
  _newAdmin : ClinicalCenterAdministrator;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
 
  
  ngOnInit() {
    this.resetForm(); 
  }

  clickRegisterClCAdmin() {
    this._clcadminService.createClCAdmin(this._newAdmin).subscribe(data => {
      
      this._notifier.notify("success","Clinical center admin successfully registered.");
        setTimeout(() => {
        this._notifier.hideAll();
        }, 2000)
        this.resetForm();
      },
      error => {
        let message = "";
        if(typeof(error.error) == "string"){
          message = error.error;
        }else{
          message = "Something went wrong. Clinical center admin registration failed. Please try again.";
        }
        this._notifier.notify("error",message);
        setTimeout(() => {
        this._notifier.hideAll();
       }, 3000)
   })  
   
  }

  onBackClicked(): void {
    this._router.navigate(['/clinicalCenterAdminProfile']);
  }

  resetForm() {
     this._newAdmin = new ClinicalCenterAdministrator();
  }

}
