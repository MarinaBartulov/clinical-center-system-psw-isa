package team57.project.service;

import team57.project.model.Diagnosis;
import team57.project.model.MedicalReport;

public interface MedicalReportService {

    MedicalReport findOne(Long id);
    MedicalReport save(MedicalReport report);
    void addDiagnosis(Diagnosis diagnosis, MedicalReport report);
    void deleteDiagnosisFromReport(Diagnosis diagnosis, MedicalReport report);
}
