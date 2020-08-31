package team57.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import team57.project.dto.MERoomRequest;
import team57.project.dto.MedicalExamRequest;
import team57.project.dto.RoomME;
import team57.project.model.*;
import team57.project.repository.*;
import team57.project.service.MedicalExamService;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
@Service
public class MedicalExamServiceImpl implements MedicalExamService {
    @Autowired
    private MedicalExamRepository medicalExamRepository;
    @Autowired
    private ClinicRepository clinicRepository;
    @Autowired
    private TermRoomRepository termRoomRepository;
    @Autowired
    private TermDoctorRepository termDoctorRepository;
    @Autowired
    private RoomServiceImpl roomService;
    @Autowired
    private EmailServiceImpl emailService;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private DoctorServiceImpl doctorService;

    @Override
    public List<MedicalExam> findAll() {
        return this.medicalExamRepository.findAll();
    }

    @Override
    public void save(MedicalExam m){
         this.medicalExamRepository.save(m);
    }


    @Override
    public List<MedicalExam> findByPatientId(Long patientId) {
        return this.medicalExamRepository.findMedicalExamByPatient(patientId);
    }

    @Override
    public List<MedicalExam> findDoctorsExams(Long doctorId)
    {
        return this.medicalExamRepository.findDoctorsExams(doctorId);
    }

    @Override
    public List<MedicalExam> findDoctorPatientExams(Long doctorId,Long patientId)
    {
        return this.medicalExamRepository.findDoctorPatientExams(doctorId,patientId);
    }


    @Override
    public double getNumExamRequests(Clinic clinic) {

        return medicalExamRepository.getNumExamRequests(clinic.getId());
    }

    @Override
    public List<MedicalExamRequest> findExamRequests(Clinic clinic) {

        List<MedicalExam> examRequests = medicalExamRepository.findExamRequests(clinic.getId());
        List<MedicalExamRequest> examRequestsDTO = new ArrayList<MedicalExamRequest>();

        for(MedicalExam me : examRequests){
            examRequestsDTO.add(new MedicalExamRequest(me));
        }

        return examRequestsDTO;
    }

    @Override
    public MedicalExam findOne(Long id) {
        return medicalExamRepository.findById(id).orElse(null);
    }

    @Override
    public List<RoomME> getAvailableRooms(MedicalExam me) {
        List<RoomME> availableRooms = new ArrayList<RoomME>();
        List<Room> rooms = medicalExamRepository.findAvailableRooms(me.getClinic().getId(),me.getDate(),me.getStartTime(),me.getEndTime());

        for(Room room: rooms){
            availableRooms.add(new RoomME(room,me));
        }

        return availableRooms;

    }

    @Override
    @Transactional
    public String reserveRoom(MERoomRequest meRoomRequest) throws MessagingException {
        //data about the date and doctor change is stored in meRoomRequest.getExamEnd
        //data about the term change is stored in meRoomRequest.getRoomME

        //lock this term so that nobody else can reserve it
        TermRoom tr = termRoomRepository.findTermRoom(meRoomRequest.getRoomME().getDate(),meRoomRequest.getRoomME().getStartTime(),meRoomRequest.getRoomME().getId());
        if(!tr.isFree()){ //check if someone has reserved this term in the meantime
            return "Room's term is not free.";
        }
        tr.setFree(false);
        termRoomRepository.save(tr);
        //if doctor remained the same but date or time has changed, then make the old doctor's term free and reserve a new one
        if(meRoomRequest.getExamStart().getDoctor().getId() == meRoomRequest.getExamEnd().getDoctor().getId()){
            if(!meRoomRequest.getExamStart().getDate().equals(meRoomRequest.getExamEnd().getDate())||
                    !meRoomRequest.getExamStart().getStartTime().equals(meRoomRequest.getRoomME().getStartTime())){
                TermDoctor tdOld = termDoctorRepository.findTermDoctor(meRoomRequest.getExamStart().getDate(),meRoomRequest.getExamStart().getStartTime(),meRoomRequest.getExamStart().getDoctor().getId());
                TermDoctor tdNew = termDoctorRepository.findTermDoctor(meRoomRequest.getExamEnd().getDate(),meRoomRequest.getRoomME().getStartTime(),meRoomRequest.getExamEnd().getDoctor().getId());
                if(!tdNew.isFree()){
                    return "Doctor's term is not free.";
                }
                tdOld.setFree(true);
                tdNew.setFree(false);
                termDoctorRepository.save(tdOld);
                termDoctorRepository.save(tdNew);
            }
        }
        //if only doctors have changed, but date and time remained the same then I make the first doctor's term free, and for the second one I reserve a new term, and set that doctor for the exam
        if(meRoomRequest.getExamStart().getDate().equals(meRoomRequest.getExamEnd().getDate())||
                meRoomRequest.getExamStart().getStartTime().equals(meRoomRequest.getRoomME().getStartTime())){
            if(meRoomRequest.getExamStart().getDoctor().getId() != meRoomRequest.getExamEnd().getDoctor().getId()) {
                TermDoctor tdOld = termDoctorRepository.findTermDoctor(meRoomRequest.getExamStart().getDate(), meRoomRequest.getExamStart().getStartTime(), meRoomRequest.getExamStart().getDoctor().getId());
                TermDoctor tdNew = termDoctorRepository.findTermDoctor(meRoomRequest.getExamStart().getDate(), meRoomRequest.getExamStart().getStartTime(), meRoomRequest.getExamEnd().getDoctor().getId());
                if(!tdNew.isFree()){
                    return "Doctor's term is not free.";
                }
                tdOld.setFree(true);
                tdNew.setFree(false);
                termDoctorRepository.save(tdOld);
                termDoctorRepository.save(tdNew);

            }
        }
        //if doctor, date and time have changed
        if(meRoomRequest.getExamStart().getDoctor().getId() != meRoomRequest.getExamEnd().getDoctor().getId()){
           if(!meRoomRequest.getExamStart().getDate().equals(meRoomRequest.getExamEnd().getDate()) ||
                   !meRoomRequest.getExamStart().getStartTime().equals(meRoomRequest.getRoomME().getStartTime())){
               TermDoctor tdOld = termDoctorRepository.findTermDoctor(meRoomRequest.getExamStart().getDate(), meRoomRequest.getExamStart().getStartTime(), meRoomRequest.getExamStart().getDoctor().getId());
               TermDoctor tdNew = termDoctorRepository.findTermDoctor(meRoomRequest.getExamEnd().getDate(), meRoomRequest.getRoomME().getStartTime(), meRoomRequest.getExamEnd().getDoctor().getId());
               if(!tdNew.isFree()){
                   return "Doctor's term is not free.";
               }
               tdOld.setFree(true);
               tdNew.setFree(false);
               termDoctorRepository.save(tdOld);
               termDoctorRepository.save(tdNew);

            }
        }

        Room room = roomService.findOne(meRoomRequest.getRoomME().getId());
        MedicalExam me = (MedicalExam) medicalExamRepository.findById(meRoomRequest.getExamStart().getId()).orElse(null);
        me.setExamRoom(room);
        me.setStatusME("APPROVED");
        me.setDate(meRoomRequest.getExamEnd().getDate());
        me.setStartTime(meRoomRequest.getRoomME().getStartTime());
        me.setEndTime(meRoomRequest.getRoomME().getEndTime());
        Doctor d = doctorService.findOne(meRoomRequest.getExamEnd().getDoctor().getId());
        me.setDoctor(d);
        medicalExamRepository.save(me); //medical exam has optimistic lock and if someone in the meantime has reserved some
        // other room for the exam, this will throw an exception

        emailService.sendNotificationForReservation(meRoomRequest.getExamEnd(),meRoomRequest.getExamStart(),meRoomRequest.getRoomME(),me.getPatient().getEmail());
        return null;
    }

    @Override
    @Transactional
    public void rejectExam(MedicalExam me) throws MessagingException, InterruptedException {

        Doctor d = me.getDoctor(); // make this doctor's term free; the room hasn't been reserved
        LocalDate date = me.getDate();
        LocalTime startTime = me.getStartTime();
        TermDoctor td = termDoctorRepository.findTermDoctor(date,startTime,d.getId());
        td.setFree(true);
        termDoctorRepository.save(td);
        me.setStatusME("REJECTED");
        medicalExamRepository.save(me);
        emailService.sendRejectExam(me);

    }

    @Override
    @Transactional
    public void acceptExamPatient(MedicalExam me) {
        me.setStatusME("ACCEPTED");
        medicalExamRepository.save(me);
    }

    @Override
    @Transactional
    public void rejectExamPatient(MedicalExam me) {
        Doctor d = me.getDoctor(); // make this doctor's term free; the room hasn't been reserved
        LocalDate date = me.getDate();
        LocalTime startTime = me.getStartTime();
        TermDoctor td = termDoctorRepository.findTermDoctor(date,startTime,d.getId());
        td.setFree(true);
        termDoctorRepository.save(td);
        me.setStatusME("REJECTED");
        medicalExamRepository.save(me);
    }

    @Override
    @Scheduled(cron = "${rooms.cron}")
    public void systemReservingRooms() throws MessagingException, InterruptedException {

            List<Clinic> clinics = clinicRepository.findAll();
            for(Clinic clinic: clinics) {
                List<MedicalExam> medicalExams = medicalExamRepository.findExamRequests(clinic.getId()); //find all the exams which don't have a reserved room
                List<Room> rooms = roomRepository.findAllInClinic(clinic.getId()); //find all the rooms in the clinic
                for (MedicalExam me : medicalExams) {
                    LocalDate tempDate = me.getDate();
                    boolean foundRoom = false;
                    while (!foundRoom) {
                        for (Room room : rooms) {
                            List<TermRoom> termsRooms = termRoomRepository.findFreeTermsJustDate(room.getId(), me.getDate()); //for every room find free terms and choose the first one
                            termsRooms.sort(Comparator.comparing(TermRoom::getStartTime));
                            if (termsRooms.size() != 0) {
                                TermRoom tr = termsRooms.get(0); // take the first term
                                me.setExamRoom(room);
                                me.setStatusME("APPROVED");
                                me.setDate(tr.getDateTerm());
                                me.setStartTime(tr.getStartTime());
                                me.setEndTime(tr.getEndTime());
                                medicalExamRepository.save(me);
                                tr.setFree(false);
                                termRoomRepository.save(tr);
                                foundRoom = true;
                                emailService.sendPatientRoom(me);
                                emailService.sendDoctorRoom(me);
                                break;
                            }
                        }
                        if (!foundRoom) {
                            tempDate = tempDate.plusDays(1);
                        }
                    }
                }
            }
    }

}
