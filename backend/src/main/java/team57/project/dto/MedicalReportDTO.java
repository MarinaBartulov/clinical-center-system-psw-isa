package team57.project.dto;

import team57.project.model.*;

import java.util.ArrayList;

public class MedicalReportDTO {

    private Long id;
    private String description;
    private String date;
    private String time;
    private DoctorDTO doctor;
    private ArrayList<MedicationDTO> medications;
    private ArrayList<DiagnosisDTO> diagnoses;
    private Long examId;
    private String type;

    public MedicalReportDTO()
    {
    }

    public MedicalReportDTO(MedicalReport mr){
        this.id = mr.getId();
        this.description = mr.getDescription();
        this.date = mr.getDate().toString();
        this.time = mr.getTime().toString();
        this.doctor = new DoctorDTO(mr.getDoctor());
        this.medications = new ArrayList<MedicationDTO>();
        this.diagnoses = new ArrayList<DiagnosisDTO>();
        for(Prescription p: mr.getPrescriptions()){
            medications.add(new MedicationDTO(p.getMedication()));
        }
        for(Diagnosis d: mr.getDiagnoses()){
            diagnoses.add(new DiagnosisDTO(d));
        }
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public DoctorDTO getDoctor() {
        return doctor;
    }

    public void setDoctor(DoctorDTO doctor) {
        this.doctor = doctor;
    }

    public ArrayList<MedicationDTO> getMedications() {
        return medications;
    }

    public void setMedications(ArrayList<MedicationDTO> medications) {
        this.medications = medications;
    }

    public ArrayList<DiagnosisDTO> getDiagnoses() {
        return diagnoses;
    }

    public void setDiagnoses(ArrayList<DiagnosisDTO> diagnoses) {
        this.diagnoses = diagnoses;
    }

}
