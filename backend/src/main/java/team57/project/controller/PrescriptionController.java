package team57.project.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import team57.project.dto.PrescriptionDTO;
import team57.project.model.Clinic;
import team57.project.model.Nurse;
import team57.project.model.Prescription;
import team57.project.service.impl.ClinicServiceImpl;
import team57.project.service.impl.NurseServiceImpl;
import team57.project.service.impl.PrescriptionServiceImpl;

import javax.persistence.OptimisticLockException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/prescriptions")
@CrossOrigin("http://localhost:4200")
public class PrescriptionController {

    @Autowired
    private PrescriptionServiceImpl prescriptionService;

    @Autowired
    private NurseServiceImpl nurseService;

    @Autowired
    private ClinicServiceImpl clinicService;

    @GetMapping(value = "/getPrescriptions", produces = "application/json")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<?> getPrescriptions() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String email = currentUser.getName();
        Nurse nurse = (Nurse) nurseService.findByEmail(email);
        Clinic clinic = clinicService.findOne(nurse.getClinic().getId());
        List<Prescription> prescriptions = prescriptionService.findUnverified(clinic.getId());
        List<PrescriptionDTO> preDTO = new ArrayList<>();
        for(Prescription p: prescriptions){
            preDTO.add(new PrescriptionDTO(p));
        }
        return new ResponseEntity<>(preDTO, HttpStatus.OK);
    }

    @PutMapping(value = "/verify/{id}", produces = "application/json", consumes = "application/json")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<?> verify(@PathVariable("id") Long id) {
        try {
            Prescription prescription = prescriptionService.findOne(id);

            Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
            String email = currentUser.getName();
            Nurse nurse = (Nurse) nurseService.findByEmail(email);

            try {
                prescriptionService.verify(prescription, nurse);
                return ResponseEntity.status(HttpStatus.OK).build();
            } catch (OptimisticLockException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Somebody has just validated this prescription.");
            }

        } catch(NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }
}