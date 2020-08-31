package team57.project.service;

import team57.project.dto.DiagnosisDTO;
import team57.project.model.Diagnosis;

import java.util.List;

public interface DiagnosisService {

    List<Diagnosis> findAll();
    Diagnosis saveDiagnosis(Diagnosis d);
    Diagnosis findByCode(String code);
    Diagnosis findOne(Long id);
    Diagnosis updateDiagnosis(Diagnosis existDiagnosis, DiagnosisDTO diagnosis);


}
