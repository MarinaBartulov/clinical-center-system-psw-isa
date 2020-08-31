package team57.project.service;

import org.springframework.mail.MailException;
import org.springframework.scheduling.annotation.EnableAsync;
import team57.project.dto.MedicalExamRequest;
import team57.project.dto.RoomME;
import team57.project.dto.RoomTerm;
import team57.project.event.OnRegistrationSuccessEvent;
import team57.project.model.*;

import javax.mail.MessagingException;
import java.util.Set;

@EnableAsync
public interface EmailService {

    void sendNotificaitionAsync(User user, OnRegistrationSuccessEvent event) throws MailException, InterruptedException, MessagingException;
    void sendMessageAsync(String message,User user, OnRegistrationSuccessEvent event) throws MailException, InterruptedException, MessagingException;
    void sendMessageApproved(Absence absence) throws MailException, InterruptedException, MessagingException;
    void sendMessageReject(Absence absence, String message) throws MailException, InterruptedException, MessagingException;
    void sendFAReservation(Patient patient, FastAppointment fa) throws MailException, InterruptedException, MessagingException;
    void notificationAppointmentReq(Patient patient, Doctor doctor, MedicalExam medicalExam, Set<ClinicAdmin> admins) throws MailException, InterruptedException, MessagingException;
    void sendRejectExam(MedicalExam me) throws MailException, InterruptedException, MessagingException;
    void sendNotificationForReservation(MedicalExamRequest merNew, MedicalExamRequest merOld, RoomME roomME, String emailP) throws MessagingException;
    void sendPatientRoom(MedicalExam me) throws MailException, InterruptedException, MessagingException;
    void sendDoctorRoom(MedicalExam me) throws MailException, InterruptedException, MessagingException;
    void sendRejectSurgery(Surgery s, Patient p, SurgeryType st) throws MailException, InterruptedException, MessagingException;
    void sendMailForSurgeryPatient(RoomTerm r, Patient p);
    void sendMailForSurgeryDoctor(RoomTerm r, Doctor d);
    void sendPatientRoom(Surgery me) throws MailException, InterruptedException, MessagingException;
    void sendDoctorRoom(Surgery me, Doctor d) throws MailException, InterruptedException, MessagingException;


}
