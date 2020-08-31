import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HpPatientComponent } from './hp-patient/hp-patient.component';
import { HpDoctorComponent } from './hp-doctor/hp-doctor.component';
import { HpNurseComponent } from './hp-nurse/hp-nurse.component';
import { ProfileClinicalCenterAdminComponent } from './profile-clinical-center-admin/profile-clinical-center-admin.component';
import { RegisterClinicalCenterAdminComponent } from './profile-clinical-center-admin/register-clinical-center-admin.component';
import { RegisterClinicAdminComponent } from './profile-clinical-center-admin/register-clinic-admin.component';
import { RegisterClinicComponent } from './profile-clinical-center-admin/register-clinic.component';
import { ProfileMedicalStaffComponent } from './profile-medical-staff/profile-medical-staff.component';
import { ProfileClinicAdminComponent } from './profile-clinic-admin/profile-clinic-admin.component';
import { ExamRoomsComponent } from './profile-clinic-admin/exam-rooms/exam-rooms.component';
import { ExamSurgeryTypesComponent } from './profile-clinic-admin/exam-surgery-types/exam-surgery-types.component';
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';
import { DoctorsComponent } from './profile-clinic-admin/doctors/doctors.component';
import { AbsenceRequestComponent } from './profile-clinic-admin/absence-request/absence-request.component';
import { ProfileClinicComponent } from './profile-clinic/profile-clinic.component';
import { PatientProfileComponent } from './hp-doctor/patient-profile/patient-profile.component';
import { FastAppointmentsComponent } from './profile-clinic-admin/fast-appointments/fast-appointments.component';
import { BusinessReportComponent } from './profile-clinic-admin/business-report/business-report.component';
import { ExamRoomRequestComponent } from './profile-clinic-admin/exam-room-request/exam-room-request.component';
import { SurgeryRoomRequestComponent } from './profile-clinic-admin/surgery-room-request/surgery-room-request.component';
import { RoomReservationComponent } from './profile-clinic-admin/room-reservation/room-reservation.component';
import { SurgeryRoomReservationComponent } from './profile-clinic-admin/surgery-room-reservation/surgery-room-reservation.component';
import { AcceptExamReservationComponent } from './profile-clinic-admin/accept-exam-reservation/accept-exam-reservation.component';
import { RejectExamReservationComponent } from './profile-clinic-admin/reject-exam-reservation/reject-exam-reservation.component';
import { WorkCalendarRoomComponent } from './work-calendar-room/work-calendar-room.component';
import { RegConfirmationComponent } from './sign-up/reg-confirmation/reg-confirmation.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'patientHP', component: HpPatientComponent },
      { path: 'doctorHP', component: HpDoctorComponent},
      { path: 'nurseHP', component: HpNurseComponent},
      { path: 'clinicalCenterAdminProfile', component: ProfileClinicalCenterAdminComponent },
      { path: 'registerClinicalCenterAdmin', component: RegisterClinicalCenterAdminComponent },
      { path: 'registerClinicAdmin', component: RegisterClinicAdminComponent },
      { path: 'registerClinic', component: RegisterClinicComponent },
      { path: 'medicalStaffProfile', component: ProfileMedicalStaffComponent },
      { path: 'patientHP/:id', component: HpPatientComponent },
      { path: 'clinicAdminProfile', component: ProfileClinicAdminComponent },
      { path: 'examRooms/:id', component: ExamRoomsComponent },
      { path: 'examSurgeryTypes/:id', component: ExamSurgeryTypesComponent},
      { path: 'workCalendar', component: WorkCalendarComponent},
      { path: 'doctorsInClinic/:id', component: DoctorsComponent},
      { path: 'absenceRequests/:id', component: AbsenceRequestComponent},
      { path: 'clinicProfile/:id', component: ProfileClinicComponent},
      { path: 'patientProfile/:id', component: PatientProfileComponent},
      { path: 'fastAppointments/:id', component: FastAppointmentsComponent},  
      { path: 'businessReport/:id', component: BusinessReportComponent},
      { path: 'examRoomRequests/:id', component: ExamRoomRequestComponent},
      { path: 'surgeryRoomRequests/:id', component: SurgeryRoomRequestComponent},
      { path: 'searchRoomForExam/:idExam/:idClinic', component: RoomReservationComponent},
      { path: 'searchRoomForSurgery/:idSurgery/:idClinic', component: SurgeryRoomReservationComponent},
      { path: 'acceptReservation/:id', component: AcceptExamReservationComponent},
      { path: 'rejectReservation/:id', component: RejectExamReservationComponent},
      { path: 'workCalendarRoom/:idRoom/:idExam/:idClinic', component: WorkCalendarRoomComponent},
      { path: 'confirmationRegistration/:token', component: RegConfirmationComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' }
      //{path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
