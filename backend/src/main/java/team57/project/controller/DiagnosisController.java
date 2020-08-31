package team57.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import team57.project.dto.DiagnosisDTO;
import team57.project.model.Diagnosis;
import team57.project.service.impl.DiagnosisServiceImpl;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/diagnosis")
@CrossOrigin("http://localhost:4200")
public class DiagnosisController {

    @Autowired
    private DiagnosisServiceImpl diagnosisService;

    @GetMapping( value = "/getDiagnosis", produces = "application/json")
    @PreAuthorize("hasRole('CLINICAL_CENTER_ADMIN') or hasRole('ROLE_DOCTOR') or hasRole('ROLE_NURSE')")
    public ResponseEntity<?> getDiagnosis()
    {
        List<Diagnosis> diagnosis = diagnosisService.findAll();
        List<DiagnosisDTO> diagnosisDTO = new ArrayList<>();
        for(Diagnosis d : diagnosis)
        {
            diagnosisDTO.add(new DiagnosisDTO(d));
        }

        return new ResponseEntity<>(diagnosisDTO, HttpStatus.OK);
    }

    @PutMapping(value="/addNewDiagnosis", produces = "application/json", consumes= "application/json")
    @PreAuthorize("hasRole('CLINICAL_CENTER_ADMIN')")
    public ResponseEntity<?> addNewDiagnosis(@RequestBody DiagnosisDTO diagnosis)
    {
        if(diagnosis.getCode().equals("") || diagnosis.getCode() == null || diagnosis.getDescription().equals("") ||
        diagnosis.getDescription() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Code and description are mandatory.");
        }
        Diagnosis existDiagnosis = diagnosisService.findByCode(diagnosis.getCode());
        if(existDiagnosis != null)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else
        {
            Diagnosis newDiagnosis= new Diagnosis(diagnosis.getCode(),diagnosis.getDescription());
            newDiagnosis = diagnosisService.saveDiagnosis(newDiagnosis);
            return new ResponseEntity<>(new DiagnosisDTO(newDiagnosis),HttpStatus.CREATED);
        }
    }

    @PostMapping(value= "/editDiagnosis", produces = "application/json", consumes = "application/json")
    @PreAuthorize("hasRole('CLINICAL_CENTER_ADMIN')")
    public ResponseEntity<?> editDiagnosis(@RequestBody DiagnosisDTO diagnosis)
    {
        if(diagnosis.getCode().equals("") || diagnosis.getCode() == null || diagnosis.getDescription().equals("") ||
                diagnosis.getDescription() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Code and description are mandatory");
        }
        Diagnosis existDiagnosis = diagnosisService.findOne(diagnosis.getId());
        if(existDiagnosis == null)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Diagnosis doesn't exist.");
        }
        else
        {
            Diagnosis end = diagnosisService.updateDiagnosis(existDiagnosis, diagnosis);
            if (end != null)
            {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}
