package team57.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import team57.project.dto.*;
import team57.project.model.*;
import team57.project.repository.DoctorRepository;
import team57.project.repository.PatientRepository;
import team57.project.repository.TermDoctorRepository;
import team57.project.service.DoctorService;
import team57.project.service.SurgeryService;

import javax.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthorityServiceImpl authService;
    @Autowired
    private TermDoctorRepository termDoctorRepository;
    @Autowired
    private SurgeryTypeServiceImpl surgeryTypeService;
    @Autowired
    private SurgeryServiceImpl surgeryService;

    @Override
    public Doctor findOne(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    @Override
    public Doctor findByEmail(String email) {
        return doctorRepository.findByEmail(email);
    }


    @Override
    public String doctorExists(String email, String serialNumber) {
        String msg = "";
        boolean exists = false;
        Doctor doctor = doctorRepository.findByEmail(email);
        if(doctor != null){
            msg += "Doctor with that email already exists in the clinic. ";
            exists = true;
        }
        Doctor doctor1 = doctorRepository.findBySerialNumber(serialNumber);
        if(doctor1 != null){
            msg += "Doctor with that serial number already exists in the clinic.";
            exists = true;
        }

        if(exists){
            return msg;
        }
        return null;
    }

    @Override
    public void addDoctor(DoctorDTO doctorDTO, Clinic clinic) {

        Doctor doctor = new Doctor(doctorDTO.getName(),doctorDTO.getSurname(),doctorDTO.getEmail(),passwordEncoder.encode(doctorDTO.getPassword()),
                doctorDTO.getAddress(), doctorDTO.getCity(), doctorDTO.getCountry(), doctorDTO.getPhoneNumber(), doctorDTO.getSerialNumber(),
                doctorDTO.getWorkingHoursStart(), doctorDTO.getWorkingHoursEnd());
        doctor.setClinic(clinic);
        for (Long id : doctorDTO.getExamTypesId()) {
            for (ExamType et : clinic.getExamTypes()) {
                if (et.getId() == id) {
                    doctor.getExamTypes().add(et);
                }
            }
        }
        for (Long id : doctorDTO.getSurgeryTypesId()) {
            for (SurgeryType st : clinic.getSurgeryTypes()) {
                if (st.getId() == id) {
                    doctor.getSurgeryTypes().add(st);
                }
            }
        }
        List<Authority> auth = authService.findByname("ROLE_DOCTOR");
        doctor.setAuthorities(auth);
        doctor.setEnabled(true);
        doctorRepository.save(doctor);

        Doctor d = doctorRepository.findByEmail(doctorDTO.getEmail());
        LocalDate nowDate = LocalDate.now();
        int today = nowDate.getDayOfWeek().getValue();
        LocalDate temp = LocalDate.now();
        temp = temp.plusDays(1); //free terms are created from tomorrow until the end of the next week
        for(int i=0;i<12-today;i++){
            int n = temp.getDayOfWeek().getValue();
            if(n == 6 || n == 7){ //if it's a weekend there are no terms
                System.out.println("It's a weekend. Terms are not being created.");
            }else{
                LocalTime wokingHoursStart = d.getWorkingHoursStart();
                while(wokingHoursStart.isBefore(d.getWorkingHoursEnd())){
                    TermDoctor term = new TermDoctor(temp,wokingHoursStart,wokingHoursStart.plusHours(1),true,d);
                    termDoctorRepository.save(term);
                    wokingHoursStart = wokingHoursStart.plusHours(1);
                }
            }
            temp = temp.plusDays(1);
        }
    }


    @Override
    public boolean removeDoctor(Doctor doctor) {

        List<TermDoctor> scheduledTerms = doctorRepository.findScheduledTerms(doctor.getId(),LocalDate.now(),LocalTime.now());

        if(scheduledTerms.size()!=0){
            return false;
        }

        doctor.setRemoved(true);
        doctorRepository.save(doctor);
        return true;
    }

    @Override
    public List<DoctorSearch> searchForDoctors(DoctorSearch doctorSearch, Long clinicId) {

        List<DoctorSearch> doctorsFound = new ArrayList<DoctorSearch>();
        List<Doctor> doctors = doctorRepository.findDoctors(clinicId);
        for(Doctor doctor : doctors){
            if(doctor.isRemoved())
                continue;
            boolean nameCorrect = true;
            boolean surnameCorrect = true;
            boolean serialNumberCorrect = true;
            if(!doctorSearch.getName().equals("") && doctorSearch.getName() != null){
                if(doctor.getName().toLowerCase().contains(doctorSearch.getName().toLowerCase())){
                    nameCorrect = true;
                }else{
                    nameCorrect = false;
                }
            }
            if(!doctorSearch.getSurname().equals("") && doctorSearch.getSurname() != null){
                if(doctor.getSurname().toLowerCase().contains(doctorSearch.getSurname().toLowerCase())){
                    surnameCorrect = true;
                }else{
                    surnameCorrect = false;
                }
            }
            if(!doctorSearch.getSerialNumber().equals("") && doctorSearch.getSerialNumber() != null){

                if(doctor.getSerialNumber().startsWith(doctorSearch.getSerialNumber())){
                    serialNumberCorrect = true;
                }else{
                    serialNumberCorrect = false;
                }
            }
            if(nameCorrect && surnameCorrect && serialNumberCorrect){
                doctorsFound.add(new DoctorSearch(doctor.getId(),doctor.getName(), doctor.getSurname(),doctor.getSerialNumber()));
            }

        }

        return doctorsFound;

    }

    @Override
    public List<DoctorSearch> getAllDoctors(Long idClinic) {
        List<DoctorSearch> doctorsAll = new ArrayList<DoctorSearch>();
        List<Doctor> doctors = new ArrayList<Doctor>();
        doctors = doctorRepository.findDoctors(idClinic);
        for(Doctor doctor: doctors){
            if(!doctor.isRemoved()){
                doctorsAll.add(new DoctorSearch(doctor.getId(),doctor.getName(),doctor.getSurname(),doctor.getSerialNumber()));
            }
        }
        return doctorsAll;
    }

    @Override
    public List<DoctorRating> getAllDoctorsRating(Long idClinic) {
        List<DoctorRating> doctorsAll = new ArrayList<DoctorRating>();
        List<Doctor> doctors = new ArrayList<Doctor>();
        doctors = doctorRepository.findDoctors(idClinic);
        for(Doctor doctor: doctors){
            if(!doctor.isRemoved()){
                doctorsAll.add(new DoctorRating(doctor));
            }
        }
        return doctorsAll;
    }


    @Override
    public Doctor save(Doctor d) {
        return this.doctorRepository.save(d);
    }

    @Override
    @Transactional
    public Doctor rateDoctor(Long doctorId, RateDTO rate) {
        try {

            Patient p = this.patientRepository.findById(rate.getPatient_id()).orElse(null);
            Doctor d = this.doctorRepository.findById(doctorId).orElse(null);

            Double rated = d.getRating() * d.getNumberOfReviews() + rate.getRate();
            d.setNumberOfReviews(d.getNumberOfReviews() + 1);
            rated = rated / d.getNumberOfReviews();
            d.setRating(rated);
            this.doctorRepository.save(d);
            p.getDoctors().add(d);
            this.patientRepository.save(p);
            return d;
        } catch (NullPointerException e) {
            return null;
        }

    }


    @Override
    public List<DoctorFA> findAvailableDoctors(Clinic clinic, AvailableDoctorRequest adr) {
        List<DoctorFA> doctorsFA = new ArrayList<DoctorFA>();

        List<Doctor> doctors = doctorRepository.getAvailableDoctors(clinic.getId(),adr.getIdExamType(),adr.getDate(),adr.getTime());
        for(Doctor doctor: doctors){
            boolean isAbsent = isDoctorAbsent(adr, doctor);
            if (!isAbsent) {
                doctorsFA.add(new DoctorFA(doctor));
            }
        }

        return doctorsFA;
    }


    @Override
    public List<DoctorRating> findFreeDoctors(Clinic clinic, AvailableDoctorRequest adr) {

        List<DoctorRating> doctorsRating = new ArrayList<>();

        //doctors that have 1 or more free terms
        List<Doctor> doctors = this.doctorRepository.getFreeDoctors(clinic.getId(), adr.getIdExamType(), adr.getDate());
        for (Doctor doctor : doctors) {

            boolean isAbsent = isDoctorAbsent(adr, doctor);
            if (!isAbsent) {
                doctorsRating.add(new DoctorRating(doctor));
            }
        }
        return doctorsRating;
    }

    @Override
    public List<AppointmentDTO> findFreeTerms(Long doctorId, AvailableDoctorRequest adr) {
        List<AppointmentDTO> appointments = new ArrayList<>();
        List<TermDoctor> terms = this.termDoctorRepository.getFreeTerms(doctorId,adr.getIdExamType(),adr.getDate());
        for(TermDoctor term : terms){
            appointments.add(new AppointmentDTO(term));
        }

        return appointments;
    }

    @Override
    public Boolean sendSurgeryAppointment(Long patientId, AppointmentDTO appointmentDTO) {
        try{
            Patient p = this.patientRepository.findById(patientId).orElse(null);
            Doctor doc = this.doctorRepository.findById(appointmentDTO.getDoctorId()).orElse(null);
            Surgery s = new Surgery();

            SurgeryType type = surgeryTypeService.findOne(Long.parseLong(appointmentDTO.getType()));
            s.setDate(appointmentDTO.getDate());
            s.setPatient(p);
            s.setSurgeryType(type);
            s.setClinic(doc.getClinic());
            s.setPrice(type.getPrice());
            s.setDiscount(type.getDiscount());
            s.setStatusS("REQUESTED");
            this.surgeryService.save(s);
            return true;

        }catch (Exception e){
        return false;
        }


    }


    public List<DoctorFA> searchForDoctorsExamTypes(Clinic clinic, ExamType examType) {

        List<Doctor> doctors = doctorRepository.searchDoctorsExamType(clinic.getId(),examType.getId());
        List<DoctorFA> doctorsFA = new ArrayList<DoctorFA>();
        for(Doctor d: doctors){
            doctorsFA.add(new DoctorFA(d));
        }
        return doctorsFA;
    }

    @Override
    public List<Doctor>  getDoctorsSurgeryTypes(Long id) {

        List<Doctor> doctors = doctorRepository.getDoctorsSurgeryType( id);
        return doctors;
    }

    @Override
    public List<DoctorFA>  getFreeDoctorsForThisTerm(RoomTerm rt, Long id) {

        List<Doctor> doctors = doctorRepository.getFreeDoctorsForThisTerm(rt.getDate(), rt.getStartTime(), rt.getIdSurgeryType());
        List<DoctorFA> doctorsFA = new ArrayList<DoctorFA>();
        for(Doctor d: doctors){
            if (d.getClinic().getId() ==id)
            doctorsFA.add(new DoctorFA(d));
        }

        return doctorsFA;
    }


    private boolean isDoctorAbsent(AvailableDoctorRequest adr, Doctor doctor) {
        boolean isAbsent = false;
        for (Absence a : doctor.getAbsences()) {
            if (a.getStatusOfAbsence().equals("APPROVED")) {
                if (a.getStartDate().minusDays(1).isBefore(adr.getDate()) && a.getEndDate().plusDays(1).isAfter(adr.getDate())) {
                    isAbsent = true;
                }
            }
        }
        return isAbsent;
    }
}
