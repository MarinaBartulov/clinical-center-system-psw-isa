import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClinicalCenterAdminService } from '../service/clinical-center-admin.service';
import { Clinic } from './Clinic';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-register-clinic',
  templateUrl: './register-clinic.component.html',
  styleUrls: ['./register-clinic.component.css']
})
export class RegisterClinicComponent implements OnInit {

  constructor(private _router: Router, 
    private _clcadminService: ClinicalCenterAdminService,
    private _notifier: NotifierService) {
      this._newClinic = new Clinic;
  }

  _newClinic: Clinic;

  ngOnInit() {
    this.resetForm(); 
  }

  clickRegisterClinic() {
    this._clcadminService.createClinic(this._newClinic).subscribe(
      data => {
        this._notifier.notify("success","Clinic successfully registered.");
          setTimeout(() => {
          this._notifier.hideAll();
          }, 3000)
          this.resetForm();
      },
      error => {
        let message = "";
        if(typeof(error.error) == "string")
        {
          message = error.error;
        }else{
          message = "Something went wrong. Clinic registration failed. Please try again.";
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
    this._newClinic = new Clinic;
  }

}
