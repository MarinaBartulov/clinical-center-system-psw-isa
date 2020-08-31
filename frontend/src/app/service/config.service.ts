import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ConfigService{

    private _auth_url = 'http://localhost:9000/auth';
    private _server_url = 'http://localhost:9000';
    private _login_url = this._auth_url + '/login';
    private _signup_url = this._auth_url + '/signup';
    private _passchange_url = this._auth_url + '/changePassword'
    private _whoami_url = this._server_url + '/users/currentUser';
    private _edituser_url =this._server_url + '/users/editUser';
    private _clcadmin_url = 'http://localhost:9000/api/clinicalCenterAdmin';
    private _confirmationReg_url = this._auth_url + '/confirmRegistration';

 
    get login_url(): string {
        return this._login_url;
    }

    get signup_url(): string {
        return this._signup_url;
      }
    
    get whoami_url(): string {
      return this._whoami_url;
    }
    get edituser_url():string{
      return this._edituser_url;
    }
    get server_url():string{
      return this._server_url;
    }
    get passchange_url():string{
      return this._passchange_url;
    }

    get clcadmin_url(): string {
      return this._clcadmin_url;
    }

    get confirmationReg_url(): string {
      return this._confirmationReg_url;
    }

}