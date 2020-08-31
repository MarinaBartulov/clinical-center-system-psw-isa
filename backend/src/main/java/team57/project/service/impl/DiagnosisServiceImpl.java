package team57.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team57.project.dto.DiagnosisDTO;
import team57.project.model.Diagnosis;
import team57.project.repository.DiagnosisRepository;
import team57.project.service.DiagnosisService;

import java.util.List;

@Service
public class DiagnosisServiceImpl implements DiagnosisService {

    @Autowired
    private DiagnosisRepository diagnosisRepository;

    public List<Diagnosis> findAll() { return diagnosisRepository.findAll(); }

    public Diagnosis saveDiagnosis(Diagnosis d) { return  diagnosisRepository.save(d); }

    public Diagnosis findByCode(String code) {
        return diagnosisRepository.findByCode(code);
    }

    public Diagnosis findOne(Long id){ return diagnosisRepository.findById(id).orElseGet(null);}

    public Diagnosis updateDiagnosis(Diagnosis existDiagnosis, DiagnosisDTO diagnosis)
    {
        if(existDiagnosis.getCode().equals(diagnosis.getCode()))//If code hasn't been change
        {
            existDiagnosis.setDescription(diagnosis.getDescription());
            return diagnosisRepository.save(existDiagnosis);
        }
        else
        {
            Diagnosis diag = findByCode(diagnosis.getCode());
            if(diag == null) // the new diagnosis is different from any other existing diagnosis
            {
                existDiagnosis.setCode(diagnosis.getCode());
                existDiagnosis.setDescription(diagnosis.getDescription());
                return diagnosisRepository.save(existDiagnosis);
            }
            else {
                return null;
            }
        }
    }
}
