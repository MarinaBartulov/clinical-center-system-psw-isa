import { FARequest } from './../shared/model/FARequest';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })
  export class FastAppointmentService {

    constructor(private _apiService:ApiService){}
    
    addNewFA(faRequest:FARequest, clinic_id: String){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this._apiService.post("http://localhost:9000/api/fastAppointments/addNewFA/" + clinic_id, JSON.stringify(faRequest), editHeaders).pipe(
            map(result => {
              console.log("Fast appointment added.");
      
            })
          )
    }

    getAllFastAppointments(clinic_id){
      return this._apiService.get("http://localhost:9000/api/fastAppointments/getAllFA/" + clinic_id).pipe(
            map(fastAppointments => {
                return fastAppointments;
            })
        )
    }

    getFreeFastAppointments(clinic_id){
      return this._apiService.get("http://localhost:9000/api/fastAppointments/getFreeFA/" + clinic_id).pipe(
            map(fastAppointments => {
                return fastAppointments;
            })
        )
    }

    getReservedFastAppointments(doctor_id){
      return this._apiService.get("http://localhost:9000/api/fastAppointments/getReservedFA/" + doctor_id).pipe(
            map(fastAppointments => {
                return fastAppointments;
            })
        )
    }

    
    getDoctorPatientFastAppointments(id:string){
      return this._apiService.get("http://localhost:9000/api/fastAppointments/getDoctorPatientFA/" + id).pipe(
            map(fastAppointments => {
               console.log(fastAppointments);
                return fastAppointments;
            })
        )
    }
    

    reserveFA(id:Number,idP:any){
      const editHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
      return this._apiService.put("http://localhost:9000/api/fastAppointments/reserveFA/" + id + "/" + idP, editHeaders).pipe(
          map(result => {
              console.log("Fast appointment reserved.");
          })
      )         

  }


  }
