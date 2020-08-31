import { DoctorFA } from './DoctorFA';

export class ReserveDoctor{
    id: Number; //id termina sobe
    idRoom: Number;
    name: String;
    number: String;
    date: Number[]; 
    startTime: any[];
    endTime: any[];
    idSurgeryType: Number;
    doctors: DoctorFA[];
    constructor() { }

}