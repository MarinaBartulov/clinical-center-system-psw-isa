import { Component, OnInit } from '@angular/core';
import { MedicalExamService } from 'src/app/service/medical-exam-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reject-exam-reservation',
  templateUrl: './reject-exam-reservation.component.html',
  styleUrls: ['./reject-exam-reservation.component.css']
})
export class RejectExamReservationComponent implements OnInit {

  constructor(private _medicalExamService:MedicalExamService,private _route: ActivatedRoute,private _router: Router) { }

  private _examId: any;

  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
      this._examId = params.get('id'); 
    });
      this._medicalExamService.rejectExamReservation(this._examId).subscribe(
        res =>{
          console.log("Rejected exam reservation.");
        }
      )
  }

}
