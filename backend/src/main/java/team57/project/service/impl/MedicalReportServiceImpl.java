package team57.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team57.project.model.Diagnosis;
import team57.project.model.MedicalReport;
import team57.project.repository.MedicalReportRepository;
import team57.project.service.MedicalReportService;

@Service
public class MedicalReportServiceImpl implements MedicalReportService {

    @Autowired
    private MedicalReportRepository medicalReportRepository;

    public MedicalReport findOne(Long id){
        return medicalReportRepository.findById(id).orElseGet(null);
    }

    public MedicalReport save(MedicalReport report) {
        return medicalReportRepository.save(report);
    }

    public void addDiagnosis(Diagnosis diagnosis, MedicalReport report) {
        if (report != null) {
            report.getDiagnoses().add(diagnosis);
            this.medicalReportRepository.save(report);
        }
    }

    public void deleteDiagnosisFromReport(Diagnosis diagnosis, MedicalReport report)
    {
        if(report!=null)
        {
            report.getDiagnoses().remove(diagnosis);
            this.medicalReportRepository.save(report);
        }
    }
}
