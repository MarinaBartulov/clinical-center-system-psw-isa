import { Medication } from './Medication';
import { Patient } from './Patient';
import { Doctor } from './Doctor';

export class Prescription{
    id: Number;
    verified: boolean;
    medication: Medication;
    patient: Patient;
    doctor: Doctor;

    constructor() {}
}