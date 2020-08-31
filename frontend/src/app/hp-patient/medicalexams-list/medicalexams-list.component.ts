import { Component, OnInit, Input } from '@angular/core';
import { MedicalExam } from 'src/app/shared/model/MedicalExam';
import {Sort} from '@angular/material/sort';
@Component({
  selector: 'app-medical-exams-list',
  templateUrl: './medicalexams-list.component.html',
  styleUrls: ['./medicalexams-list.component.css']
})
export class MedicalexamsListComponent implements OnInit {

  constructor() { }
  @Input("_medicalExams") _medicalExams : any;
  _sortedMedicalExams : MedicalExam;
  ngOnInit() {
    this._sortedMedicalExams = this._medicalExams;
    console.log(this._sortedMedicalExams, this._medicalExams);
  }
  sortData(sort: Sort) {
   
    const data = this._medicalExams.slice();
    if (!sort.active || sort.direction === '') {
      this._sortedMedicalExams = data;
      return;
    }

    this._sortedMedicalExams = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'startTime': return compare(a.startTime, b.startTime, isAsc);
        case 'endTime': return compare(a.endTime, b.endTime, isAsc);
        case 'examType': return compare(a.examType, b.examType, isAsc);
           case 'doctor': return compare(a.doctor, b.doctor, isAsc);
        default: return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
