package team57.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import team57.project.dto.ExamTypeDTO;
import team57.project.model.Clinic;
import team57.project.model.ExamType;
import team57.project.model.FastAppointment;
import team57.project.model.MedicalExam;
import team57.project.repository.ExamTypeRepository;
import team57.project.repository.FastAppointmentRepository;
import team57.project.repository.MedicalExamRepository;
import team57.project.service.ExamTypeService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.time.LocalTime;


@Service
public class ExamTypeServiceImpl implements ExamTypeService {

    @Autowired
    private ExamTypeRepository examTypeRepository;
    @Autowired
    private MedicalExamRepository medicalExamRepository;
    @Autowired
    private FastAppointmentRepository fastAppointmentRepository;


    @Override
    public ExamType findOne(Long id) {
        return examTypeRepository.findById(id).orElse(null);
    }

    @Override
    public ExamType findByName(String name) {
        return this.examTypeRepository.findByName(name);
    }

    @Override
    public boolean addExamType(Clinic clinic, ExamTypeDTO examTypeDTO) {

        for(ExamType et : clinic.getExamTypes()){
            if(et.getName().equals(examTypeDTO.getName()) && !et.isRemoved()){
                    return false;
            }
        }
        ExamType examType = new ExamType(examTypeDTO.getName(),examTypeDTO.getDescription(),examTypeDTO.getPrice(),examTypeDTO.getDiscount());
        examType.getClinics().add(clinic);
        examTypeRepository.save(examType);
        return true;
    }


    @Override
    public String updateExamType(ExamType examType, ExamTypeDTO examTypeDTO, Clinic clinic) {

        for(ExamType et : clinic.getExamTypes()){
            if(et.getName().equals(examTypeDTO.getName()) && !et.isRemoved() && et.getId() != examType.getId()){
                return "Exam type with that name already exists in the clinic.";
            }
        }

        List<MedicalExam> me = medicalExamRepository.findExamsWithType(clinic.getId(),examType.getId(), LocalDate.now(),LocalTime.now());
        List<FastAppointment> fa = fastAppointmentRepository.findFAWithType(clinic.getId(),examType.getId(),LocalDate.now(),LocalTime.now().minusHours(1));
        if(me.size() != 0 || fa.size() != 0){
            return "This exam type can't be updated because the exam of this type is happening now or is arranged in the future.";
        }
        examType.setName(examTypeDTO.getName());
        examType.setDescription(examTypeDTO.getDescription());
        examType.setPrice(examTypeDTO.getPrice());
        examType.setDiscount(examType.getDiscount());
        examTypeRepository.save(examType);
        return null;
    }

    @Override
    public boolean removeExamType(ExamType examType, Clinic clinic) {

        List<MedicalExam> me = medicalExamRepository.findExamsWithType(clinic.getId(),examType.getId(), LocalDate.now(),LocalTime.now());
        List<FastAppointment> fa = fastAppointmentRepository.findFAWithType(clinic.getId(),examType.getId(),LocalDate.now(),LocalTime.now().minusHours(1));
        if(me.size() != 0 || fa.size() != 0){
            return false;
        }
        examType.setRemoved(true);
        examTypeRepository.save(examType);
        return true;
    }

    @Override
    public List<ExamType> findAll() {
        return this.examTypeRepository.findAll();
    }
}
