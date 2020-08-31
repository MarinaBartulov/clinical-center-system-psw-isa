import { PatientSearch } from './../shared/model/PatientSearch';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class PatientService{

    constructor(private _apiService:ApiService, private _config: ConfigService){

    }

    getAllPatients(){
        return this._apiService.get("http://localhost:9000/api/patients/allSorted").pipe(
            map(patients => {
                console.log("All patients retrieved.");
                console.log(patients);
                return patients;
            })
          )

    }

    getAllCities(){
      return this._apiService.get("http://localhost:9000/api/patients/getAllCities").pipe(
          map(cities => {
             
              return cities;
          })
        )

  }



    getPatient(id:string){
        return this._apiService.get("http://localhost:9000/api/patients/patient/" + id).pipe(
            map(patient => {
                console.log("Patient retrieved:");
                console.log(patient);
                return patient;
            })
          )
    }
    getPatientMedicalRecord(id:string){
        return this._apiService.get("http://localhost:9000/api/patients/patientMedicalRecord/" + id).pipe(
            map(medRecord => {
                console.log("Patient retrieved:");
                console.log(medRecord);
                return medRecord;
            })
          )
    }

    getMedicalReports(id:string){
      return this._apiService.get("http://localhost:9000/api/patients/getMedicalReports/" + id).pipe(
          map(reports => {
              console.log("Medical reports retrieved");
              console.log(reports);
              return reports;
          })
        )
    }

     editPatientMedicalRecord(id:string,medicalRecord)
    {
      console.log("DDDD");
      console.log(medicalRecord);
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.put("http://localhost:9000/api/patients/editMedicalRecord/"+id,JSON.stringify(medicalRecord) ,editHeaders).pipe(
        map(result => {
          console.log("Patient medical record.");
        })
      )
    }
    addAlergicMedication(id:string,medication)
    {
     
      console.log(medication);
      const editHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      return this._apiService.put("http://localhost:9000/api/patients/addAlergicMedication/"+id,JSON.stringify(medication) ,editHeaders).pipe(
        map(result => {
          console.log("Add new alergic mmedication");
        })
      )
    }
    getPatientAlergicMed(id:string){
      return this._apiService.get("http://localhost:9000/api/patients/getPatientAlergicMed/" + id).pipe(
          map(alergicMed => {
              console.log(alergicMed);
              return alergicMed;
          })
        )
  }
  addChronicCondition(id:string,diagnose)
  {
   
    console.log(diagnose);
    const editHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this._apiService.put("http://localhost:9000/api/patients/addChronicCondition/"+id,JSON.stringify(diagnose) ,editHeaders).pipe(
      map(result => {
        console.log("Add new chronic condition");
      })
    )
  }
  getPatientChronicCon(id:string){
    return this._apiService.get("http://localhost:9000/api/patients/getPatientChronicCon/" + id).pipe(
        map(chronicCond => {
            console.log(chronicCond);
            return chronicCond;
        })
      )
}
getRatedClinics(id:string){
  return this._apiService.get("http://localhost:9000/api/patients/getRatedClinics/" + id).pipe(
      map(clinics => {
          console.log("clinics retrieved:");
          console.log(clinics);
          return clinics;
      })
    )
}

getRatedDoctors(id:string){
  return this._apiService.get("http://localhost:9000/api/patients/getRatedDoctors/" + id).pipe(
      map(doctors => {
          console.log("Doctors retrieved:");
          console.log(doctors);
          return doctors;
      })
    )
}

deleteChronicCondition(id:String, diagnosis)
    {
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this._apiService.delete("http://localhost:9000/api/patients/deleteChronicCondition/"+id,JSON.stringify(diagnosis)).pipe(
            map(result => {
            console.log("Chronic condition deleted");
      })
    )}

    deleteAllergicMedication(id:String, medication)
    {
        const editHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this._apiService.delete("http://localhost:9000/api/patients/deleteAllergicMedication/"+id,JSON.stringify(medication)).pipe(
            map(result => {
            console.log("Allergic medication deleted");
      })
    )}
getPatientSearch(patient:PatientSearch){

  const editHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  return this._apiService.post("http://localhost:9000/api/patients/searchPatients", JSON.stringify(patient), editHeaders).pipe(
    map(result => {
      return result;
      console.log(result);

    })
  )
}
makeAppointment(id:string,appointment)
{
  const editHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  return this._apiService.put("http://localhost:9000/api/patients/makeAppointment/"+id,JSON.stringify(appointment) ,editHeaders).pipe(
    map(result => {
      console.log("Appointment request send.");
    })
  )
}

    

}