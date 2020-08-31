package team57.project.service;

import team57.project.model.Diagnosis;
import team57.project.model.MedicalRecord;
import team57.project.model.Medication;

public interface MedicalRecordService {

    void save(MedicalRecord mr);
    void deleteChronicCondition(Diagnosis diagnosis, MedicalRecord record);
    void deleteAllergicMedication(Medication medication, MedicalRecord record);
}
