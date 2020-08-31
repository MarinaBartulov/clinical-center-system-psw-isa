package team57.project.controller;

import org.hibernate.PessimisticLockException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import team57.project.dto.*;
import team57.project.model.*;
import team57.project.model.Patient;
import team57.project.service.*;
import team57.project.service.impl.ClinicServiceImpl;

import javax.mail.MessagingException;
import javax.persistence.OptimisticLockException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/surgery")
@CrossOrigin("http://localhost:4200")
public class SurgeryController {
    @Autowired
    private SurgeryService surgeryService;
    @Autowired
    private ClinicServiceImpl clinicService;
    @Autowired
    private PatientService patientService;
    @Autowired
    private DoctorService doctorService;


    @RequestMapping(value = "/getSurgeries/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_NURSE') or hasRole('ROLE_PATIENT')")
    public ResponseEntity<?> getSurgeries(@PathVariable("id") Long id) {
        try{
            Patient p = patientService.findOne(id);
            List<Surgery> surgeries = this.surgeryService.findByPatientId(p.getId());
            List<SurgeryDTO> surgeriesDTO = new ArrayList<SurgeryDTO>();
            for (Surgery s : surgeries) {
                surgeriesDTO.add(new SurgeryDTO(s));
            }
            return new ResponseEntity<>(surgeriesDTO,HttpStatus.OK);
        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @RequestMapping(value = "/getDoctorsSurgeries/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ResponseEntity<?> getDoctorsSurgeries(@PathVariable("id") Long id) {
        try{
            Doctor doctor = doctorService.findOne(id);
            List<Surgery> surgeries = this.surgeryService.findDoctorsSurgeries(doctor.getId());
            List<SurgeryWKDTO> surgeriesDTO = new ArrayList<SurgeryWKDTO>();
            for (Surgery surgery : surgeries) {
                SurgeryWKDTO dto = new SurgeryWKDTO(surgery);
                surgeriesDTO.add(dto);
            }
            return new ResponseEntity<>(surgeriesDTO,HttpStatus.OK);
        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @GetMapping(value="/getNumSurgeryRequests/{id}")
    @PreAuthorize("hasRole('ROLE_CLINIC_ADMIN')")
    public ResponseEntity<?> getNumSurgeryRequests(@PathVariable("id") Long id){

        try{
            Clinic clinic = clinicService.findOne(id);
            double num = surgeryService.getNumSurgeryRequests(clinic);
            return new ResponseEntity(num, HttpStatus.OK);
        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping(value="/getSurgeryRequests/{id}")
    @PreAuthorize("hasRole('ROLE_CLINIC_ADMIN')")
    public ResponseEntity<?> getSurgeryRequests(@PathVariable("id") Long id){

        try{
            Clinic clinic = clinicService.findOne(id);
            List<SurgeryRequest> surgeryRequests = surgeryService.findSurgeryRequests(clinic);
            return new ResponseEntity(surgeryRequests,HttpStatus.OK);

        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping(value="/getSurgeryRequest/{id}")
    @PreAuthorize("hasRole('ROLE_CLINIC_ADMIN')")
    public ResponseEntity<?> getSurgeryRequest(@PathVariable("id") Long id){

        try{
            Surgery s = surgeryService.findOne(id);
            SurgeryRequest sRequest= new SurgeryRequest(s);
            return new ResponseEntity(sRequest,HttpStatus.OK);

        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping(value="/getAvailableRoomsSurgery/{id}")
    @PreAuthorize("hasRole('ROLE_CLINIC_ADMIN')")
    public ResponseEntity<?> getAvailableRoomsTerms(@PathVariable("id") Long id){

        try{
            Surgery s = surgeryService.findOne(id);
            List<RoomTerm> availableRooms = surgeryService.getAvailableRoomsTerms(s);
            return new ResponseEntity(availableRooms,HttpStatus.OK);

        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping(value="/reserve/{id}", consumes = "application/json")
    @PreAuthorize("hasRole('ROLE_CLINIC_ADMIN')")
    public ResponseEntity<?> reserve(@RequestBody RoomTerm request, @PathVariable("id") Long surgeryId) {

        try{
            Surgery s = surgeryService.findOne(surgeryId);
            surgeryService.reserve(s,request);

            return ResponseEntity.status(HttpStatus.OK).build();
        }catch(PessimisticLockException pe){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This room or doctor has just been reserved for that term.");
        }catch (OptimisticLockException oe){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Some other admin has just found a room for this surgery.");
        }
    }

    @PutMapping(value="/rejectSurgeryAdmin/{id}", consumes = "application/json")
    @PreAuthorize("hasRole('ROLE_CLINIC_ADMIN')")
    public ResponseEntity<?> rejectSurgeryAdmin(@PathVariable("id") Long id){

        try{
            Surgery s = surgeryService.findOne(id);
            surgeryService.rejectSurgery(s);
            return ResponseEntity.status(HttpStatus.OK).build();

        }catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (InterruptedException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Something went wrong with sending the email notification");
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Something went wrong with sending the email notification");
        } catch (OptimisticLockException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Some other admin has just resolved this surgery request.");
        }
    }
}
