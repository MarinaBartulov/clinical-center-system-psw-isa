import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { CodebookItem } from '../profile-clinical-center-admin/CodebookItem';

@Injectable()
export class DiagnosisService{

    constructor(private _apiService:ApiService, 
        private _config: ConfigService){

    }

    getDiagnosis() {
      console.log("Diagnosis list")
        return this._apiService.get("http://localhost:9000/api/diagnosis/getDiagnosis").pipe(
          map(diagnosis => {
            return diagnosis;
          })
        )
    }

    addNewDiagnosis(diagnosis: CodebookItem)
    {
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.put("http://localhost:9000/api/diagnosis/addNewDiagnosis",diagnosis ,editHeaders).pipe(
      map(result => {
        console.log("Diagnosis added.");

      })
    )
    }
    //moram zamjeniti PUT i POST
    editDiagnosis(diagnosis)
    {
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.post("http://localhost:9000/api/diagnosis/editDiagnosis",diagnosis ,editHeaders).pipe(
        map(result => {
          console.log("Diagnosis edited.");
        })
      )
    }

}