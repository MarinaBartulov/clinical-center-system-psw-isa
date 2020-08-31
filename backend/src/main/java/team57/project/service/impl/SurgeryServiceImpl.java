package team57.project.service.impl;

import org.hibernate.PessimisticLockException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import team57.project.dto.DoctorFA;
import team57.project.dto.RoomTerm;
import team57.project.dto.SurgeryRequest;
import team57.project.model.*;
import team57.project.repository.*;
import team57.project.service.*;

import javax.mail.MessagingException;
import javax.persistence.OptimisticLockException;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class SurgeryServiceImpl implements SurgeryService {
    @Autowired
    private SurgeryRepository surgeryRepository;
    @Autowired
    private TermRoomRepository termRoomRepository;
    @Autowired
    private TermDoctorRepository termDoctorRepository;
    @Autowired
    private EmailServiceImpl emailService;
    @Autowired
    private RoomService roomService;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private PatientService patientService;
    @Autowired
    private TermDoctorService termDoctorService;
    @Autowired
    private TermRoomService termRoomService;
    @Autowired
    private ClinicRepository clinicRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private SurgeryTypeServiceImpl surgeryTypeService;

    @Override
    public List<Surgery> findAll() {
        return this.surgeryRepository.findAll();
    }

    @Override
    public Surgery findOne(Long id) {
        return surgeryRepository.findById(id).orElse(null);
    }

    @Override
    public List<Surgery> findByPatientId(Long patientId) {
        return this.surgeryRepository.findPatientSurgery(patientId);
    }

    @Override
    public List<Surgery> findDoctorsSurgeries(Long doctorID){
        return this.surgeryRepository.findDoctorsSurgeries(doctorID,"APPROVED");
    }

    @Override
    public void save(Surgery s) {
        this.surgeryRepository.save(s);
    }

    @Override
    public double getNumSurgeryRequests(Clinic clinic) {

        return surgeryRepository.getNumSurgeryRequests(clinic.getId());
    }

    @Override
    public List<SurgeryRequest> findSurgeryRequests(Clinic clinic) {

        List<Surgery> surgeryRequests = surgeryRepository.findSurgeryRequests(clinic.getId());
        List<SurgeryRequest> surgeryDTO = new ArrayList<SurgeryRequest>();

        for(Surgery s : surgeryRequests){
            surgeryDTO.add(new SurgeryRequest(s));
        }

        return surgeryDTO;
    }

    @Override
    public List<RoomTerm> getAvailableRoomsTerms(Surgery s) {
        List<RoomTerm> availableRooms = new ArrayList<RoomTerm>();
        List<TermRoom> rooms = termRoomRepository.findAvailableRooms(s.getClinic().getId(),s.getDate());

        for(TermRoom room: rooms){
            RoomTerm dto = new RoomTerm(room);
            availableRooms.add(dto);
        }
        return availableRooms;

    }

    @Override
    @Transactional
    public void reserve(Surgery s, RoomTerm request) throws PessimisticLockException, OptimisticLockException{


        for(DoctorFA doc : request.getDoctors())
        {
            Doctor doctor = doctorService.findOne(doc.getId());
            //pessimistic lock
            TermDoctor td = termDoctorRepository.findTermDoctor(request.getDate(),request.getStartTime(),doctor.getId());
            td.setFree(false);
            doctor.getSurgeries().add(s);
            emailService.sendMailForSurgeryDoctor(request,doctor);
            doctorService.save(doctor);
            termDoctorService.save(td);

        }

        //pessimistic lock
        TermRoom tr = termRoomRepository.findTermRoom(request.getDate(),request.getStartTime(),request.getIdRoom());
        tr.setFree(false);
        termRoomService.save(tr);

        Room room = roomService.findOne(request.getIdRoom());
        s.setStartTime(request.getStartTime());
        s.setEndTime(request.getEndTime());
        s.setSurgeryRoom(room);
        s.setStatusS("APPROVED");

        surgeryRepository.save(s);
        Patient p = patientService.findOne(s.getPatient().getId());
        emailService.sendMailForSurgeryPatient(request,p);
    }

    @Override
    @Transactional
    public void rejectSurgery(Surgery s) throws MessagingException, InterruptedException {

        s.setStatusS("REJECTED");
        surgeryRepository.save(s);
        Patient p = patientService.findOne(s.getPatient().getId()); //because of lazy loading
        SurgeryType st = surgeryTypeService.findOne(s.getSurgeryType().getId()); // because of lazy loading
        emailService.sendRejectSurgery(s, p, st);
    }

    @Override
    @Scheduled(cron = "${rooms.cron}")
    public void systemReservingRooms() throws MessagingException, InterruptedException {

        List<Clinic> clinics = clinicRepository.findAll();
        for(Clinic clinic: clinics) {
            List<Surgery> surgeries = surgeryRepository.findSurgeryRequests(clinic.getId()); //find all the surgeries that don't have reserved room
            List<Room> rooms = roomRepository.findAllInClinicSurgery(clinic.getId(), "Surgery"); //find all the rooms in the clinic
            for (Surgery me : surgeries) {
                LocalDate tempDate = me.getDate();
                boolean foundRoom = false;
                while (!foundRoom) {
                    for (Room room : rooms) {
                        List<TermRoom> termsRooms = termRoomRepository.findFreeTermsJustDate(room.getId(), me.getDate()); //for every room take free terms and reserve the first one
                        termsRooms.sort(Comparator.comparing(TermRoom::getStartTime));
                        if (termsRooms.size() != 0) {
                            TermRoom tr = termsRooms.get(0); // take the first term
                            me.setSurgeryRoom(room);
                            me.setStatusS("APPROVED");
                            me.setDate(tr.getDateTerm());
                            me.setStartTime(tr.getStartTime());
                            me.setEndTime(tr.getEndTime());
                            surgeryRepository.save(me);
                            tr.setFree(false);
                            termRoomRepository.save(tr);
                            foundRoom = true;
                            emailService.sendPatientRoom(me);
                           /*for (Doctor d : me.getDoctors())
                            {
                                emailService.sendDoctorRoom(me,d);
                            }*/
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
