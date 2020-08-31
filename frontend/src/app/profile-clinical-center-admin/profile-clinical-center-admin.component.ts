import { Component, OnInit } from '@angular/core';
import { UserService } from './../service/user.service';
import { AuthService } from './../service/auth.service';
import { Router} from '@angular/router';
import { ClinicalCenterAdministrator } from './ClinicalCenterAdministrator';
import { ClinicalCenterAdminService } from '../service/clinical-center-admin.service';
import { ModalService } from '../_modal';
import { PasswordChanger } from '../shared/model/PasswordChanger';
import { PasswordWrongDialogComponent } from '../shared/dialogs/password-wrong-dialog/password-wrong-dialog.component';
import { EditPasswordDialogComponent } from '../shared/dialogs/edit-password-dialog/edit-password-dialog.component';
import { FirstLoginDialogComponent } from './../shared/dialogs/first-login-dialog/first-login-dialog.component';
import { EditInfoDialogComponent } from '../shared/dialogs/edit-info-dialog/edit-info-dialog.component';
import { UserEdit } from '../shared/model/UserEdit';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangedDialogComponent } from '../shared/dialogs/password-changed-dialog/password-changed-dialog.component';
import { RejectRequestDialogComponent } from './reject-request-dialog/reject-request-dialog.component';
import { RejectRequestObject } from './RejectRequestObject';
import { DiagnosisService } from '../service/diagnosis.service';
import { MedicationService } from '../service/medication.service';
import { NewMedicationDialogComponent } from './new-medication-dialog/new-medication-dialog.component';
import { CodebookItem } from './CodebookItem';
import { InfoDialogComponent } from '../shared/dialogs/info-dialog/info-dialog.component';
import { NewDiagnosisDialogComponent } from './new-diagnosis-dialog/new-diagnosis-dialog.component';
import { EditMedicationDialogComponent } from './edit-medication-dialog/edit-medication-dialog.component';
import { EditDiagnosisDialogComponent } from './edit-diagnosis-dialog/edit-diagnosis-dialog.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-profile-clinical-center-admin',
  templateUrl: './profile-clinical-center-admin.component.html',
  styleUrls: ['./profile-clinical-center-admin.component.css']
})
export class ProfileClinicalCenterAdminComponent implements OnInit {

  constructor(private _userService:UserService, 
    private _dialog: MatDialog,
    private _clinicalCenterAdminService: ClinicalCenterAdminService,
    private _authService:AuthService,
    private _router: Router,
    private _modalService: ModalService,
    private _diagnosisService: DiagnosisService,
    private _medicationService: MedicationService,
    private _notifier: NotifierService) {
      
     
    }

  private _rejectRequestObject: RejectRequestObject;
  private _currentAdmin: any;
  private _changedAdmin: any;
  private _passwordChanger: PasswordChanger;
  private _message: String;
  private userRequests: any[];

  private _medications: any[];
  private _diagnosis: any[];
  private _newDiagnosis: CodebookItem;
  private _newMedication: CodebookItem;
  private _currentDiagnosis: any;
  private _currentMedication: any;
  private _changedDiagnosis: any;
  private _changedMedication: any;

  numOfRequests: Number;
  showNewRequests: boolean=false; //prikaz tabele sa novim zahtevima
  showInformation: boolean = false;
  showMedicationCodebook: boolean = false;
  showDiagnosisCodebook: boolean = false;

  ngOnInit() {
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
    this._changedAdmin = JSON.parse(JSON.stringify(this._currentAdmin)); 
    this._passwordChanger = new PasswordChanger("","");
    this._rejectRequestObject= new RejectRequestObject("","","","");
    //this._newDiagnosis = new CodebookItem();
    //this._newMedication = new CodebookItem();
    this._clinicalCenterAdminService.getNewRequests().subscribe( users => {
      this.userRequests = users;
      this.numOfRequests = this.userRequests.length;
    })
    this._medicationService.getMedications().subscribe( medications => {
      this._medications = medications;
    })
    this._diagnosisService.getDiagnosis().subscribe( diagnosis => {
      this._diagnosis = diagnosis;
      console.log(this._diagnosis)
    })
    if(this._currentAdmin.passwordChanged == false){
      let ref1 = this._dialog.open(FirstLoginDialogComponent,{
          disableClose: true,
          width: '50%',
          data: this._passwordChanger
      });
    }
    console.log(JSON.parse(localStorage.getItem('currentUser')));
  }

  clickEditInformation(): void 
  {
    let dialogRef = this._dialog.open(EditInfoDialogComponent, {
      width: '50%',
      data: JSON.parse(JSON.stringify(this._currentAdmin))
    });
    dialogRef.afterClosed().subscribe(result => {
    // console.log('The dialog was closed');
     if(result != undefined){
     this._changedAdmin = result;
     if(this._currentAdmin.name != this._changedAdmin.name || this._currentAdmin.surname != this._changedAdmin.surname
       || this._currentAdmin.address != this._changedAdmin.address || this._currentAdmin.city != this._changedAdmin.city 
       || this._currentAdmin.country != this._changedAdmin.country || this._currentAdmin.phoneNumber != this._changedAdmin.phoneNumber){
           let userEdit = new UserEdit(this._changedAdmin.name, this._changedAdmin.surname,this._changedAdmin.address,
           this._changedAdmin.city, this._changedAdmin.country, this._changedAdmin.phoneNumber);
           this._currentAdmin = JSON.parse(JSON.stringify(this._changedAdmin));
           this._userService.editInfo(userEdit).subscribe(res => {
             localStorage.setItem('currentUser',JSON.stringify(this._changedAdmin)); //postavim da je taj izmenjeni sada trenutno ulogovan
          });
     }
   }
      this._notifier.notify("success","Information successfully changed");
        setTimeout(() => {
        this._notifier.hideAll();
        }, 2000)
      },
      error => {
        this._notifier.notify("error","Error changing information.");
        setTimeout(() => {
        this._notifier.hideAll();
       }, 2000)
   });
  }
  
  clickedProfile(): void {
    this.showInformation = !this.showInformation;
    this.showMedicationCodebook = false;
    this.showDiagnosisCodebook = false;
    this.showNewRequests = false;
  }

  clickedLogout(): void {
    this._authService.logout();
  }

  clickRegisterClCAdmin(): void 
  {
    this._router.navigate(['/registerClinicalCenterAdmin']);
  }

  clickRegisterClinicAdmin(): void 
  {
    this._router.navigate(['/registerClinicAdmin']);
  }

  clickRegisterClinic(): void 
  {
    this._router.navigate(['/registerClinic']);
  }

  clickMedicationCodebook(): void 
  {
    this.showMedicationCodebook = !this.showMedicationCodebook;
    this.showInformation = false;
    this.showDiagnosisCodebook = false;
    this.showNewRequests = false;
  }

  clickDiagnosisCodebook(): void
  {
    this.showDiagnosisCodebook = !this.showDiagnosisCodebook;
    this.showInformation = false;
    this.showMedicationCodebook = false;
    this.showNewRequests = false;
  }

  clickNewRequest() 
  {
    this.showNewRequests=!this.showNewRequests;
    this.showInformation = false;
    this.showDiagnosisCodebook = false;
    this.showMedicationCodebook = false;
  }

  clickAcceptRequest(id)
  {
    this._clinicalCenterAdminService.acceptRequest(id).subscribe(data=>{
      this._clinicalCenterAdminService.getNewRequests().subscribe( users => {
        this.userRequests = users;
        this.numOfRequests = this.userRequests.length
        if(this.numOfRequests==0)
        {
          this.showNewRequests=false;
        }
      })
      this._notifier.notify("success","Request successfully accepted");
        setTimeout(() => {
        this._notifier.hideAll();
        }, 2000)
      },
      error => {
        this._notifier.notify("error","Error accepting request.");
        setTimeout(() => {
        this._notifier.hideAll();
       }, 2000)
    })
    
  }

  clickRejectRequest(id,email,name,surname)
  {
    this._rejectRequestObject.email=email;
    this._rejectRequestObject.name=name;
    this._rejectRequestObject.surname=surname;
    let dialogRef = this._dialog.open(RejectRequestDialogComponent, {
      width: '50%',
      height: '60%',
      data: this._rejectRequestObject
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this._clinicalCenterAdminService.rejectRequest(id,this._rejectRequestObject.message).subscribe(data=>{
          this._clinicalCenterAdminService.getNewRequests().subscribe( users => {
            this.userRequests = users;
            this.numOfRequests = this.userRequests.length
            if(this.numOfRequests==0)
            {
              this.showNewRequests=false;
            }
          })
        },
        error => {
          alert("Something went wrong");
        }
        );
      }
   });
  }

  clickedChangePassword(){
    this._passwordChanger = new PasswordChanger("","");
    let dialogRef = this._dialog.open(EditPasswordDialogComponent, {
         width: '50%',
         data: this._passwordChanger
    });
    dialogRef.afterClosed().subscribe(result => {
       if(result != undefined){
        this._passwordChanger = result;
        this._authService.changePassoword(this._passwordChanger).subscribe(
          res => {
            let dialogRef1 = this._dialog.open(PasswordChangedDialogComponent, {
              width: '50%'
            });
    
            dialogRef1.afterClosed().subscribe(result => {
             this._authService.logout(); 
             this._router.navigate(['\login']);
           });
          },
           error => {
            let dialogRef2 = this._dialog.open(PasswordWrongDialogComponent, {
              width: '50%'
            }); 
           }
           );
        
       }
    });

  }

  clickEditMedication(medication)
  {
    this._currentMedication = new CodebookItem(medication.id, medication.code, medication.description);
    this._changedMedication =  new CodebookItem(medication.id, medication.code, medication.description);

    let dialogRef = this._dialog.open(EditMedicationDialogComponent, {
      width: '40%',
      height: '45%',
      data: this._changedMedication
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
      this._changedMedication = result;
      if( this._changedMedication.code != this._currentMedication.code || this._changedMedication.description != this._currentMedication.description){
            this._medicationService.editMedication(this._changedMedication).subscribe(res => {
              this._medicationService.getMedications().subscribe( medications => {
                this._medications = medications;
              })
              let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                width: '50%',
                data: "Medication successfully edited!"
              });

    },
    error => {
      let dialogRef1 = this._dialog.open(InfoDialogComponent, {
        width: '50%',
        data: "Something went wrong"
      });
    }
    );
    }
    }
    });
  }

  clickEditDiagnosis(diagnosis)
  {
    this._currentDiagnosis = new CodebookItem(diagnosis.id, diagnosis.code, diagnosis.description);
    this._changedDiagnosis = new CodebookItem(diagnosis.id, diagnosis.code, diagnosis.description);
    let dialogRef = this._dialog.open(EditDiagnosisDialogComponent, {
      width: '40%',
      height: '45%',
      data: this._changedDiagnosis
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
      this._changedDiagnosis = result;
      if( this._changedDiagnosis.code != this._currentDiagnosis.code || this._changedDiagnosis.description != this._currentDiagnosis.description){
            this._diagnosisService.editDiagnosis(this._changedDiagnosis).subscribe(res => {
              this._diagnosisService.getDiagnosis().subscribe( diagnosis => {
                this._diagnosis = diagnosis;
              })
              let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                width: '50%',
                data: "Diagnosis successfully edited!"
              });

    },
    error => {
      let dialogRef1 = this._dialog.open(InfoDialogComponent, {
        width: '50%',
        data: "Something went wrong"
      });
    });
    }
    }
    });
  }

  clickNewMedication()
  {
    this._newMedication = new CodebookItem(0,"", "");
    let dialogRef = this._dialog.open(NewMedicationDialogComponent, {
      width: '40%',
      height: '45%',
      data: this._newMedication
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result != undefined)
        {
          this._newMedication = result;
          this._medicationService.addNewMedication(this._newMedication).subscribe(
            res => {
              this._medicationService.getMedications().subscribe( medications => {
                this._medications = medications;
              })
              let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                width: '50%',
                data: "New medication successfully added!"
              });
            },
            error => {
              let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                width: '50%',
                data: "Something went wrong"
              });
            }
            );
        }
    });
  }
  
  clickNewDiagnosis()
  {
    this._newDiagnosis = new CodebookItem(0,"", "");
    let dialogRef = this._dialog.open(NewDiagnosisDialogComponent, {
      width: '40%',
      height: '45%',
      data: this._newDiagnosis
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result != undefined)
        {
          this._newMedication = result;
          this._diagnosisService.addNewDiagnosis(this._newDiagnosis).subscribe(
            res => {
              this._diagnosisService.getDiagnosis().subscribe( diagnosis => {
                this._diagnosis = diagnosis;
              })
              let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                width: '50%',
                data: "New diagnosis successfully added!"
              });
            },
            error => {
              let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                width: '50%',
                data: "Something went wrong.."
              });
            }
            );
        }
    });
  }

  clickBack()
  {
    this.showNewRequests = false;
    this.showInformation = false;
    this.showDiagnosisCodebook = false;
    this.showMedicationCodebook = false;
  }

}
