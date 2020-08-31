import { ProfileClinicAdminComponent } from '../../../profile-clinic-admin/profile-clinic-admin.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEdit } from 'src/app/shared/model/UserEdit';

@Component({
  selector: 'app-edit-info-dialog',
  templateUrl: './edit-info-dialog.component.html',
  styleUrls: ['./edit-info-dialog.component.css']
})
export class EditInfoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: UserEdit) {}

  Cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
