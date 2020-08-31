export class AvailableDoctorRequest {
    
    idExamType: Number;
    date: Number[];
    time: Number[];
    
    constructor(date:Number[],time:Number[],idExamType:Number){
        this.date = date;
        this.time = time;
        this.idExamType = idExamType;
    }
}