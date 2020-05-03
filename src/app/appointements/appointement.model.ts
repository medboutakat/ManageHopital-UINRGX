import { GeneratedId } from '../generatedId';

export class Appointement  extends GeneratedId{

    identityNo: string;
    assurance: string;
    callTimeStamp: string;
    reservationTimeStamp: string;
    subject: string;
    statusId: number;
    patienceId: number;
    assutanceId: number;
    hospitalId: string;
}