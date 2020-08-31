import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { ReserveDoctor } from '../shared/model/ReserveDoctor';


@Injectable()
export class SurgeryService{

    constructor(private _apiService:ApiService, 
        private _config: ConfigService){

    }
    getSurgeries(id:string){
        return this._apiService.get("http://localhost:9000/api/surgery/getSurgeries/" + id).pipe(
            map(surgery => {
                console.log(surgery);
                return surgery;
            })
          )
    }

    getDoctorsSurgeries(id:string){
        return this._apiService.get("http://localhost:9000/api/surgery/getDoctorsSurgeries/" + id).pipe(
            map(surgeries => {
               // console.log(surgeries);
                return surgeries;
            })
          )
    }

    getNumSurgeryRequests(idClinic){
        return this._apiService.get("http://localhost:9000/api/surgery/getNumSurgeryRequests/" + idClinic).pipe(
            map(num => {
                console.log(num);
                return num;
            })
          )
    }

    getSurgeryRequests(idClinic){
        return this._apiService.get("http://localhost:9000/api/surgery/getSurgeryRequests/" + idClinic).pipe(
            map(surgeries => {
                console.log(surgeries);
                return surgeries;
            })
          )
    }

    getSurgeryRequest(id){
        return this._apiService.get("http://localhost:9000/api/surgery/getSurgeryRequest/" + id).pipe(
            map(s => {
                console.log(s);
                return s;
            })
          )
    }

    getAvailableRoomsTerms(id){
        return this._apiService.get("http://localhost:9000/api/surgery/getAvailableRoomsSurgery/" + id).pipe(
            map(rooms => {
                console.log(rooms);
                return rooms;
            })
          )
    }

    reserve(request: ReserveDoctor, idSurgery)
    {
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this._apiService.put("http://localhost:9000/api/surgery/reserve/"+idSurgery, JSON.stringify(request), editHeaders).pipe(
            map(res => {
                return res;
            })
        )
    }

    rejectSurgeryRequest(id){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this._apiService.put("http://localhost:9000/api/surgery/rejectSurgeryAdmin/" + id, editHeaders).pipe(
            map(result => {
                return result;      
            })
          )
    }


}