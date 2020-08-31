import { FastAppointmentService } from './service/fastAppointment.service';
import { AbsenceService } from './service/absence.service';
import { MatBadgeModule } from '@angular/material/badge';
import { TypesService } from './service/types.service';
import { RoomService } from './service/room.service';
import { ClinicService } from './service/clinic.service';
import { ClinicAdminService } from './service/clinic-admin.service';
import { PatientService } from './service/patient.service';
import { UserService } from './service/user.service';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { ApiService } from './service/api.service';
import { ConfigService } from './service/config.service';
import { AuthService } from './service/auth.service';
import { ClinicalCenterAdminService } from './service/clinical-center-admin.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatSelectModule, MatIconModule, MatMenuModule } from '@angular/material' //Date picker
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HpDoctorComponent } from './hp-doctor/hp-doctor.component';
import { HpPatientComponent } from './hp-patient/hp-patient.component';
import { ProfileClinicalCenterAdminComponent } from './profile-clinical-center-admin/profile-clinical-center-admin.component';
import { RegisterClinicalCenterAdminComponent } from './profile-clinical-center-admin/register-clinical-center-admin.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { MedicalRecordComponent } from './hp-patient/medical-record/medical-record.component';
import { ProfileMedicalStaffComponent } from './profile-medical-staff/profile-medical-staff.component';
import { RegisterClinicAdminComponent } from './profile-clinical-center-admin/register-clinic-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClinicListComponent } from './hp-patient/clinic-list/clinic-list.component';
import { MatDialogModule } from '@angular/material/dialog'; //it has to be installed ng @angular/material
import { PasswordChangedDialogComponent } from './shared/dialogs/password-changed-dialog/password-changed-dialog.component';
import { ProfileClinicAdminComponent } from './profile-clinic-admin/profile-clinic-admin.component';
import { EditInfoDialogComponent } from './shared/dialogs/edit-info-dialog/edit-info-dialog.component';
import { EditPasswordDialogComponent } from './shared/dialogs/edit-password-dialog/edit-password-dialog.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { PasswordWrongDialogComponent } from './shared/dialogs/password-wrong-dialog/password-wrong-dialog.component';
import { FirstLoginDialogComponent } from './shared/dialogs/first-login-dialog/first-login-dialog.component';
import { EditClinicDialogComponent } from './profile-clinic-admin/edit-clinic-dialog/edit-clinic-dialog.component';
import { DoctorsListComponent } from './hp-patient/doctors-list/doctors-list.component';
import { MatSortModule, MatTableModule} from '@angular/material';
import { AppointmentsListComponent } from './hp-patient/appointments-list/appointments-list.component';
import { ExamRoomsComponent } from './profile-clinic-admin/exam-rooms/exam-rooms.component';
import { MatRadioModule } from '@angular/material/radio';
import { NewRoomDialogComponent } from './profile-clinic-admin/exam-rooms/new-room-dialog/new-room-dialog.component';
import { InfoDialogComponent } from './shared/dialogs/info-dialog/info-dialog.component'
import { HpNurseComponent } from './hp-nurse/hp-nurse.component';
import { RegisterClinicComponent } from './profile-clinical-center-admin/register-clinic.component';
import { RejectRequestDialogComponent } from './profile-clinical-center-admin/reject-request-dialog/reject-request-dialog.component';
import { UpdateRoomDialogComponent } from './profile-clinic-admin/exam-rooms/update-room-dialog/update-room-dialog.component';
import { ExamSurgeryTypesComponent } from './profile-clinic-admin/exam-surgery-types/exam-surgery-types.component';
import { NewTypeDialogComponent } from './profile-clinic-admin/exam-surgery-types/new-type-dialog/new-type-dialog.component';
import { UpdateTypeDialogComponent } from './profile-clinic-admin/exam-surgery-types/update-type-dialog/update-type-dialog.component';
import { DiagnosisService } from './service/diagnosis.service';
import { MedicationService } from './service/medication.service';
import { NewDiagnosisDialogComponent } from './profile-clinical-center-admin/new-diagnosis-dialog/new-diagnosis-dialog.component';
import { NewMedicationDialogComponent } from './profile-clinical-center-admin/new-medication-dialog/new-medication-dialog.component';
import { EditDiagnosisDialogComponent } from './profile-clinical-center-admin/edit-diagnosis-dialog/edit-diagnosis-dialog.component';
import { EditMedicationDialogComponent } from './profile-clinical-center-admin/edit-medication-dialog/edit-medication-dialog.component';
import { MedicationDialogComponent } from './shared/dialogs/medication-dialog/medication-dialog.component';
import { DiagnosisDialogComponent } from './shared/dialogs/diagnosis-dialog/diagnosis-dialog.component';
import { CalendarModule, DateAdapter } from 'angular-calendar'; //npm install --save angular-calendar date-fns
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { WorkCalendarComponent } from './work-calendar/work-calendar.component';
import { CalendarHeaderComponent } from './work-calendar/calendar-header.component';
import { DoctorsComponent } from './profile-clinic-admin/doctors/doctors.component';
import { DoctorService } from './service/doctor.service';
import { DetailsDoctorDialogComponent } from './profile-clinic-admin/doctors/details-doctor-dialog/details-doctor-dialog.component';
import { AbsenceRequestComponent } from './profile-clinic-admin/absence-request/absence-request.component';
import { RejectDialogComponent } from './profile-clinic-admin/absence-request/reject-dialog/reject-dialog.component';
import { MedicalexamsListComponent } from './hp-patient/medicalexams-list/medicalexams-list.component';
import { MedicalExamService }  from './service/medical-exam-service';
import { SurgeryService } from './service/surgery.service';
import { SurgeryListComponent } from './hp-patient/surgery-list/surgery-list.component';
import { PrescriptionService } from './service/prescription.service';
import { DoctorRateDialog } from './shared/dialogs/doctor-rate-dialog/doctor-rate-dialog.component';
import { ProfileClinicComponent } from './profile-clinic/profile-clinic.component';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { PatientProfileComponent } from './hp-doctor/patient-profile/patient-profile.component';
import { ChangeMedicalRecordDialogComponent } from './hp-doctor/patient-profile/change-medical-record-dialog/change-medical-record-dialog.component';
import { RatingModule } from 'ng-starrating';
import { NgSelectModule } from '@ng-select/ng-select';
import { FastAppointmentsComponent } from './profile-clinic-admin/fast-appointments/fast-appointments.component';
import { ClinicRateDialogComponent } from './shared/dialogs/clinic-rate-dialog/clinic-rate-dialog.component';
import { ChangeMedicalReportDialogComponent } from './hp-doctor/patient-profile/change-medical-report-dialog/change-medical-report-dialog.component';
import { MedicalReportService } from './service/medical-report-service';
import { AddDiagnosisDialogComponent } from './hp-doctor/patient-profile/add-diagnosis-dialog/add-diagnosis-dialog.component';
import { AddPrescriptionDialogComponent } from './hp-doctor/patient-profile/add-prescription-dialog/add-prescription-dialog.component';
import { CreateDiagnosisDialogComponent } from './hp-doctor/patient-profile/create-diagnosis-dialog/create-diagnosis-dialog.component';
import { TableFilterPipe } from './hp-doctor/table-filter';
import { BusinessReportComponent } from './profile-clinic-admin/business-report/business-report.component';
import { jqxChartModule }   from 'jqwidgets-ng/jqxchart';
import { ExamRoomRequestComponent } from './profile-clinic-admin/exam-room-request/exam-room-request.component';
import { RoomReservationComponent } from './profile-clinic-admin/room-reservation/room-reservation.component';
import { AcceptExamReservationComponent } from './profile-clinic-admin/accept-exam-reservation/accept-exam-reservation.component';
import { RejectExamReservationComponent } from './profile-clinic-admin/reject-exam-reservation/reject-exam-reservation.component';
import { NewAppointmentComponent } from './hp-doctor/patient-profile/new-appointment/new-appointment.component';
import { SurgeryAppointmentComponent } from './hp-doctor/patient-profile/surgery-appointment/surgery-appointment.component';
import { SurgeryRoomRequestComponent } from './profile-clinic-admin/surgery-room-request/surgery-room-request.component';
import { SurgeryRoomReservationComponent } from './profile-clinic-admin/surgery-room-reservation/surgery-room-reservation.component';
import { ReserveDoctorsDialogComponent } from './profile-clinic-admin/surgery-room-reservation/reserve-doctors-dialog/reserve-doctors-dialog.component';
import { WorkCalendarRoomComponent } from './work-calendar-room/work-calendar-room.component';
import { RegConfirmationComponent } from './sign-up/reg-confirmation/reg-confirmation.component';



const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 100,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HpDoctorComponent,
    HpPatientComponent,
    ProfileClinicalCenterAdminComponent,
    RegisterClinicalCenterAdminComponent,
    FormComponentComponent,
    MedicalRecordComponent,
    ProfileMedicalStaffComponent,
    RegisterClinicAdminComponent,
    ClinicListComponent,
    PasswordChangedDialogComponent,
    ProfileClinicAdminComponent,
    EditInfoDialogComponent,
    EditPasswordDialogComponent,
    PasswordWrongDialogComponent,
    FirstLoginDialogComponent,
    EditClinicDialogComponent,
    DoctorsListComponent,
    AppointmentsListComponent,  
    ExamRoomsComponent,
    NewRoomDialogComponent,
    InfoDialogComponent,
    HpNurseComponent,
    RegisterClinicComponent,
    RejectRequestDialogComponent,
    UpdateRoomDialogComponent,
    ExamSurgeryTypesComponent,
    NewTypeDialogComponent,
    UpdateTypeDialogComponent,
    NewDiagnosisDialogComponent,
    NewMedicationDialogComponent,
    EditDiagnosisDialogComponent,
    EditMedicationDialogComponent,
    MedicationDialogComponent,
    DiagnosisDialogComponent,
    WorkCalendarComponent,
    CalendarHeaderComponent,
    DoctorsComponent,
    DetailsDoctorDialogComponent,
    AbsenceRequestComponent,
    RejectDialogComponent,
    ProfileClinicComponent,
    MedicalexamsListComponent,
    SurgeryListComponent,
    PatientProfileComponent,
    ChangeMedicalRecordDialogComponent,
    DoctorRateDialog,
    ClinicRateDialogComponent,
    ChangeMedicalReportDialogComponent,
    AddDiagnosisDialogComponent,
    AddPrescriptionDialogComponent,
    CreateDiagnosisDialogComponent,
    FastAppointmentsComponent,
    ClinicRateDialogComponent,
    TableFilterPipe,
    BusinessReportComponent,
    NewAppointmentComponent,
    SurgeryAppointmentComponent,
    ExamRoomRequestComponent,
    RoomReservationComponent,
    AcceptExamReservationComponent,
    RejectExamReservationComponent,
    NewAppointmentComponent,
    SurgeryRoomRequestComponent,
    SurgeryRoomReservationComponent,
    ReserveDoctorsDialogComponent,
    WorkCalendarRoomComponent,
    RegConfirmationComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatRadioModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatBadgeModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    AngularYandexMapsModule.forRoot('8c25f85c-6bc9-4294-9e6d-10fed101991f'),
    NotifierModule.withConfig(customNotifierOptions),
    RatingModule,
    NgSelectModule,
    jqxChartModule
        
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    ApiService,
    ConfigService,
    UserService,
    ClinicalCenterAdminService,
    PatientService,
    ClinicService,
    ClinicAdminService,
    RoomService,
    TypesService,
    DiagnosisService,
    MedicationService,
    DoctorService,
    AbsenceService,
    MedicalExamService,
    SurgeryService,
    PrescriptionService,
    MedicalReportService,
    FastAppointmentService
  ],
  entryComponents: [ //this has to be added because of dialogs
    PasswordChangedDialogComponent,
    EditInfoDialogComponent,
    PasswordWrongDialogComponent,
    EditPasswordDialogComponent,
    FirstLoginDialogComponent,
    EditClinicDialogComponent,
    RejectRequestDialogComponent,
    NewRoomDialogComponent,
    InfoDialogComponent,
    UpdateRoomDialogComponent,
    NewTypeDialogComponent,
    UpdateTypeDialogComponent,
    NewDiagnosisDialogComponent,
    NewMedicationDialogComponent,
    EditDiagnosisDialogComponent,
    EditMedicationDialogComponent,
    MedicationDialogComponent,
    DiagnosisDialogComponent,
    DetailsDoctorDialogComponent,
    RejectDialogComponent,
    ChangeMedicalRecordDialogComponent,
    DoctorRateDialog,
    ClinicRateDialogComponent,
    ChangeMedicalReportDialogComponent,
    AddDiagnosisDialogComponent,
    AddPrescriptionDialogComponent,
    CreateDiagnosisDialogComponent,
    ReserveDoctorsDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


