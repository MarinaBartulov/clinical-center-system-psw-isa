import { DoctorFA } from './DoctorFA';

export class MedicalExamRequest {

    id: Number;
    date: Number[]; //ovo se uporedjuje da se vidi da li se promenio datum
    startTime: Number[]; //ovo se uporedjuje da se vidi da li se promenilo vreme
    fullNamePatient: String;
    //fullNameDoctor: String;
    doctor: DoctorFA;
    //idDoctor: Number; //ovo se uporedjuje da se vidi da li se promenio doktor
    examTypeName: String;
    idExamType: Number;
    constructor() { }
}