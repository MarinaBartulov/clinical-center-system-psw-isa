import { RoomService } from './../../service/room.service';
import { MatDialog } from '@angular/material/dialog';
import { ClinicService } from 'src/app/service/clinic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/shared/model/Room';
import { NewRoomDialogComponent } from './new-room-dialog/new-room-dialog.component';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { UpdateRoomDialogComponent } from './update-room-dialog/update-room-dialog.component';


@Component({
  selector: 'app-exam-rooms',
  templateUrl: './exam-rooms.component.html',
  styleUrls: ['./exam-rooms.component.css']
})
export class ExamRoomsComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _clinicService: ClinicService, private _router: Router, private _dialog: MatDialog, private _roomService: RoomService) { }

  private _currentAdmin: any;
  private _clinicId: String;
  private _rooms: Room[];
  private _searchRoom: Room;
  private _newRoom: Room;
  private _forChangeRoom: Room;
  private _changedRoom: Room;
  private types: String[] = ['Medical exam', 'Surgery'];
  private _foundRooms: Room[];
  private _showTable: boolean;
  private _showMsg: boolean;
  private _shownAll: boolean;
  private _shownSearch: boolean;


  ngOnInit() {
    this._route.paramMap.subscribe(params => { 
    this._clinicId = params.get('id'); 
    console.log(this._clinicId);
    this._searchRoom = new Room();
    this._newRoom = new Room();
    this._forChangeRoom = new Room();
    this._changedRoom = new Room();
    this._showTable = false;
    this._showMsg = false;
    this._shownAll = false;
    this._shownSearch = false;
  });
    this._currentAdmin = JSON.parse(localStorage.getItem('currentUser'));
  }
   
  clickedBack(){
      this._router.navigate(["/clinicAdminProfile"]);
  }

  onClickedSearch(){
      this._foundRooms = [];
      this._clinicService.getRooms(this._clinicId).subscribe(
        rooms => {
            this._rooms = rooms;
            console.log(this._rooms);
            for(let room of this._rooms){
              let enteredName = false;
              let enteredNumber = false;
              let enteredType = false;
              if(this._searchRoom.name != null && this._searchRoom.name != "" && this._searchRoom.name != undefined){
                  enteredName = true;
              } 
              if(this._searchRoom.number != null && this._searchRoom.number != "" && this._searchRoom.number != undefined){
                  enteredNumber = true;
              } 
              if(this._searchRoom.roomType != null && this._searchRoom.roomType != "" && this._searchRoom.roomType != undefined){
                   enteredType = true;
              } 
              if(enteredName){
                if(!room.name.toLowerCase().includes(this._searchRoom.name.toLowerCase())){
                  continue;
                }
              }
              if(enteredNumber){
                 if(!room.number.includes(this._searchRoom.number)){
                   continue;
                 }
                }
              if(enteredType){
                if(room.roomType != this._searchRoom.roomType){
                  continue;
                }
              }
             
                if(enteredName == false && enteredNumber == false && enteredType == false){
                  continue;
                }else{
                 this._foundRooms.push(room);
                }
                       
              }
             
            if(this._foundRooms.length != 0){
                 console.log("Pronasao sobu");
                 this._showTable = true;
                 this._showMsg = false;
                 this._shownSearch = true;
                 this._shownAll = false;
                 console.log(this._searchRoom.roomType);
                
                 
            }else{
                 console.log("Nije pronasao sobu");
                 this._showTable = false;
                 this._showMsg = true;
                 
            }
      });
    }  

     addNewRoom(){
      this._showTable = false;
      this._showMsg = false;
      this._newRoom = new Room();
      let dialogRef = this._dialog.open(NewRoomDialogComponent, {
        width: '50%',
        data: this._newRoom
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
        this._newRoom = result;
        this._clinicService.addNewRoom(this._clinicId, this._newRoom).subscribe(
          res => {
            let dialogRef1 = this._dialog.open(InfoDialogComponent, {
              width: '50%',
              data: "You have successfully added a new room."
            });
          },
            error => {
              let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                width: '50%',
                data: error.error
              });
            }
            );
        
        }
    });
      }

    showAllRooms(){
        this._clinicService.getRooms(this._clinicId).subscribe(
          rooms => {
            if(rooms.length != 0){
              this._foundRooms = rooms;
              this._showTable = true;
              this._showMsg = false;
              this._shownSearch = false;
              this._shownAll = true;
            }else{
              let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                width: '50%',
                data: "This clinic doesn't have any rooms."
              });
            }
          });
        }
    
    updateRoom(idRoom:number){
      this._roomService.getRoom(idRoom).subscribe(
        room => {
          this._changedRoom = room;
          this._forChangeRoom = JSON.parse(JSON.stringify(this._changedRoom)); //ostaje da se vidi jel se nesto promenilo
          

          let dialogRef = this._dialog.open(UpdateRoomDialogComponent, {
            width: '50%',
            data: this._changedRoom
          });

          dialogRef.afterClosed().subscribe(result => {
            if(result != undefined){
               this._changedRoom = result;
               if(this._changedRoom.name != this._forChangeRoom.name || this._changedRoom.number != this._forChangeRoom.number
                  || this._changedRoom.roomType != this._forChangeRoom.roomType){
                  this._clinicService.updateRoom(this._clinicId, this._changedRoom).subscribe(res => {
                    let dialogRef1 = this._dialog.open(InfoDialogComponent, {
                      width: '50%',
                      data: "You have successfully updated the room."
                    });
                    if(this._shownAll)
                       this.showAllRooms();
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

      removeRoom(idRoom:number){
        this._roomService.removeRoom(idRoom).subscribe(
          res => {
            let dialogRef1 = this._dialog.open(InfoDialogComponent, {
              width: '50%',
              data: "You have successfully removed the room."
            });
            if(this._shownAll)
              this.showAllRooms();
            if(this._shownSearch)
              this.onClickedSearch();

          },
          error => {
            let dialogRef1 = this._dialog.open(InfoDialogComponent, {
              width: '50%',
              data: error.error
            });
            
          }
        );}

        resetForm(){

          this._showTable = false;
          this._showMsg = false;
        }
    
      

}
