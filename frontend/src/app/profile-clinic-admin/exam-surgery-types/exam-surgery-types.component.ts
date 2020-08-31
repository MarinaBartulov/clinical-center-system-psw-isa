import { NewTypeDialogComponent } from './new-type-dialog/new-type-dialog.component';
import { TypesService } from './../../service/types.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Type } from 'src/app/shared/model/Type';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { UpdateTypeDialogComponent } from './update-type-dialog/update-type-dialog.component';

@Component({
  selector: 'app-exam-surgery-types',
  templateUrl: './exam-surgery-types.component.html',
  styleUrls: ['./exam-surgery-types.component.css']
})
export class ExamSurgeryTypesComponent implements OnInit {

  constructor(private _typesService: TypesService, private _route: ActivatedRoute, private _router: Router, private _dialog: MatDialog) { }

  private _currentAdmin: any;
  private _clinicId: String;
  private typesOfTypes: String[] = ['Medical exam', 'Surgery'];
  private _chosenTypeOfTypes: String; // Medical exams or Surgeries
  private _foundTypes: Type[];
  private _newType: Type;
  private _changedType: Type;
  private _forChangeType: Type;
  private _types: Type[];
  private _searchName: String;
  private _searchType: String;
  private _showTable: boolean;
  private _showMsg: boolean;
  private _shownAll: boolean;
  private _shownSearch: boolean;


  ngOnInit() {
      this._route.paramMap.subscribe(params => { 
      this._clinicId = params.get('id'); 
      console.log(this._clinicId);
      this._newType = new Type();
      this._changedType = new Type();
      this._forChangeType = new Type();
      this._showTable = false;
      this._showMsg = false;
      this._shownAll = false;
      this._shownSearch = false;
    });
      this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
  }

  addNewExamType(){
       this._showTable = false;
       this._showMsg = false;
       this._chosenTypeOfTypes = "";
       this._newType = new Type;
       let dialogRef = this._dialog.open(NewTypeDialogComponent,{
        width: '50%',
        data: this._newType
       });
       dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          this._newType = result;
          this._typesService.addExamType(this._clinicId, this._newType).subscribe(
            res => {
              let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                width: '50%',
                data: "You have successfully added a new exam type."
              });
          },
          error => {
            let dialogRef1 = this._dialog.open(InfoDialogComponent, {
              width: '50%',
              data: error.error
            });
          }
          )
        }
      })
  }

  addNewSurgeryType(){
       this._showTable = false;
       this._showMsg = false;
       this._chosenTypeOfTypes = "";
       this._newType = new Type;
       let dialogRef = this._dialog.open(NewTypeDialogComponent,{
        width: '50%',
        data: this._newType
       });
       dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          this._newType = result;
          this._typesService.addSurgeryType(this._clinicId, this._newType).subscribe(
            res => {
              let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                width: '50%',
                data: "You have successfully added a new surgery type."
              });
          },
          error => {
            let dialogRef1 = this._dialog.open(InfoDialogComponent, {
              width: '50%',
              data: error.error
            });
          }
          )
        }
      })

  }

  

  resetForm(){

    this._showTable = false;
    this._showMsg = false;
    this._chosenTypeOfTypes = "";

  }

  showAllExamTypes(){
    this._chosenTypeOfTypes = "Medical exams";
    this._typesService.getExamTypes(this._clinicId).subscribe(
      types => {
        this._foundTypes = types;
        console.log(this._foundTypes);
        if(types.length != 0){
          this._showTable = true;
          this._showMsg = false;
          this._shownSearch = false;
          this._shownAll = true;
        }else{
          let dialogRef1 = this._dialog.open(InfoDialogComponent, {
            width: '50%',
            data: "This clinic doesn't have any exam types."
          });
        }
      },
      error => {
        alert(error.error);
        
      }
    )


  }

  showAllSurgeryTypes(){
    this._chosenTypeOfTypes = "Surgeries";
    this._typesService.getSurgeryTypes(this._clinicId).subscribe(
      types => {
        this._foundTypes = types;
        if(types.length != 0){
          this._showTable = true;
          this._showMsg = false;
          this._shownSearch = false;
          this._shownAll = true;
        }else{
          let dialogRef1 = this._dialog.open(InfoDialogComponent, {
            width: '50%',
            data: "This clinic doesn't have any surgery types."
          });
        }
      },
      error => {
        alert(error.error);
        
      }
    )

  }

  updateType(idType:number, type: string){
    if(type == "Medical exams"){
    this._typesService.getExamType(idType).subscribe(
      type => {
        this._changedType = type;
        this._forChangeType = JSON.parse(JSON.stringify(this._changedType)); //ostaje da se vidi jel se nesto promenilo
        

        let dialogRef = this._dialog.open(UpdateTypeDialogComponent, {
          width: '50%',
          data: this._changedType
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result != undefined){
             this._changedType = result;
             if(this._changedType.name != this._forChangeType.name || this._changedType.description != this._forChangeType.description
                || this._changedType.price != this._forChangeType.price || this._changedType.discount != this._forChangeType.discount){
                this._typesService.updateExamType(this._clinicId, this._changedType.id, this._changedType).subscribe(res => {
                  let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                    width: '50%',
                    data: "You have successfully updated the exam type."
                  });
                  if(this._shownAll)
                     this.showAllExamTypes();
                  if(this._shownSearch)
                     this.onClickedSearch();
                        
                },
                  error => {
                    let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                      width: '50%',
                      data: error.error
                    });
                  }
                  );
                } 
              }                     
        });
        });
      }else{
        this._typesService.getSurgeryType(idType).subscribe(
          type => {
            this._changedType = type;
            this._forChangeType = JSON.parse(JSON.stringify(this._changedType)); //ostaje da se vidi jel se nesto promenilo
            
    
            let dialogRef = this._dialog.open(UpdateTypeDialogComponent, {
              width: '50%',
              data: this._changedType
            });
    
            dialogRef.afterClosed().subscribe(result => {
              if(result != undefined){
                 this._changedType = result;
                 if(this._changedType.name != this._forChangeType.name || this._changedType.description != this._forChangeType.description
                    || this._changedType.price != this._forChangeType.price || this._changedType.discount != this._forChangeType.discount){
                    this._typesService.updateSurgeryType(this._clinicId, this._changedType.id, this._changedType).subscribe(res => {
                      let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                        width: '50%',
                        data: "You have successfully updated the surgery type."
                      });
                      if(this._shownAll)
                         this.showAllSurgeryTypes();
                      if(this._shownSearch)
                         this.onClickedSearch();
                            
                    },
                      error => {
                        let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                          width: '50%',
                          data: error.error
                        });
                      }
                      );
                    } 
                  }                     
            });
            });

      }
  }

  removeType(idType:number, type: string){
    if(type == "Medical exams"){
      this._typesService.removeExamType(this._clinicId,idType).subscribe(
        res => {
          let dialogRef1 = this._dialog.open(InfoDialogComponent, {
            width: '50%',
            data: "You have successfully removed the exam type."
          });
          if(this._shownAll)
            this.showAllExamTypes();
          if(this._shownSearch)
            this.onClickedSearch();

        },
        error => {
          let dialogRef1 = this._dialog.open(InfoDialogComponent, {
            width: '50%',
            data: error.error
          });
          
        }
      );
  }else{
    this._typesService.removeSurgeryType(this._clinicId,idType).subscribe(
      res => {
        let dialogRef1 = this._dialog.open(InfoDialogComponent, {
          width: '50%',
          data: "You have successfully removed the surgery type."
        });
        if(this._shownAll)
          this.showAllSurgeryTypes();
        if(this._shownSearch)
          this.onClickedSearch();

      },
      error => {
        let dialogRef1 = this._dialog.open(InfoDialogComponent, {
          width: '50%',
          data: error.error
        });
        
      }
    );
  }
}

  clickedBack(){
    this._router.navigate(["/clinicAdminProfile"]);
}

onClickedSearch(){
     this._foundTypes = [];
     if(this._searchType == this.typesOfTypes[0]){
        this._chosenTypeOfTypes = "Medical exams";
        this._typesService.getExamTypes(this._clinicId).subscribe(
          examTypes => {
              this._types = examTypes;
              for(let examType of this._types){
                  if(examType.name.toLowerCase().includes(this._searchName.toLowerCase())){
                     this._foundTypes.push(examType);
              }
          } 
         
        if(this._foundTypes.length != 0){
             this._showTable = true;
             this._showMsg = false;
             this._shownSearch = true;
             this._shownAll = false;            
             
        }else{
             this._showTable = false;
             this._showMsg = true;
             
        }
      });
      }else{
          this._chosenTypeOfTypes = "Surgeries";
          this._typesService.getSurgeryTypes(this._clinicId).subscribe(
          surgeryTypes => {
             this._types = surgeryTypes;
             for(let surgeryType of this._types){       
             if(surgeryType.name.toLowerCase().includes(this._searchName.toLowerCase())){
              this._foundTypes.push(surgeryType);
            }        
         }
       
         if(this._foundTypes.length != 0){
            this._showTable = true;
            this._showMsg = false;
            this._shownSearch = true;
            this._shownAll = false;            
           
          }else{
              this._showTable = false;
              this._showMsg = true;
              
          }
});
}
}

}
