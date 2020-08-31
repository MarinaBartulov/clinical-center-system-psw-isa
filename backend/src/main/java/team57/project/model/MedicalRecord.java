package team57.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;
@Entity
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "dateOfBirth")
    private String dateOfBirth;
    @Column(name = "organDonor")
    private String organDonor; //Yes or No
    @Column(name = "height")
    private double height;
    @Column(name = "weight")
    private double weight;
    @Column(name = "diopter")
    private String diopter;
    @Column(name = "bloodType")
    private String bloodType;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "medical_record_allergic_medication", joinColumns = @JoinColumn(name = "medicalRecord_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "medication_id", referencedColumnName = "id"))
    private Set<Medication> allergicToMedications;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "medical_record_chronic_condition", joinColumns = @JoinColumn(name = "medicalRecord_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "diagnose_id", referencedColumnName = "id"))
    private Set<Diagnosis> chronicConditions; //codes of diagnoses
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<MedicalReport> medicalReports;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Medication> getAllergicToMedications() {
        return allergicToMedications;
    }

    public void setAllergicToMedications(Set<Medication> allergicToMedications) {
        this.allergicToMedications = allergicToMedications;
    }

    public Set<Diagnosis> getChronicConditions() {
        return chronicConditions;
    }

    public void setChronicConditions(Set<Diagnosis> chronicConditions) {
        this.chronicConditions = chronicConditions;
    }
    @JsonIgnore
    public Set<MedicalReport> getMedicalReports() {
        return medicalReports;
    }

    public void setMedicalReports(Set<MedicalReport> medicalReports) {
        this.medicalReports = medicalReports;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}
