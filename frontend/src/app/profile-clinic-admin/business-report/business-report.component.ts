import { ClinicService } from 'src/app/service/clinic.service';
import { MedicalExamService } from './../../service/medical-exam-service';
import { IncomeDate } from './../../shared/model/IncomeDate';
import { DoctorService } from 'src/app/service/doctor.service';
import { ClinicAdminService } from './../../service/clinic-admin.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { Clinic } from 'src/app/hp-patient/clinic-list/Clinic';
import { DoctorRating } from 'src/app/shared/model/DoctorRating';
import { Hour } from 'src/app/shared/model/Hour';
import { Week } from 'src/app/shared/model/Week';
import { Month } from 'src/app/shared/model/Month';

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.css']
})
export class BusinessReportComponent implements OnInit {

  constructor(private _route: ActivatedRoute,private _router: Router, private _dialog: MatDialog,
     private _notifier:NotifierService, private _clinicAdminService: ClinicAdminService, private _doctorService:DoctorService,
     private _medicalExamsService:MedicalExamService, private _clinicService:ClinicService) { }

  private _currentAdmin: any;
  private _clinicId: String; 
  private _clinic: Clinic;
  private _showClinicRating: boolean;
  private _showDoctorsRating: boolean;
  private _showIncome: boolean;
  private _showCharts: boolean;
  private _doctors: DoctorRating[];
  private _income: number;
  private _startDate: any;
  private _endDate: any;
  private _hours: Hour[];
  private _weeks: Week[];
  private _months: Month[];
  private _selectedDay:any;
  private _showAllReports:boolean;

  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
      this._clinicId = params.get('id'); 
    });
    this._clinicAdminService.getMyClinic().subscribe(clinic => {       
      this._clinic = clinic;
    })
    this._doctorService.getAllDoctorsRating(this._clinicId).subscribe(
      res => {
         this._doctors = res;
      }
    )

    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
    this._showClinicRating = false;
    this._showDoctorsRating = false;
    this._showIncome = false;
    this._showCharts = false;
    this._income = 0;
    this._showAllReports = false;
    
    
  }


  clickedBack(){
    this._router.navigate(["/clinicAdminProfile"]);
  }

  showClinicRating(){
    if(this._showClinicRating){
      this._showClinicRating = false;
    }else{
      this._showClinicRating = true;
    }
  }

  showDoctorsRating(){
    if(this._showDoctorsRating){
      this._showDoctorsRating = false;
    }else{
      this._showDoctorsRating = true;
    }
  }

  showIncome(){
    if(this._showIncome){
      this._showIncome = false;
    }else{
      this._showIncome = true;
    }
  }

  showCharts(){
    if(this._showCharts){
      this._showCharts = false;
    }else{   
      this._showCharts = true;   
    }
  }

  getIncome(){
    let startDate = [this._startDate['year'],this._startDate['month'],this._startDate['day']];
    let endDate = [this._endDate['year'],this._endDate['month'],this._endDate['day']];

    let incomeDate = new IncomeDate(startDate,endDate);

    this._clinicService.getIncome(incomeDate,this._clinicId).subscribe(
      res => {
        this._income = res;
      }
    )
  }

  reset(){
     this._startDate = null;
     this._endDate = null;
     this._income = 0;
  }

  getReports(){
    let day = [];
    day[0] = this._selectedDay["year"];
    day[1] = this._selectedDay["month"];
    day[2] = this._selectedDay["day"];
    this._clinicService.getDailyReport(this._clinicId, day).subscribe(
      res => {
        this._hours = res;
        this._clinicService.getMonthlyReport(this._clinicId, day).subscribe(
          res => {
            this._weeks = res;
            this._clinicService.getAnnualReport(this._clinicId, day).subscribe(
              res => {
                this._months = res;
                this._showAllReports = true;
              }
          
        )
      }
    )
  })
}


  //charts
  days: any[] = [
    { Day: 'Monday', Number: 30 },
    { Day: 'Tuesday', Number: 20 },
    { Day: 'Wednesday', Number: 10 },
    { Day: 'Thursday', Number: 30 },
    { Day: 'Friday', Number: 15 },
    { Day: 'Saturday', Number: 25 },
    { Day: 'Sunday', Number: 23 }
];

weeks: any[] = [
  { Week: '13/1/2020', Number: 30 }, 
  { Week: '20/1/2020', Number: 20 }, 
  { Week: '27/1/2020', Number: 10 }, 
  { Week: '3/2/2020', Number: 30 } 
];

months: any[] = [
  { Month: 'Nov', Number: 30 }, 
  { Month: 'Dec', Number: 20 }, 
  { Month: 'Jan', Number: 10 }, 
  { Month: 'Feb', Number: 30 } 
];

getWidth() : any {
  if (document.body.offsetWidth < 850) {
    return '90%';
  }
  
  return 850;
}

  padding: any = { left: 5, top: 5, right: 5, bottom: 5 };
  titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };
  xAxis1: any =
  {
      dataField: 'hour',
      showGridLines: true
  };

  xAxis2: any =
  {
      dataField: 'week',
      showGridLines: true
  };

  xAxis3: any =
  {
      dataField: 'month',
      showGridLines: true
  };

  seriesGroups: any[] =
    [
        {
            type: 'column',
            columnsGapPercent: 50,
            seriesGapPercent: 0,
            valueAxis:
            {
                unitInterval: 10,
                minValue: 0,
                maxValue: 10,
                displayValueAxis: true,
                description: 'Number of medical exams',
                axisSize: 'auto',
                tickMarksColor: '#888888'
            },
            series: [
                { dataField: 'number', displayText: 'Number of medical exams' }
                
            ]
        }
    ];

    

}
