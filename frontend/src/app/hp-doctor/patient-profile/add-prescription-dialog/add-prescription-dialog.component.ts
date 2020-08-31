import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MedicationService } from 'src/app/service/medication.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-prescription-dialog',
  templateUrl: './add-prescription-dialog.component.html',
  styleUrls: ['./add-prescription-dialog.component.css']
})
export class AddPrescriptionDialogComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private _medicationService: MedicationService,
    private _notifier: NotifierService) { }

  private _medications: any[];

  ngOnInit() {
    this._medicationService.getMedications().subscribe(m => {
      this._medications = m;
    })
  }

  clickAddMedication(medication){
    this.data.push(medication);
    this._notifier.notify("success","Medication added");
        setTimeout(() => {
         this._notifier.hideAll();
       }, 2000)
  }

  Cancel(): void {
    this.dialogRef.close();
  }

}
