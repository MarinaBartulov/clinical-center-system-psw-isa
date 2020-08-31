import { PasswordChanger } from '../../model/PasswordChanger';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfileClinicAdminComponent } from '../../../profile-clinic-admin/profile-clinic-admin.component';

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.css']
})
export class EditPasswordDialogComponent implements OnInit {

  
  private _confirmPassword: String;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordChanger) {}

  Cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this._confirmPassword = "";
  }

}
