import { ReserveDoctor } from './ReserveDoctor';
import { DoctorFA } from './DoctorFA';
import { SurgeryRequest } from './SurgeryRequest';

export class SurgeryRequestForServer
{
    surgeryRequest: SurgeryRequest;
    reserveDoctor: ReserveDoctor;
    doctors: DoctorFA[];
    idClinic: Number;
}