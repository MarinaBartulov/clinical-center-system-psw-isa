package team57.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team57.project.model.Diagnosis;
import team57.project.model.MedicalRecord;
import team57.project.model.Medication;
import team57.project.repository.MedicalRecordRepository;
import team57.project.service.MedicalRecordService;

@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public void save(MedicalRecord mr)
    {
         medicalRecordRepository.save(mr);
    }

    public void deleteChronicCondition(Diagnosis diagnosis, MedicalRecord record) {
        if(record!=null)
        {
            record.getChronicConditions().remove(diagnosis);
            this.medicalRecordRepository.save(record);
        }
    }

    public void deleteAllergicMedication(Medication medication, MedicalRecord record) {
        if(record!=null)
        {
            record.getAllergicToMedications().remove(medication);
            this.medicalRecordRepository.save(record);
        }
    }
}
