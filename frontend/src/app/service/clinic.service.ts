import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Room } from '../shared/model/Room';
import { AvailableDoctorRequest } from '../shared/model/AvailableDoctorRequest';
import { IncomeDate } from '../shared/model/IncomeDate';




@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private _apiService: ApiService, private _config: ConfigService) {

  }

  getClinic(id) {
    return this._apiService.get("http://localhost:9000/api/clinics/getClinic/" + id).pipe(
      map(clinic => {
        return clinic;
      })
    )
  }
  getClinics() {
    return this._apiService.get("http://localhost:9000/api/clinics/getClinics").pipe(
      map(clinics => {
        return clinics;
      })
    )
  }



  editClinicInfo(clinic) {
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.put("http://localhost:9000/api/clinics/editClinic/" + clinic.id, JSON.stringify(clinic), editHeaders).pipe(
      map(result => {
        return result;
        //console.log("Clinic updated.");

      })
    )
  }

  getRooms(clinic_id){
    return this._apiService.get("http://localhost:9000/api/clinics/getRooms/" + clinic_id).pipe(
      map(rooms => {
        return rooms;
      })
    )
  }

  addNewRoom(clinic_id,room:Room){
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.post("http://localhost:9000/api/clinics/addNewRoom/" + clinic_id, JSON.stringify(room), editHeaders).pipe(
      map(result => {
        console.log("Room added.");

      })
    )
  }


  updateRoom(clinic_id,room:Room){
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.put("http://localhost:9000/api/rooms/updateRoom/" + room.id + "/" + clinic_id, JSON.stringify(room), editHeaders).pipe(
      map(result => {
        console.log("Room updated.");

      })
    )
  }
  rateClinic(id:String, rate: any){
    const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
    return this._apiService.put("http://localhost:9000/api/clinics/rateClinic/" + id, rate, editHeaders).pipe(
        map(updateCl => {
            return updateCl;
        })
    )

}
getFreeClinics(doctorReq:AvailableDoctorRequest){
  const editHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  return this._apiService.put("http://localhost:9000/api/clinics/getFreeClinics", JSON.stringify(doctorReq), editHeaders).pipe(
    map(res=> {
      return res;
    })
  )
}

getIncome(incomeDate: IncomeDate, clinic_id){
  const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.post("http://localhost:9000/api/clinics/getIncome/" + clinic_id, JSON.stringify(incomeDate), editHeaders).pipe(
      map(result => {
          return result;      
      })
    )
}

getDailyReport(clinicId:any, day:any){
  const editHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  return this._apiService.post("http://localhost:9000/api/clinics/getDailyReport/" + clinicId, JSON.stringify(day), editHeaders).pipe(
    map(hours => {
      console.log(hours);
        return hours;
    })
  )
}

getMonthlyReport(clinicId:any, day:any){
  const editHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  return this._apiService.post("http://localhost:9000/api/clinics/getMonthlyReport/" + clinicId, JSON.stringify(day), editHeaders).pipe(
    map(weeks => {
      
        return weeks;
    })
  )
}

getAnnualReport(clinicId:any, day:any){
  const editHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  return this._apiService.post("http://localhost:9000/api/clinics/getAnnualReport/" + clinicId, JSON.stringify(day), editHeaders).pipe(
    map(months => {
      
        return months;
    })
  )
}

}
