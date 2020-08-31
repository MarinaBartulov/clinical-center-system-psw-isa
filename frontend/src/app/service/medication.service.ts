import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { CodebookItem } from '../profile-clinical-center-admin/CodebookItem';

@Injectable()
export class MedicationService{

    constructor(private _apiService:ApiService, 
        private _config: ConfigService){

    }

    getMedications() {
        return this._apiService.get("http://localhost:9000/api/medications/getMedications").pipe(
          map(medications => {
            return medications;
          })
        )
    }
    //Moram zamjeniti PUT i POST
    addNewMedication(medication: CodebookItem)
    {
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.put("http://localhost:9000/api/medications/addNewMedication",medication ,editHeaders).pipe(
      map(result => {
        console.log("Medication added.");
      })
    )
    }

    editMedication(medication)
    {
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.post("http://localhost:9000/api/medications/editMedication",medication ,editHeaders).pipe(
        map(result => {
          console.log("Medication edited.");
        })
      )
    }
}