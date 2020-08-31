import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import {HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClinicalCenterAdministrator } from '../profile-clinical-center-admin/ClinicalCenterAdministrator';

@Injectable({
  providedIn: 'root'
})
export class ClinicalCenterAdminService {

  constructor( private _apiService:ApiService, private _config: ConfigService ) {

   }

   createClCAdmin(admin: ClinicalCenterAdministrator)
   {
    const registrationHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.post(this._config.clcadmin_url+'/saveClinicalCenterAdmin', JSON.stringify(admin), registrationHeaders)
        .pipe(map((res) => {
          console.log(res);
          console.log('Registration of admin successful');
        }));
   }

   createClinicAdmin(admin, clinic)
   {
    const registrationHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.post(this._config.clcadmin_url+'/saveClinicAdmin/'+clinic, JSON.stringify(admin), registrationHeaders)
        .pipe(map((res) => {
          console.log(res);
          console.log('Registration of admin successful');
        }));
   }

   getClinics() //ovo ne treba ovde
   {
    return this._apiService.get("http://localhost:9000/api/clinics/getClinics").pipe(
      map(clinics => {
          console.log("All clinics retrieved.");
          return clinics;
      })
    )
   }

   createClinic(clinic)
   {
    const registrationHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.post(this._config.clcadmin_url+'/saveClinic/', JSON.stringify(clinic), registrationHeaders)
        .pipe(map((res) => {
          console.log(res);
        }));
   }


   getNewRequests()
   {
    return this._apiService.get("http://localhost:9000/api/clinicalCenterAdmin/getNewRequests").pipe(
      map(users => {
          console.log("All patients retrieved.");
          return users;
      })
    )
   }
   
   acceptRequest(id)
   {
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.put("http://localhost:9000/api/clinicalCenterAdmin/acceptRequest/"+id, editHeaders)
      .pipe(map((res) => {
        console.log(res);
      }));
   }

   rejectRequest(id,message)
   {
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.put("http://localhost:9000/api/clinicalCenterAdmin/rejectRequest/"+id, message,editHeaders)
      .pipe(map((res) => {
        console.log(res);
      }));
   }

}
