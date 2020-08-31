import { AbsenceRequest } from './../shared/model/AbsenceRequest';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class AbsenceService {

    constructor(private _apiService:ApiService){}

    sendRequestDoctor(absenceRequest:AbsenceRequest){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this._apiService.post("http://localhost:9000/api/absences/sendRequestDoctor", JSON.stringify(absenceRequest), editHeaders).pipe(
            map(result => {
              console.log("Request for absence sent.");
      
            })
          )
    }

    sendRequestNurse(absenceRequest:AbsenceRequest){
      const editHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        return this._apiService.post("http://localhost:9000/api/absences/sendRequestNurse", JSON.stringify(absenceRequest), editHeaders).pipe(
          map(result => {
            console.log("Request for absence sent.");
    
          })
        )
  }
    getAllRequestedAbsences(clinicId:String){
      return this._apiService.get("http://localhost:9000/api/absences/getAllRequestedAbsences/" + clinicId).pipe(
            map(absenceRequests => {
                   return absenceRequests;      
            })
          )
    }

    getAllAbsences(userId:String){
      return this._apiService.get("http://localhost:9000/api/absences/getAllAbsences/" + userId).pipe(
            map(absenceRequests => {
                   return absenceRequests;      
            })
          )
    }

    getNumberOfRequests(clinicId:Number){
      return this._apiService.get("http://localhost:9000/api/absences/getNumberOfRequests/" + clinicId).pipe(
            map(requestsNumber => {
                   return requestsNumber;      
            })
          )
    }

    approveAbsence(absenceId){
          const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this._apiService.put("http://localhost:9000/api/absences/approveAbsence/" + absenceId,editHeaders).pipe(
            map(result => {
              console.log("Request for absence approved.");
      
            })
          )  
        }

    rejectAbsence(absenceId, message){
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.put("http://localhost:9000/api/absences/rejectAbsence/" + absenceId, message, editHeaders).pipe(
        map(result => {
          console.log("Request for absence rejected.");
  
        })
      )  
    }
  }
