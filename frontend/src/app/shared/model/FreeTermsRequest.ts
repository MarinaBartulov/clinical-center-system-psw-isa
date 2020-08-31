export class FreeTermsRequest {

    roomName: String;
    roomNumber: String;
    idDoctor: Number;
    date: Number[];
   
    constructor(roomName:String,roomNumber:String,idDoctor:Number,date:Number[]) {
        this.roomName = roomName;
        this.roomNumber = roomNumber;
        this.idDoctor = idDoctor;
        this.date = date;
    }
}