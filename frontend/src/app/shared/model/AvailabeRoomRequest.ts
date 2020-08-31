export class AvailableRoomRequest {
    
    date: Number[];
    time: Number[];
    
    constructor(date:Number[], time:Number[]){
        this.date = date;
        this.time = time;
    }
}