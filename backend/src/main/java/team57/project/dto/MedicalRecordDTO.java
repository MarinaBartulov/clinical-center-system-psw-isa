package team57.project.dto;

import team57.project.model.MedicalRecord;

import java.util.Set;

public class MedicalRecordDTO {

    private Long id;
    private String dateOfBirth;
    private String organDonor;
    private double height;
    private double weight;
    private String diopter;
    private String bloodType;

    public MedicalRecordDTO(){

    }

    public MedicalRecordDTO(Long id, String dateOfBirth, String organDonor, double height, double weight, String diopter, String bloodType, Set<MedicationDTO> allergicToMedications, Set<DiagnosisDTO> chronicConditions, Set<MedicalReportDTO> medicalReports) {
        this.id = id;
        this.dateOfBirth = dateOfBirth;
        this.organDonor = organDonor;
        this.height = height;
        this.weight = weight;
        this.diopter = diopter;
        this.bloodType = bloodType;
    }

    public MedicalRecordDTO(MedicalRecord m){
        this.id = m.getId();
        this.dateOfBirth = m.getDateOfBirth();
        this.organDonor = m.getOrganDonor();
        this.height = m.getHeight();
        this.weight = m.getWeight();
        this.diopter = m.getDiopter();
        this.bloodType = m.getBloodType();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getOrganDonor() {
        return organDonor;
    }

    public void setOrganDonor(String organDonor) {
        this.organDonor = organDonor;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getDiopter() {
        return diopter;
    }

    public void setDiopter(String diopter) {
        this.diopter = diopter;
    }

    public String getBloodType() {
        return bloodType;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

}
