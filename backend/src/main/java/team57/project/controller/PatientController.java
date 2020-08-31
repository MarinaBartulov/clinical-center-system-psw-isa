package team57.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import team57.project.dto.*;
import team57.project.model.*;
import team57.project.service.impl.DiagnosisServiceImpl;
import team57.project.service.impl.MedicalRecordServiceImpl;
import team57.project.service.impl.MedicationServiceImpl;
import team57.project.service.impl.PatientServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.regex.Pattern;

import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@Controller
@RequestMapping(value = "/api/patients", produces = MediaType.APPLICATION_JSON_VALUE)
public class PatientController {

    @Autowired
    private PatientServiceImpl patientService;
    @Autowired
    private MedicationServiceImpl medicationService;
    @Autowired
    private DiagnosisServiceImpl diagnosisService;
    @Autowired
    private MedicalRecordServiceImpl medicalRecordService;

    @RequestMapping(value = "/allSorted", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_NURSE')")
    public ResponseEntity<?> getAllPatients() {

        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        List<UserDTO> sortedPatients =  patientService.findAllInClinic(currentUser);
        return new ResponseEntity(sortedPatients,HttpStatus.OK);
    }

    @RequestMapping(value = "/searchPatients", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<?> searchPatients(@RequestBody PatientSearch patientSearch) {

        if((patientSearch.getName().equals("") || patientSearch.getName()==null) && (patientSearch.getSurname().equals("") || patientSearch.getSurname() == null) && (
                patientSearch.getSerialNumber().equals("") || patientSearch.getSerialNumber() == null)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You have to enter at least one valid information for the search.");
        }
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        List<UserDTO> searchPatients = patientService.searchPatients(currentUser,patientSearch);
        return new ResponseEntity(searchPatients,HttpStatus.OK);
    }

    @RequestMapping(value = "/getAllCities", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<?> getAllCities() {

        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        List<String> cities = patientService.getAllCities(currentUser);
        return new ResponseEntity(cities,HttpStatus.OK);
    }




    @RequestMapping(value = "/patient/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_NURSE')")
    public ResponseEntity<?> getPatient(@PathVariable("id") Long id) {
        try{
            User p = this.patientService.findOne(id);
            UserDTO userDTO = new UserDTO(p);
            return new ResponseEntity<>(userDTO,HttpStatus.OK);

        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @RequestMapping(value = "/patientMedicalRecord/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_PATIENT') or hasRole('ROLE_NURSE')")
    public ResponseEntity<?> getPatientMedicalRecord(@PathVariable("id") Long id) {

        try{
            MedicalRecord mr = this.patientService.findPatientMedicalRecord(id);
            return new ResponseEntity<>(new MedicalRecordDTO(mr),HttpStatus.OK);

        } catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @RequestMapping(value = "/editMedicalRecord/{id}", method = PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_NURSE')")
    public ResponseEntity<?> editMedicalRecord(@PathVariable("id") Long id, @RequestBody MedicalRecordDTO medicalRecordDTO) {

        try{
             if(medicalRecordDTO.getBloodType().equals("") || medicalRecordDTO.getBloodType() == null ||
             medicalRecordDTO.getDateOfBirth() == null || medicalRecordDTO.getDateOfBirth().equals("") ||
             medicalRecordDTO.getDiopter() == null || medicalRecordDTO.getDiopter().equals("") ||
             medicalRecordDTO.getHeight() <= 0 || medicalRecordDTO.getWeight() <= 0 ||
                     medicalRecordDTO.getOrganDonor() == null || medicalRecordDTO.getOrganDonor().equals("")){
                 return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
             }
             Patient p = this.patientService.findOne(id);
             MedicalRecord record = this.patientService.findPatientMedicalRecord(p.getId());
             this.patientService.updateMedicalRecord(medicalRecordDTO, record);
             return ResponseEntity.status(HttpStatus.OK).build();
        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }


    @RequestMapping(value = "/addAlergicMedication/{id}", method = PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_NURSE')")
    public ResponseEntity<?> addAlergicMedication(@PathVariable("id") Long id, @RequestBody MedicationDTO medication) {

        try {
            if(medication.getCode()==null || medication.getCode().equals("") || medication.getDescription() == null
            || medication.getDescription().equals("")){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Description and code are mandatory.");
            }
            MedicalRecord record = this.patientService.findPatientMedicalRecord(id);
            AtomicBoolean add = new AtomicBoolean(false);
            record.getAllergicToMedications().forEach(m -> {
                if (m.getId().equals(medication.getId())) {
                    add.set(true);
                }
            });
            if (!(add.get())) {
                this.patientService.addAlergicMedication(this.medicationService.findOne(medication.getId()), record);
            }
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @RequestMapping(value = "/getPatientAlergicMed/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_NURSE') or hasRole('ROLE_PATIENT')")
    public ResponseEntity<?> getPatientAlergicMed(@PathVariable("id") Long id) {
        try{
            Patient p = this.patientService.findOne(id);
            Set<Medication> medications = p.getMedicalRecord().getAllergicToMedications();
            List<MedicationDTO> medsDTO = new ArrayList<>();
            for(Medication m:medications){
                medsDTO.add(new MedicationDTO(m));
            }
            return new ResponseEntity<>(medsDTO,HttpStatus.OK);
        } catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @RequestMapping(value = "/addChronicCondition/{id}", method = PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_NURSE')")
    public ResponseEntity<?> addChronicCondition(@PathVariable("id") Long id, @RequestBody DiagnosisDTO diagnose) {

        try {
            if(diagnose.getDescription().equals("") || diagnose.getDescription()==null ||
            diagnose.getCode().equals("") || diagnose.getCode() == null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Description and code are mandatory.");
            }
            MedicalRecord record = this.patientService.findPatientMedicalRecord(id);
            AtomicBoolean add = new AtomicBoolean(false);
            record.getChronicConditions().forEach(m -> {

                if (m.getId().equals(diagnose.getId())) {
                    add.set(true);
                }

            });
            if (!(add.get())) {
                this.patientService.addChronicCondition(this.diagnosisService.findOne(diagnose.getId()), record);
            }
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @RequestMapping(value = "/makeAppointment/{id}", method = PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_PATIENT')")
    public ResponseEntity<?> makeAppointment(@PathVariable("id") Long id, @RequestBody AppointmentDTO appointmentDTO) {
        try {
            if(appointmentDTO.getDate() == null || appointmentDTO.getTime() == null || appointmentDTO.getDoctorId() == null
            || appointmentDTO.getType().equals("") || appointmentDTO.getType() == null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Date, time, doctor and type of exam are mandatory.");
            }
            Boolean exam = this.patientService.sendAppointment(appointmentDTO,id);
            if(exam){
                return new ResponseEntity<>(true, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(false, HttpStatus.GONE);
            }
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/getPatientChronicCon/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_NURSE') or hasRole('ROLE_PATIENT')")
    public ResponseEntity<?> getPatientChronicCon(@PathVariable("id") Long id) {
        try{
            Patient p = this.patientService.findOne(id);
            Set<Diagnosis> diagnoses = p.getMedicalRecord().getChronicConditions();
            List<DiagnosisDTO> dDTO = new ArrayList<>();
            for(Diagnosis d: diagnoses){
                dDTO.add(new DiagnosisDTO(d));
            }
            return new ResponseEntity<>(dDTO,HttpStatus.OK);
        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @RequestMapping(value = "/getRatedDoctors/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_PATIENT')")
    public ResponseEntity<?> getRatedDoctors(@PathVariable("id") Long id) {

        try{
            Patient p = this.patientService.findOne(id);
            List<Doctor> doctors = this.patientService.leftDoctors(p.getId());
            List<DoctorDTO> doctorsDTO = new ArrayList<>();
            for(Doctor d: doctors){
                doctorsDTO.add(new DoctorDTO(d));
            }
            return new ResponseEntity(doctorsDTO,HttpStatus.OK);

        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @RequestMapping(value = "/getRatedClinics/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_PATIENT')")
    public ResponseEntity<?> getRatedClinics(@PathVariable("id") Long id) {

        try{
            Patient p = this.patientService.findOne(id);
            List<ClinicDTO> clinicDTOs = this.patientService.leftClinics(p.getId());
            return new ResponseEntity(clinicDTOs,HttpStatus.OK);

        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    private boolean isSerialNumber(String n) {
        if (Pattern.matches("[0-9]+", n) && n.length() == 13) {
            return true;
        } else {
            return false;
        }
    }
    @GetMapping(value = "/getMedicalReports/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<?> getMedicalReports(@PathVariable("id") Long id) //patient id
    {
        try {
            Patient p = this.patientService.findOne(id);
            List<MedicalReport> reports = patientService.getMedicalReports(p.getId());
            List<MedicalReportDTO> reportsDTO = new ArrayList<MedicalReportDTO>();

            for (MedicalReport mr : reports) {
                MedicalReportDTO dto = new MedicalReportDTO();
                dto.setId(mr.getId());
                dto.setDescription(mr.getDescription());
                dto.setDate(mr.getDate().toLocalDate().toString());
                dto.setTime(mr.getTime().toString());
                DoctorDTO doctorDTO = new DoctorDTO(mr.getDoctor());
                dto.setDoctor(doctorDTO);
                reportsDTO.add(dto);
            }
            return new ResponseEntity<>(reportsDTO, HttpStatus.OK);
        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping(value = "/deleteChronicCondition/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<?> deleteDiagnosis(@PathVariable("id") Long id, @RequestBody DiagnosisDTO diagnose) {
        try{
            Patient p = this.patientService.findOne(id);
            MedicalRecord record = this.patientService.findPatientMedicalRecord(p.getId());
            this.medicalRecordService.deleteChronicCondition(this.diagnosisService.findOne(diagnose.getId()),record);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @DeleteMapping(value = "/deleteAllergicMedication/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<?> deleteAllergicMedication(@PathVariable("id") Long id, @RequestBody MedicationDTO medication) {
        try{
            Patient p = this.patientService.findOne(id);
            MedicalRecord record = this.patientService.findPatientMedicalRecord(p.getId());
            this.medicalRecordService.deleteAllergicMedication(this.medicationService.findOne(medication.getId()),record);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}