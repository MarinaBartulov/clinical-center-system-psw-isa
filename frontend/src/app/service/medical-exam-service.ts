import { MERoomRequest } from './../shared/model/MERoomRequest';
import { IncomeDate } from './../shared/model/IncomeDate';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class MedicalExamService{

    constructor(private _apiService:ApiService, 
        private _config: ConfigService){

    }
    getMedicalExam(id:string){
        return this._apiService.get("http://localhost:9000/api/medicalExams/getMedicalExam/" + id).pipe(
            map(exam => {
                console.log(exam);
                return exam;
            })
          )
    }

    getDoctorsExams(id:string){
        return this._apiService.get("http://localhost:9000/api/medicalExams/getDoctorsExams/" + id).pipe(
            map(exams => {
                //console.log(exam);
                return exams;
            })
          )
    }

    getDoctorPatientExams(id:string)
    {
        return this._apiService.get("http://localhost:9000/api/medicalExams/getDoctorPatientExams/" + id).pipe(
            map(exams => {
                //console.log(exam);
                return exams;
            })
          )
    }


    getNumExamRequests(idClinic){
        return this._apiService.get("http://localhost:9000/api/medicalExams/getNumExamRequests/" + idClinic).pipe(
            map(num => {
                console.log(num);
                return num;
            })
          )
    }

    getExamRequests(idClinic){
        return this._apiService.get("http://localhost:9000/api/medicalExams/getExamRequests/" + idClinic).pipe(
            map(exams => {
                console.log(exams);
                return exams;
            })
          )
    }

    getMedicalExamRequest(idExam){
        return this._apiService.get("http://localhost:9000/api/medicalExams/getExamRequest/" + idExam).pipe(
            map(exam => {
                console.log(exam);
                return exam;
            })
          )
    }

    getAvailableRooms(idExam){
        return this._apiService.get("http://localhost:9000/api/medicalExams/getAvailableRoomsExam/" + idExam).pipe(
            map(rooms => {
                return rooms;
            })
          )
    }

    reserveRoom(meRoomR:MERoomRequest){

        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          console.log(JSON.stringify(meRoomR));
          return this._apiService.put("http://localhost:9000/api/medicalExams/reserveRoom", JSON.stringify(meRoomR), editHeaders).pipe(
            map(result => {
                return result;      
            })
          )
    }

    rejectExamRequest(idExam){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this._apiService.put("http://localhost:9000/api/medicalExams/rejectExamAdmin/" + idExam, editHeaders).pipe(
            map(result => {
                return result;      
            })
          )
    }

    acceptExamReservation(idExam){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this._apiService.put("http://localhost:9000/api/medicalExams/acceptExamPatient/" + idExam, editHeaders).pipe(
            map(result => {
                return result;      
            })
          )
    }

    rejectExamReservation(idExam){
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this._apiService.put("http://localhost:9000/api/medicalExams/rejectExamPatient/" + idExam, editHeaders).pipe(
            map(result => {
                return result;      
            })
          )
    }

}