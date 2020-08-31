import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reg-confirmation',
  templateUrl: './reg-confirmation.component.html',
  styleUrls: ['./reg-confirmation.component.css']
})
export class RegConfirmationComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _userService: UserService, private _router: Router) {
   }

   private _success: boolean;
   private _error: boolean;
   private _token: String;
   private _errorMessage: String = "";

  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
    this._token = params.get('token');
    this._userService.confirmRegistration(this._token).subscribe(
      res => {
            this._success = true;
            this._error = false;
      },
      error => {
            this._error = true;
            this._success = false;
            this._errorMessage = error.error;
      }
    ) 
  })
}

goToLogin(){
  this._router.navigate(['\login']);
}

}
