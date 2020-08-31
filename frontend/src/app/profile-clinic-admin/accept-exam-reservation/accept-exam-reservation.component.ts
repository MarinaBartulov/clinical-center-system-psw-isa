import { MedicalExamService } from 'src/app/service/medical-exam-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accept-exam-reservation',
  templateUrl: './accept-exam-reservation.component.html',
  styleUrls: ['./accept-exam-reservation.component.css']
})
export class AcceptExamReservationComponent implements OnInit {

  constructor(private _medicalExamService:MedicalExamService,private _route: ActivatedRoute,private _router: Router) { }

  private _examId: any;

  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
      this._examId = params.get('id'); 
    });
      this._medicalExamService.acceptExamReservation(this._examId).subscribe(
        res =>{
          console.log("Accepted exam reservation.");
        }
      )
  }

}
