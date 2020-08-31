import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class MedicalReportService{

    constructor(private _apiService:ApiService, 
        private _config: ConfigService){
    }

    getPrescriptions(id:string){
        return this._apiService.get("http://localhost:9000/api/medicalReport/getPrescriptions/" + id).pipe(
            map(prescriptions => {
                console.log('Medical report prescriptions retrieved');
                console.log(prescriptions);
                return prescriptions;
            })
          )
    }

    getDiagnosis(id:string){
        return this._apiService.get("http://localhost:9000/api/medicalReport/getDiagnosis/" + id).pipe(
            map(diagnosis => {
                console.log('Medical report diagnosis retrieved');
                console.log(diagnosis);
                return diagnosis;
            })
          )
    }

    editMedicalReport(medicalReport)
    {
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this._apiService.put("http://localhost:9000/api/medicalReport/editMedicalReport/",JSON.stringify(medicalReport) ,editHeaders).pipe(
            map(result => {
            console.log("Medical report edited");
      })
    )
    }

    addDiagnosis(id:String, diagnosis)
    {
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this._apiService.post("http://localhost:9000/api/medicalReport/addDiagnosis/"+id,JSON.stringify(diagnosis) ,editHeaders).pipe(
            map(result => {
            console.log("Diagnosis added");
      })
    )}

    createMedicalReport(id:String, medicalReport)
    {
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this._apiService.post("http://localhost:9000/api/medicalReport/createMedicalReport/"+id,JSON.stringify(medicalReport),editHeaders).pipe(
            map(result => {
            console.log("Medical report created");
      })
    )}

    deleteDiagnosis(id:String, diagnosis)
    {
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this._apiService.delete("http://localhost:9000/api/medicalReport/deleteDiagnosis/"+id,JSON.stringify(diagnosis)).pipe(
            map(result => {
            console.log("Diagnosis deleted");
      })
    )}

    
}