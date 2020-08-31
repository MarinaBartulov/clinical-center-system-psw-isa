import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService{

    constructor(private _apiService:ApiService, private _config: ConfigService){

    }

    getMyInfo() {
        return this._apiService.get(this._config.whoami_url)
          .pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user)); //sacuvaju se osnovni podaci o ulogovanom useru
            console.log(JSON.parse(localStorage.getItem('currentUser')));
            console.log(user.authorities[0]['authority']);
            return user;
          }));
      }
      editInfo(user) {
        const editHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        return this._apiService.put(this._config.edituser_url, JSON.stringify(user), editHeaders)
          .pipe(map((res) => {
            console.log(res);
          }));
      }
      
      changePassword(user) {
        const editHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        return this._apiService.put(this._config.passchange_url, JSON.stringify(user), editHeaders)
          .pipe(map((res) => {
            console.log(res);
          }));
      }

      confirmRegistration(token) {
        return this._apiService.get(this._config.confirmationReg_url + "/" + token)
          .pipe(map((res) => {
               console.log(res);
          }));
      }
  
}