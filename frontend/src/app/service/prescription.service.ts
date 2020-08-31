import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class PrescriptionService{

    constructor(private _apiService:ApiService, 
        private _config: ConfigService){

    }

    getPrescriptions() {
        return this._apiService.get("http://localhost:9000/api/prescriptions/getPrescriptions").pipe(
          map(prescriptions => {
            return prescriptions;
          })
        )
    }

    verify(id) {
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.put("http://localhost:9000/api/prescriptions/verify/"+id, editHeaders).pipe(
        map(result => {
          console.log("Prescription verified.");
  
        })
      )  
    }
}