export class FARequest {

    date: Number[];
    time: Number[];
    idExamType: Number;
    idDoctor: Number;
    idRoom: Number;
    constructor(date:Number[],time:Number[],idExamType:Number,idDoctor:Number,idRoom:Number) {
        this.date = date;
        this.time = time;
        this.idExamType = idExamType;
        this.idDoctor = idDoctor;
        this.idRoom = idRoom;
     }
}