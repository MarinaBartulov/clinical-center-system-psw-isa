import { TypeReg } from 'src/app/shared/model/TypeReg';
export class Doctor{

    id: Number;
    name: String;
    surname: String;
    email: String;
    password: String;
    address: String;
    city: String;
    country: String;
    phoneNumber: String;
    serialNumber: String;
    workingHoursStart: Number[];
    workingHoursEnd: Number[];
    examTypesId: Number[]; //ovo za registraciju doktora
    surgeryTypesId: Number[];
    

    constructor(){}


}