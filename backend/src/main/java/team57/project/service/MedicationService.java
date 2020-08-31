package team57.project.service;

import team57.project.dto.MedicationDTO;
import team57.project.model.Medication;

import java.util.List;

public interface MedicationService {

    List<Medication> findAll();
    Medication saveMedication(Medication m);
    Medication findByCode(String code);
    Medication findOne(Long id);
    Medication updateMedication(Medication existMedication, MedicationDTO medication);

}
