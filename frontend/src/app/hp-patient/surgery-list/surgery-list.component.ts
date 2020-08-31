import { Component, OnInit, Input } from '@angular/core';
import { Surgery } from 'src/app/shared/model/Surgery';
import {Sort} from '@angular/material/sort';
@Component({
  selector: 'app-surgery-list',
  templateUrl: './surgery-list.component.html',
  styleUrls: ['./surgery-list.component.css']
})
export class SurgeryListComponent implements OnInit {

  constructor() { }
  @Input("_surgeries") _surgeries : any;
  _sortedSurgeries : Surgery;
  ngOnInit() {
    this._sortedSurgeries = this._surgeries;
    console.log(this._sortedSurgeries, this._surgeries);
  }
  sortData(sort: Sort) {
   
    const data = this._surgeries.slice();
    if (!sort.active || sort.direction === '') {
      this._sortedSurgeries = data;
      return;
    }

    this._sortedSurgeries = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'startTime': return compare(a.startTime, b.startTime, isAsc);
        case 'endTime': return compare(a.endTime, b.endTime, isAsc);
        case 'examType': return compare(a.surgeryType, b.surgeryType, isAsc);
        default: return 0;
      }
    });
  }

  formatTime(time:Number[]){
    let timeStr: String = "";
    if(time[0]<10){
      timeStr += '0' + time[0];
    }else{
      timeStr += '' + time[0];
    }
  
    timeStr += ':' + time[1] + '0';
    return timeStr; 
  }
  

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

