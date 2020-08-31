import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ClinicAdminService{

    constructor(private _apiService:ApiService, private _config: ConfigService){

    }

    getMyClinic(){
        return this._apiService.get("http://localhost:9000/api/clinicAdmins/getMyClinic").pipe(
            map(clinic => {
                console.log(clinic);
                return clinic;
            })
          )

    }

}
