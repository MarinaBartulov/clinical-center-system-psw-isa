import { MedicalExamRequest } from 'src/app/shared/model/MedicalExamRequest';
import { RoomME } from './RoomME';
export class MERoomRequest{

    examStart:MedicalExamRequest;
    examEnd:MedicalExamRequest;
    roomME: RoomME;

    constructor(examStart:MedicalExamRequest,examEnd:MedicalExamRequest,roomME:RoomME) {
        this.examStart = examStart;
        this.examEnd = examEnd;
        this.roomME = roomME;
     }
}